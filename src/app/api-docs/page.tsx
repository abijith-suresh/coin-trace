import Image from 'next/image';
import Link from 'next/link';

export default function ApiDocs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">API Documentation</h1>

      <div className="bg-card rounded-lg p-6 mb-8 border">
        <h2 className="text-2xl font-semibold mb-4">Data Attribution</h2>
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="https://static.coingecko.com/s/coingecko-logo-8903d34ce19ca4be1c81f0db30e924154750d208683fad7ae6f2ce06c76d0a56.png"
            alt="CoinGecko Logo"
            width={200}
            height={40}
          />
        </div>
        <p className="text-muted-foreground mb-4">
          Coin Trace proudly uses CoinGecko's Cryptocurrency Data API. All cryptocurrency data, including prices,
          market caps, and other metrics are powered by CoinGecko's comprehensive API service.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            • Data provided by <Link href="https://www.coingecko.com/en/api" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">CoinGecko API</Link>
          </p>
          <p className="text-sm text-muted-foreground">
            • Visit <Link href="https://www.coingecko.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">CoinGecko.com</Link> for more cryptocurrency data
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-2xl font-semibold mb-4">API Features</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-2">
            <span className="font-medium">Real-time Cryptocurrency Data:</span>
            <span className="text-muted-foreground">Access to live prices, market caps, and trading volumes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">Historical Data:</span>
            <span className="text-muted-foreground">Historical price and market data for analysis</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">Portfolio Tracking:</span>
            <span className="text-muted-foreground">Track your crypto investments with real-time updates</span>
          </li>
        </ul>
      </div>
    </div>
  );
}