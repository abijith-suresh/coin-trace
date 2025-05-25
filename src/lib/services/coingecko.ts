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
        throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('CoinGecko API request failed:', error);
      throw error;
    }
  }

  async getTopCoins(limit: number = 50, currency: string = 'usd'): Promise<CoinData[]> {
    const params = new URLSearchParams({
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: limit.toString(),
      page: '1',
      sparkline: 'false',
      price_change_percentage: '24h,7d',
    });

    return await this.makeRequest('/coins/markets', params);
  }

  async getCoinById(id: string, currency: string = 'usd'): Promise<CoinData> {
    const params = new URLSearchParams({
      vs_currency: currency,
      include_market_cap: 'true',
      include_24hr_vol: 'true',
      include_24hr_change: 'true',
      include_last_updated_at: 'true',
    });

    const data = await this.makeRequest(`/coins/${id}`, params);

    // Transform the detailed coin data to match our CoinData interface
    return {
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
  }

  async searchCoins(query: string): Promise<Array<{id: string; name: string; symbol: string; thumb: string}>> {
    const params = new URLSearchParams({
      query: query,
    });

    const data = await this.makeRequest('/search', params);
    return data.coins || [];
  }

  async getGlobalMarketData(): Promise<{
    active_cryptocurrencies: number;
    total_market_cap: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
  }> {
    const data = await this.makeRequest('/global');
    return {
      active_cryptocurrencies: data.data.active_cryptocurrencies,
      total_market_cap: data.data.total_market_cap.usd,
      total_volume: data.data.total_volume.usd,
      market_cap_change_percentage_24h: data.data.market_cap_change_percentage_24h_usd,
    };
  }
}

export const coinGeckoService = new CoinGeckoService();