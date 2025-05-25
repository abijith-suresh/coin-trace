import { auth, currentUser } from '@clerk/nextjs/server';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { coinGeckoService } from '@/lib/services/coingecko';
import MarketOverview from '@/components/dashboard/market-overview';
import TopCoins from '@/components/dashboard/top-coins';
import { MarketOverviewSkeleton, TopCoinsSkeleton } from '@/components/dashboard/loading-skeletons';
import { Suspense } from 'react';

async function GlobalMarketData() {
  try {
    const globalData = await coinGeckoService.getGlobalMarketData();
    return <MarketOverview data={globalData} />;
  } catch (error) {
    console.error('Failed to fetch global market data:', error);
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">
          Unable to load global market data. Please try again later.
        </p>
      </div>
    );
  }
}

async function TopCoinsData() {
  try {
    const topCoins = await coinGeckoService.getTopCoins(10);
    return <TopCoins coins={topCoins} />;
  } catch (error) {
    console.error('Failed to fetch top coins data:', error);
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">
          Unable to load cryptocurrency data. Please try again later.
        </p>
      </div>
    );
  }
}

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return null; // This will be handled by the layout redirect
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName || 'Trader'}!
          </h1>
          <p className="text-muted-foreground">
            Here's your cryptocurrency portfolio overview and market insights
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <TrendingUp className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </div>

      {/* Market Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Global Market Overview</h2>
        <Suspense fallback={<MarketOverviewSkeleton />}>
          <GlobalMarketData />
        </Suspense>
      </div>

      {/* Top Cryptocurrencies */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Market Leaders</h2>
        <Suspense fallback={<TopCoinsSkeleton />}>
          <TopCoinsData />
        </Suspense>
      </div>
    </div>
  );
}