import { Suspense } from 'react';
import { PortfolioOverview } from '@/components/portfolio/portfolio-overview';
import { PortfolioHoldings } from '@/components/portfolio/portfolio-holdings';
import { AddCryptoDialog } from '@/components/portfolio/add-crypto-dialog';
import { PortfolioStats } from '@/components/portfolio/portfolio-stats';
import { Skeleton } from '@/components/ui/skeleton';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
            <p className="text-muted-foreground">
              Track your cryptocurrency investments and performance
            </p>
          </div>
          <AddCryptoDialog />
        </div>

        <Suspense fallback={<PortfolioSkeleton />}>
          <div className="grid gap-6">
            <PortfolioOverview />
            <PortfolioStats />
            <PortfolioHoldings />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64" />
      <Skeleton className="h-96" />
    </div>
  );
}