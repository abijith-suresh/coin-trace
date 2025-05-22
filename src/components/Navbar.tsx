import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <Link href="/" className="text-xl font-bold">
        Coin Trace
      </Link>
      <div className="space-x-4">
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms-of-service">Terms</Link>
        <Link href="/signin">Login</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
