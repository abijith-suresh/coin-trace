import type { CoinData } from '@/lib/services/coingecko';
import { coinGeckoService } from '@/lib/services/coingecko';
import { useState } from 'react';

export function useCryptoSearch() {
  const [cryptos, setCryptos] = useState<CoinData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchCryptos = async (query: string) => {
    if (query.length < 2) {
      setCryptos([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await coinGeckoService.searchCoins(query);
      setCryptos(results);
    } catch (error) {
      console.error('Failed to search cryptocurrencies:', error);
      setCryptos([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    cryptos,
    isSearching,
    searchCryptos,
  };
}