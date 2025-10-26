// Centralized currency configuration
export const DEFAULT_CURRENCY = 'USD';

export const AVAILABLE_CURRENCIES = [
  { value: 'USD', label: 'USD', symbol: '$' },
];

export const formatCurrency = (amount: number, currency: string = DEFAULT_CURRENCY): string => {
  const currencyConfig = AVAILABLE_CURRENCIES.find(c => c.value === currency);
  const symbol = currencyConfig?.symbol || currency;
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
