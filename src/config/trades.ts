export interface Trade {
  id: string;
  reference: string;
  instrument: string;
  tradePrice: number;
  quantity: number;
  status: string;
  tradeDate: string;
  settlementDate: string;
  createdAt: string;
}

export const tradeColumns = [
  { key: 'reference', label: 'Reference' },
  { key: 'instrument', label: 'Instrument' },
  { key: 'tradePrice', label: 'Trade Price' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'status', label: 'Status' },
  { key: 'tradeDate', label: 'Trade Date' },
  { key: 'settlementDate', label: 'Settlement Date' },
];
