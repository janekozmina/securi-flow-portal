export interface AuctionItem {
  reference: string;
  instrument: string;
  code: string;
  flex: 'Yes' | 'No';
  instrumentCode: string;
  status: string;
  statusName: string;
  recommendedPrice?: number;
  startDate: string;
  closeDate: string;
}

export interface BuyOrderData {
  positionAccount: string;
  orderType: 'Competitive' | 'Non-Competitive';
  executionType: 'Partial Execution' | 'Full Execution';
  units: number;
  currency: string;
  lots: number;
  approxSettlementAmount: number;
}

export interface SecurityBorrowingData {
  tradeDate: string;
  settlementCurrency: string;
  borrowerParty: string;
  borrowerAccount: string;
  lenderParty: string;
  lenderAccount: string;
  manufactureDividend: {
    onMainInstrument: boolean;
    onCollateral: boolean;
  };
  instrument: {
    code: string;
    quantity: number;
    faceAmount: number;
  };
  collateral: {
    autoSelect: boolean;
  };
  firstLegDetails: {
    pricePerUnit: number;
    dealAmount: number;
    currency: string;
    accruedInterestAmount: number;
    settlementAmount: number;
  };
  secondLegDetails: {
    buyBackDate: string;
    term: number;
    lendingFeeRate: number;
    lendingFee: number;
    currency: string;
  };
  resultingSettlementAmount: number;
  currency: string;
}

// Mock auction data based on screenshots
export const mockAuctions: AuctionItem[] = [
  {
    reference: '1',
    instrument: 'AU000224552',
    code: 'AU000224552/MN',
    flex: 'No',
    instrumentCode: 'AO',
    status: 'Opened',
    statusName: 'Opened',
    startDate: '23.10.2025',
    closeDate: '23.10.2025',
  },
  {
    reference: '3',
    instrument: 'BW000000124',
    code: 'BW000000124/MN',
    flex: 'No',
    instrumentCode: 'AO',
    status: 'Opened',
    statusName: 'Opened',
    startDate: '08.10.2025',
    closeDate: '08.10.2025',
  },
];

// Position accounts for buy orders
export const positionAccounts = [
  { value: '1004312ICSX00', label: '1004312ICSX00' },
];

// Currencies
export const currencies = [
  { value: 'BWP', label: 'BWP' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
];
