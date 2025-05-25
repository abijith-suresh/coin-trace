"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePortfolio } from '@/hooks/use-portfolio';
import { formatCurrency, formatPercentage } from '@/lib/utils/format';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#FF7C7C', '#8DD1E1', '#D084D0'
];

interface PerformanceData {
  name: string;
  value: number;
  change: number;
  changeValue: number;
}

function StatsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={`skeleton-stat-${i}`} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>24h Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PortfolioStats() {
  const { holdings, portfolioSummary, isLoading } = usePortfolio();

  if (isLoading) {
    return <StatsSkeleton />;
  }

  // Prepare data for pie chart (allocation)
  const pieData = holdings.map((holding, index) => ({
    name: holding.symbol.toUpperCase(),
    value: holding.totalValue,
    percentage: (holding.totalValue / portfolioSummary.totalValue) * 100,
    color: COLORS[index % COLORS.length]
  }));

  // Prepare data for bar chart (performance)
  const performanceData = holdings.map(holding => ({
    name: holding.symbol.toUpperCase(),
    value: holding.totalValue,
    change: holding.priceChange24hPercent,
    changeValue: (holding.totalValue * holding.priceChange24hPercent) / 100
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-blue-500">
            {`Value: ${formatCurrency(payload[0].value)}`}
          </p>
          {payload[0].payload.percentage && (
            <p className="text-muted-foreground">
              {`${formatPercentage(payload[0].payload.percentage)} of portfolio`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const PerformanceTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-3 shadow-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-blue-500">
            {`Value: ${formatCurrency(data.value)}`}
          </p>
          <p className={data.change >= 0 ? 'text-green-500' : 'text-red-500'}>
            {`24h Change: ${formatPercentage(data.change)}`}
          </p>
          <p className={data.changeValue >= 0 ? 'text-green-500' : 'text-red-500'}>
            {`${formatCurrency(Math.abs(data.changeValue))} ${data.changeValue >= 0 ? 'gain' : 'loss'}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (holdings.length === 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No data to display
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>24h Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No data to display
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${formatPercentage(percentage)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(item.value)}</div>
                  <div className="text-muted-foreground">{formatPercentage(item.percentage)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>24h Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<PerformanceTooltip />} />
                <Bar
                  dataKey="changeValue"
                  fill="#22c55e"
                  radius={[2, 2, 0, 0]}
                >
                  {performanceData.map((entry: PerformanceData, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.changeValue >= 0 ? '#22c55e' : '#ef4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}