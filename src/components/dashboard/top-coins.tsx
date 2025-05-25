import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CoinData } from '@/lib/services/coingecko';
import { formatCurrency, formatPercentage, getPercentageColor } from '@/lib/utils/format';
import CoinImage from './coin-image';

interface TopCoinsProps {
  coins: CoinData[];
  limit?: number;
}

export default function TopCoins({ coins, limit = 10 }: TopCoinsProps) {
  const displayCoins = coins.slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Top Cryptocurrencies
          <Badge variant="outline">Live Prices</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayCoins.map((coin, index) => {
            const isPositive = coin.price_change_percentage_24h >= 0;

            return (
              <div
                key={coin.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <CoinImage
                      src={coin.image}
                      alt={coin.name}
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-sm text-muted-foreground uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold">
                      {formatCurrency(coin.current_price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      MCap: ${(coin.market_cap / 1e9).toFixed(1)}B
                    </div>
                  </div>

                  <div className={`flex items-center space-x-1 ${getPercentageColor(coin.price_change_percentage_24h)}`}>
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}