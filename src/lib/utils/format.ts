export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: amount >= 1 ? 2 : 8,
  }).format(amount);
}

export function formatPercentage(percentage: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(percentage / 100);
}

export function formatNumber(num: number): string {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + 'T';
  }
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

export function formatMarketCap(marketCap: number): string {
  return formatCurrency(marketCap).replace(/\.\d{2}/, '') + formatNumber(marketCap).slice(-1);
}

export function getPercentageColor(percentage: number): string {
  if (percentage > 0) return 'text-green-500';
  if (percentage < 0) return 'text-red-500';
  return 'text-muted-foreground';
}

export function getPercentageIcon(percentage: number): '↗' | '↘' | '→' {
  if (percentage > 0) return '↗';
  if (percentage < 0) return '↘';
  return '→';
}