import { coinGeckoService } from '@/lib/services/coingecko';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface Holding {
  id: string;
  cryptoId: string;
  symbol: string;
  name: string;
  amount: number;
  image: string;
  currentPrice: number;
  priceChange24hPercent: number;
  totalValue: number;
}

interface PortfolioSummary {
  totalValue: number;
  totalChange24h: number;
  totalChangePercent24h: number;
  totalHoldings: number;
}

interface AddHoldingData {
  cryptoId: string;
  symbol: string;
  name: string;
  amount: number;
  image: string;
}

// Custom event for portfolio updates
const PORTFOLIO_UPDATE_EVENT = 'PORTFOLIO_UPDATE';

export function usePortfolio() {
  const { userId } = useAuth();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to emit portfolio update event
  const emitPortfolioUpdate = () => {
    window.dispatchEvent(new CustomEvent(PORTFOLIO_UPDATE_EVENT));
  };

  // Function to fetch portfolio data
  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to get user's portfolio
      // In a real app, this would fetch from your backend
      const mockHoldings = localStorage.getItem(`portfolio_${userId}`);
      const holdings = mockHoldings ? JSON.parse(mockHoldings) : [];

      // Fetch current prices and calculate values
      const updatedHoldings = await Promise.all(
        holdings.map(async (holding: any) => {
          const coinData = await coinGeckoService.getCoinById(holding.cryptoId);
          return {
            ...holding,
            currentPrice: coinData.current_price,
            priceChange24hPercent: coinData.price_change_percentage_24h,
            totalValue: holding.amount * coinData.current_price,
          };
        })
      );

      setHoldings(updatedHoldings);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and setup event listeners
  useEffect(() => {
    fetchPortfolio();

    // Listen for portfolio updates
    window.addEventListener(PORTFOLIO_UPDATE_EVENT, fetchPortfolio);

    // Cleanup
    return () => {
      window.removeEventListener(PORTFOLIO_UPDATE_EVENT, fetchPortfolio);
    };
  }, [userId]);

  // Calculate portfolio summary
  const portfolioSummary: PortfolioSummary = {
    totalValue: holdings.reduce((sum, h) => sum + h.totalValue, 0),
    totalChange24h: holdings.reduce((sum, h) => sum + (h.totalValue * h.priceChange24hPercent / 100), 0),
    totalChangePercent24h: holdings.length > 0
      ? (holdings.reduce((sum, h) => sum + (h.totalValue * h.priceChange24hPercent / 100), 0) /
         holdings.reduce((sum, h) => sum + h.totalValue, 0)) * 100
      : 0,
    totalHoldings: holdings.length,
  };

  const addHolding = async (data: AddHoldingData) => {
    try {
      const newHolding: Holding = {
        id: crypto.randomUUID(),
        ...data,
        currentPrice: 0,
        priceChange24hPercent: 0,
        totalValue: 0,
      };

      const coinData = await coinGeckoService.getCoinById(data.cryptoId);
      newHolding.currentPrice = coinData.current_price;
      newHolding.priceChange24hPercent = coinData.price_change_percentage_24h;
      newHolding.totalValue = data.amount * coinData.current_price;

      const updatedHoldings = [...holdings, newHolding];
      localStorage.setItem(`portfolio_${userId}`, JSON.stringify(updatedHoldings));

      // Emit update event instead of directly setting state
      emitPortfolioUpdate();
    } catch (error) {
      console.error('Failed to add holding:', error);
      throw error;
    }
  };

  const removeHolding = async (holdingId: string) => {
    try {
      const updatedHoldings = holdings.filter(h => h.id !== holdingId);
      localStorage.setItem(`portfolio_${userId}`, JSON.stringify(updatedHoldings));

      // Emit update event instead of directly setting state
      emitPortfolioUpdate();
    } catch (error) {
      console.error('Failed to remove holding:', error);
      throw error;
    }
  };

  const updateHolding = async (holdingId: string, updates: Partial<AddHoldingData>) => {
    try {
      const updatedHoldings = holdings.map(holding => {
        if (holding.id === holdingId) {
          const updatedHolding = { ...holding, ...updates };
          updatedHolding.totalValue = updatedHolding.amount * updatedHolding.currentPrice;
          return updatedHolding;
        }
        return holding;
      });

      localStorage.setItem(`portfolio_${userId}`, JSON.stringify(updatedHoldings));

      // Emit update event instead of directly setting state
      emitPortfolioUpdate();
    } catch (error) {
      console.error('Failed to update holding:', error);
      throw error;
    }
  };

  return {
    holdings,
    portfolioSummary,
    isLoading,
    addHolding,
    removeHolding,
    updateHolding,
  };
}