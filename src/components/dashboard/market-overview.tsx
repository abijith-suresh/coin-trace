import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercentage, getPercentageColor } from '@/lib/utils/format';

interface MarketOverviewProps {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
  };
}

export default function MarketOverview({ data }: MarketOverviewProps) {
  const isPositive = data.market_cap_change_percentage_24h >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Global Market Cap</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(data.total_market_cap / 1e12).toFixed(2)}T
          </div>
          <div className={`text-xs flex items-center ${getPercentageColor(data.market_cap_change_percentage_24h)}`}>
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {formatPercentage(data.market_cap_change_percentage_24h)} (24h)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(data.total_volume / 1e9).toFixed(1)}B
          </div>
          <p className="text-xs text-muted-foreground">
            Global trading volume
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Coins</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Live
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.active_cryptocurrencies.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Cryptocurrencies tracked
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getPercentageColor(data.market_cap_change_percentage_24h)}`}>
            {isPositive ? 'Bullish' : 'Bearish'}
          </div>
          <p className="text-xs text-muted-foreground">
            Based on 24h market change
          </p>
        </CardContent>
      </Card>
    </div>
  );
}