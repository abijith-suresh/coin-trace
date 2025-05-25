"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePortfolio } from '@/hooks/use-portfolio';
import { formatCurrency, formatPercentage } from '@/lib/utils/format';
import { Edit3, Search, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';

function HoldingsSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">24h Change</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }, (_, i) => (
            <TableRow key={`skeleton-row-${i}`}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-24 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-28 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-6 w-20 ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function PortfolioHoldings() {
  const { holdings, removeHolding, updateHolding, isLoading } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');

  const filteredHoldings = holdings.filter(holding =>
    holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holding.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (holding: any) => {
    setEditingId(holding.id);
    setEditAmount(holding.amount.toString());
  };

  const handleSaveEdit = async (holding: any) => {
    await updateHolding(holding.id, { amount: parseFloat(editAmount) });
    setEditingId(null);
    setEditAmount('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditAmount('');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Holdings</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <HoldingsSkeleton />
        ) : filteredHoldings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm ? 'No holdings match your search.' : 'No cryptocurrencies in your portfolio yet.'}
            </p>
            {!searchTerm && (
              <p className="text-sm text-muted-foreground mt-2">
                Add some cryptocurrencies to start tracking your portfolio.
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">24h Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHoldings.map((holding) => {
                  const isPositive = holding.priceChange24hPercent >= 0;
                  const isEditing = editingId === holding.id;

                  return (
                    <TableRow key={`holding-${holding.id}`}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={holding.image}
                            alt={holding.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="font-medium">{holding.name}</div>
                            <div className="text-sm text-muted-foreground uppercase">
                              {holding.symbol}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end space-x-2">
                            <Input
                              type="number"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="w-24 h-8"
                              step="0.00000001"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(holding)}
                              className="h-8 px-2"
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                              className="h-8 px-2"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="font-mono">
                            {holding.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 8
                            })} {holding.symbol.toUpperCase()}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(holding.currentPrice)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-medium">
                        {formatCurrency(holding.totalValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          {isPositive ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <Badge
                            variant={isPositive ? 'default' : 'destructive'}
                            className={isPositive ? 'bg-green-500' : ''}
                          >
                            {formatPercentage(holding.priceChange24hPercent)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(holding)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeHolding(holding.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}