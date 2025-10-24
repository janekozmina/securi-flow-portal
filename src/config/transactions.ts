export interface Transaction {
  reference: string;
  operation: string;
  instrument: string;
  quantity: number;
  faceAmount?: number;
  price?: number;
  valueDate: string;
  settlementDate: string;
  amount?: number;
  actualAmount?: number;
  accruedInterest?: number;
  feeAmount?: number;
  taxAmount?: number;
}

export const transactionColumns = [
  { key: 'reference', label: 'Reference' },
  { key: 'operation', label: 'Operation' },
  { key: 'instrument', label: 'Instrument' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'faceAmount', label: 'Face amount' },
  { key: 'price', label: 'Price' },
  { key: 'valueDate', label: 'Value date' },
  { key: 'settlementDate', label: 'Settlement date' },
  { key: 'amount', label: 'Amount' },
  { key: 'actualAmount', label: 'Actual amount' },
  { key: 'accruedInterest', label: 'Accrued interest' },
  { key: 'feeAmount', label: 'Fee amount' },
  { key: 'taxAmount', label: 'Tax amount' },
] as const;

export const mockTransactions: Transaction[] = [
  {
    reference: '1004XXXX1023B003',
    operation: 'Security borrowing',
    instrument: 'TESTEQTY001',
    quantity: 5,
    faceAmount: undefined,
    price: 91.00,
    valueDate: '23.10.2025',
    settlementDate: '23.10.2025',
    amount: undefined,
    actualAmount: undefined,
    accruedInterest: undefined,
    feeAmount: undefined,
    taxAmount: undefined,
  },
  {
    reference: '1004XXXX1023B001',
    operation: 'Security borrowing',
    instrument: 'ZAE40000036',
    quantity: 2,
    faceAmount: undefined,
    price: 98.00,
    valueDate: '23.10.2025',
    settlementDate: '23.10.2025',
    amount: undefined,
    actualAmount: undefined,
    accruedInterest: undefined,
    feeAmount: undefined,
    taxAmount: undefined,
  },
  {
    reference: '1004XXXX1023B002',
    operation: 'Security borrowing',
    instrument: 'ZAE40000036',
    quantity: 5,
    faceAmount: 150000.00,
    price: undefined,
    valueDate: '23.10.2025',
    settlementDate: '23.10.2025',
    amount: undefined,
    actualAmount: undefined,
    accruedInterest: undefined,
    feeAmount: undefined,
    taxAmount: undefined,
  },
];
