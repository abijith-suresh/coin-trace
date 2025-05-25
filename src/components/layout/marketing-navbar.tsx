import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import {
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';

export default function MarketingNavbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 px-4">
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

          <SignInButton mode="modal">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white dark:text-white dark:border-white dark:hover:bg-gray-200 dark:hover:text-blue-800 transition-all duration-300"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Get Started
            </Button>
          </SignUpButton>

          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center space-x-2">
          <SignInButton mode="modal">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}