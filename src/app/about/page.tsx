import { Button } from '@/components/ui/button';
import { Activity, Code, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="h-8 w-8 text-blue-500" />
        <h1 className="text-4xl font-bold">About Coin Trace</h1>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-8">
          Coin Trace is a minimalist cryptocurrency tracker built as a personal hobby project by a passionate developer.
          It leverages real-time data from the CoinGecko API and presents it in a clean, distraction-free interface,
          making it easy for crypto enthusiasts to track their investments.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Technology Stack</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                Next.js 15 & React 19
              </li>
              <li className="flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-500" />
                Tailwind CSS v4 & ShadCN
              </li>
              <li className="flex items-center gap-2">
                <Code className="h-5 w-5 text-green-500" />
                TypeScript & Node.js
              </li>
              <li className="flex items-center gap-2">
                <Code className="h-5 w-5 text-orange-500" />
                Clerk Authentication
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Features</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Real-time market data tracking</li>
              <li>Portfolio management & analysis</li>
              <li>Customizable watchlists</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Project Vision</h2>
        <p className="text-muted-foreground mb-8">
          While Coin Trace started as a personal project, it has evolved into a showcase of modern web development practices
          and clean UI design. The project emphasizes performance, user experience, and code quality. Future development
          will focus on expanding portfolio analytics, adding social features, and implementing advanced trading indicators.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
        <p className="text-muted-foreground mb-6">
          Coin Trace is open source and welcomes contributions from the community. Whether you're interested in adding new
          features, fixing bugs, or improving documentation, your help is appreciated.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button variant="outline" asChild>
            <Link href="https://github.com/abijith-suresh/coin-trace" className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              View on GitHub
            </Link>
          </Button>
          {/* TODO: Add other socials */}
          {/* <Button variant="outline" asChild>
            <Link href="https://twitter.com/cointrace" className="flex items-center gap-2">
              <Twitter className="h-5 w-5" />
              Follow Updates
            </Link>
          </Button> */}
        </div>

        <div className="bg-muted p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-3">Get Involved</h3>
          <p className="text-muted-foreground mb-4">
            Interested in contributing or have suggestions? We'd love to hear from you!
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}