'use client';

import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import MarketingNavbar from './layout/marketing-navbar';
import DashboardNavbar from './layout/dashboard-navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Define dashboard routes where the dashboard navbar should be shown
  const dashboardRoutes = ['/dashboard', '/portfolio', '/alerts', '/settings'];
  const isDashboardRoute = dashboardRoutes.some(route => pathname.startsWith(route));

  return (
    <>
      <SignedOut>
        <MarketingNavbar />
      </SignedOut>

      <SignedIn>
        {isDashboardRoute ? <DashboardNavbar /> : <MarketingNavbar />}
      </SignedIn>
    </>
  );
}