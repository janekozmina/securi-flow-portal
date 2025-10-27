export interface Bid {
  id: string;
  reference: string;
  instrument: string;
  bidPrice: number;
  quantity: number;
  status: string;
  auctionDate: string;
  createdAt: string;
}

export const bidColumns = [
  { key: 'reference', label: 'Reference' },
  { key: 'instrument', label: 'Instrument' },
  { key: 'bidPrice', label: 'Bid Price' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'status', label: 'Status' },
  { key: 'auctionDate', label: 'Auction Date' },
  { key: 'createdAt', label: 'Placed On' },
];
