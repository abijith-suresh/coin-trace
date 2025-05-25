/**
 * Format a number as currency in USD
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always',
  }).format(value / 100);
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

/**
 * Get the CSS color class based on percentage value
 */
export function getPercentageColor(value: number): string {
  return value >= 0 ? 'text-green-500' : 'text-red-500';
}

export function getPercentageIcon(percentage: number): '↗' | '↘' | '→' {
  if (percentage > 0) return '↗';
  if (percentage < 0) return '↘';
  return '→';
}