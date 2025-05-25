import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Activity className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">Coin Trace</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-sm font-medium hover:text-blue-500 transition-colors"
          >
            Terms
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile menu button - you can implement mobile menu later */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}