import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ArrowRight } from 'lucide-react';

const stats = [
  { value: "Open Source", label: "Fully Transparent Code" },
  { value: "10,000+", label: "Cryptocurrencies Tracked" },
  { value: "Real-Time", label: "Market Data via CoinGecko" },
  { value: "Hobby Project", label: "Built for Learning & Fun" }
];

export default function HeroSection() {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

      <div className="relative max-w-5xl mx-auto">
        <Badge variant="secondary" className="mb-4">
          <Zap className="h-3 w-3 mr-1" />
          Built with Next.js, React, and CoinGecko API
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent pb-4">
          Explore Crypto in a Minimal Way
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Coin Trace is a clean and developer-focused crypto tracker built for fun and learning.
          Track real-time prices, manage a watchlist, and discover trends — powered by CoinGecko.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button size="lg" className="text-lg px-10 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg" asChild>
            <Link href="/signup">
              Try It Out
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-10 py-4 text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white dark:text-white dark:border-white dark:hover:bg-gray-200 dark:hover:text-blue-800" asChild>
            <Link href="/demo">
              View Demo
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
