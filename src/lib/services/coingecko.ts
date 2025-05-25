import { Cache } from '@/lib/utils/cache';

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface MarketData {
  coins: CoinData[];
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
}

class CoinGeckoService {
  private baseUrl = process.env.NEXT_PUBLIC_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
  private apiKey = process.env.COINGECKO_API_KEY;

  // Cache TTLs (in seconds)
  private readonly CACHE_TTL = {
    COIN_DATA: 60, // 1 minute
    MARKET_DATA: 60, // 1 minute
    SEARCH_RESULTS: 300, // 5 minutes
    GLOBAL_DATA: 300, // 5 minutes
  };

  private async makeRequest(endpoint: string, params: URLSearchParams = new URLSearchParams()) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.search = params.toString();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['x-cg-demo-api-key'] = this.apiKey;
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
        next: { revalidate: 60 }, // Cache for 1 minute
      });

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit exceeded
          console.warn('CoinGecko API rate limit exceeded. Consider upgrading to a paid plan.');
          throw new Error('Rate limit exceeded. Please try again later.');
        }

        if (response.status === 403) {
          console.error('CoinGecko API access forbidden. Please check your API key.');
          throw new Error('API access forbidden. Please check your API key.');
        }

        const errorText = await response.text();
        console.error(`CoinGecko API error (${response.status}):`, errorText);
        throw new Error(`CoinGecko API error: ${response.status} - ${errorText || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('CoinGecko API request failed:', error.message);
        throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`);
      }
      console.error('CoinGecko API request failed:', error);
      throw new Error('Failed to fetch cryptocurrency data. Please try again later.');
    }
  }

  async getTopCoins(limit: number = 50, currency: string = 'usd'): Promise<CoinData[]> {
    const cacheKey = `top_coins_${limit}_${currency}`;
    const cachedData = Cache.get<CoinData[]>(cacheKey);
    if (cachedData) return cachedData;

    const params = new URLSearchParams({
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: limit.toString(),
      page: '1',
      sparkline: 'false',
      price_change_percentage: '24h,7d',
    });

    const data = await this.makeRequest('/coins/markets', params);
    Cache.set(cacheKey, data, { ttl: this.CACHE_TTL.MARKET_DATA });
    return data;
  }

  async getCoinById(id: string, currency: string = 'usd'): Promise<CoinData> {
    const cacheKey = `coin_${id}_${currency}`;
    const cachedData = Cache.get<CoinData>(cacheKey);
    if (cachedData) return cachedData;

    const params = new URLSearchParams({
      vs_currency: currency,
      include_market_cap: 'true',
      include_24hr_vol: 'true',
      include_24hr_change: 'true',
      include_last_updated_at: 'true',
    });

    const data = await this.makeRequest(`/coins/${id}`, params);

    // Transform the detailed coin data to match our CoinData interface
    const transformedData: CoinData = {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image.large,
      current_price: data.market_data.current_price[currency],
      market_cap: data.market_data.market_cap[currency],
      market_cap_rank: data.market_cap_rank,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      price_change_percentage_7d_in_currency: data.market_data.price_change_percentage_7d_in_currency?.[currency],
      market_cap_change_percentage_24h: data.market_data.market_cap_change_percentage_24h,
      circulating_supply: data.market_data.circulating_supply,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      ath: data.market_data.ath[currency],
      ath_change_percentage: data.market_data.ath_change_percentage[currency],
      ath_date: data.market_data.ath_date[currency],
      atl: data.market_data.atl[currency],
      atl_change_percentage: data.market_data.atl_change_percentage[currency],
      atl_date: data.market_data.atl_date[currency],
      last_updated: data.last_updated,
    };

    Cache.set(cacheKey, transformedData, { ttl: this.CACHE_TTL.COIN_DATA });
    return transformedData;
  }

  async searchCoins(query: string): Promise<CoinData[]> {
    const cacheKey = `search_${query.toLowerCase()}`;
    const cachedData = Cache.get<CoinData[]>(cacheKey);
    if (cachedData) return cachedData;

    const params = new URLSearchParams({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: '10',
      sparkline: 'false',
      ids: '',
    });

    try {
      // First search for coins by name/symbol
      const searchResponse = await fetch(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
      const searchData = await searchResponse.json();

      // Get the top 10 coin IDs from search results
      const coinIds = searchData.coins
        .slice(0, 10)
        .map((coin: any) => coin.id)
        .join(',');

      // Then get detailed market data for these coins
      const marketDataResponse = await fetch(`${this.baseUrl}/coins/markets?${params}&ids=${coinIds}`);
      const marketData = await marketDataResponse.json();

      Cache.set(cacheKey, marketData, { ttl: this.CACHE_TTL.SEARCH_RESULTS });
      return marketData;
    } catch (error) {
      console.error('Failed to search coins:', error);
      return [];
    }
  }

  async getGlobalMarketData(): Promise<{
    active_cryptocurrencies: number;
    total_market_cap: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
  }> {
    const cacheKey = 'global_market_data';
    const cachedData = Cache.get<any>(cacheKey);
    if (cachedData) return cachedData;

    const data = await this.makeRequest('/global');
    const transformedData = {
      active_cryptocurrencies: data.data.active_cryptocurrencies,
      total_market_cap: data.data.total_market_cap.usd,
      total_volume: data.data.total_volume.usd,
      market_cap_change_percentage_24h: data.data.market_cap_change_percentage_24h_usd,
    };

    Cache.set(cacheKey, transformedData, { ttl: this.CACHE_TTL.GLOBAL_DATA });
    return transformedData;
  }
}

export const coinGeckoService = new CoinGeckoService();