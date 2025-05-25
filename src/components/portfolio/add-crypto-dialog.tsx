"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useCryptoSearch } from '@/hooks/use-crypto-search';
import { usePortfolio } from '@/hooks/use-portfolio';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/format';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import { useState } from 'react';

export function AddCryptoDialog() {
  const [open, setOpen] = useState(false);
  const [comboOpen, setComboOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const { addHolding, isLoading } = usePortfolio();
  const { cryptos, searchCryptos, isSearching } = useCryptoSearch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCrypto || !amount || parseFloat(amount) <= 0) {
      return;
    }

    await addHolding({
      cryptoId: selectedCrypto.id,
      symbol: selectedCrypto.symbol,
      name: selectedCrypto.name,
      amount: parseFloat(amount),
      image: selectedCrypto.image
    });

    // Reset form
    setSelectedCrypto(null);
    setAmount('');
    setSearchValue('');
    setOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.length >= 2) {
      searchCryptos(value);
    }
  };

  const totalValue = selectedCrypto && amount
    ? selectedCrypto.current_price * parseFloat(amount || '0')
    : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Cryptocurrency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Cryptocurrency</DialogTitle>
          <DialogDescription>
            Add a cryptocurrency to your portfolio to track its performance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crypto-select">Cryptocurrency</Label>
            <Popover open={comboOpen} onOpenChange={setComboOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboOpen}
                  className="w-full justify-between"
                >
                  {selectedCrypto ? (
                    <div className="flex items-center space-x-2">
                      <img
                        src={selectedCrypto.image}
                        alt={selectedCrypto.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span>{selectedCrypto.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {selectedCrypto.symbol.toUpperCase()}
                      </Badge>
                    </div>
                  ) : (
                    "Select cryptocurrency..."
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search cryptocurrencies..."
                    value={searchValue}
                    onValueChange={handleSearch}
                  />
                  <CommandList>
                    {isSearching ? (
                      <CommandEmpty>Searching...</CommandEmpty>
                    ) : cryptos.length === 0 ? (
                      <CommandEmpty>
                        {searchValue.length >= 2 ? "No cryptocurrencies found." : "Start typing to search..."}
                      </CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {cryptos.map((crypto) => (
                          <CommandItem
                            key={crypto.id}
                            value={crypto.id}
                            onSelect={() => {
                              setSelectedCrypto(crypto);
                              setComboOpen(false);
                            }}
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <img
                                src={crypto.image}
                                alt={crypto.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{crypto.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {formatCurrency(crypto.current_price)}
                                </div>
                              </div>
                              <Badge variant="secondary">
                                {crypto.symbol.toUpperCase()}
                              </Badge>
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  selectedCrypto?.id === crypto.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.00000001"
              min="0"
              required
            />
            {selectedCrypto && amount && (
              <p className="text-sm text-muted-foreground">
                Total value: {formatCurrency(totalValue)}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedCrypto || !amount || parseFloat(amount) <= 0 || isLoading}
            >
              {isLoading ? 'Adding...' : 'Add to Portfolio'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}