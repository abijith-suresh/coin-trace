import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Activity, BarChart3, Wallet, Settings, Bell } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { UserButton } from '@clerk/nextjs';

export default function DashboardNavbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Activity className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold">Coin Trace</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center space-x-1"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center space-x-1"
          >
            <Wallet className="h-4 w-4" />
            <span>Portfolio</span>
          </Link>
          <Link
            href="/alerts"
            className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center space-x-1"
          >
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
          </Link>
          <Link
            href="/settings"
            className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center space-x-1"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />

          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center space-x-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}