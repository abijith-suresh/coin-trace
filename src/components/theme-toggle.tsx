'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="ghost"
      className="transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-blue-900"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-yellow-500 transition-transform duration-200 hover:scale-110" />
      ) : (
        <Moon className="w-4 h-4 text-blue-500 transition-transform duration-200 hover:scale-110" />
      )}
    </Button>
  );
}
