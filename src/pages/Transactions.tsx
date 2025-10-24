import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusBadge from '@/components/shared/StatusBadge';
import MobileNav from '@/components/layout/MobileNav';
import { ArrowUpRight, ArrowDownRight, Lock, Unlock, FileText } from 'lucide-react';
import type { WorkflowStatus } from '@/config/workflows';

interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer_in' | 'transfer_out' | 'pledge' | 'unpledge' | 'dividend' | 'bonus';
  security: string;
  quantity: number;
  value?: number;
  status: WorkflowStatus;
  date: string;
  reference: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    security: 'CRDB Bank PLC',
    quantity: 500,
    value: 75000,
    status: 'completed',
    date: '2025-10-20',
    reference: 'TXN001234',
  },
  {
    id: '2',
    type: 'pledge',
    security: 'TBL Group',
    quantity: 1000,
    value: 250000,
    status: 'in_review',
    date: '2025-10-22',
    reference: 'PLG005678',
  },
  {
    id: '3',
    type: 'transfer_in',
    security: 'NMB Bank PLC',
    quantity: 300,
    value: 45000,
    status: 'approved',
    date: '2025-10-21',
    reference: 'TRF008901',
  },
  {
    id: '4',
    type: 'dividend',
    security: 'CRDB Bank PLC',
    quantity: 5000,
    value: 125000,
    status: 'completed',
    date: '2025-10-18',
    reference: 'DIV001122',
  },
  {
    id: '5',
    type: 'sell',
    security: 'TPCC PLC',
    quantity: 200,
    value: 30000,
    status: 'pending',
    date: '2025-10-23',
    reference: 'TXN001235',
  },
];

const getTransactionIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'buy':
    case 'transfer_in':
    case 'dividend':
    case 'bonus':
      return <ArrowDownRight className="h-4 w-4 text-success" />;
    case 'sell':
    case 'transfer_out':
      return <ArrowUpRight className="h-4 w-4 text-destructive" />;
    case 'pledge':
      return <Lock className="h-4 w-4 text-warning" />;
    case 'unpledge':
      return <Unlock className="h-4 w-4 text-accent" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getTransactionLabel = (type: Transaction['type']) => {
  const labels: Record<Transaction['type'], string> = {
    buy: 'Buy',
    sell: 'Sell',
    transfer_in: 'Transfer In',
    transfer_out: 'Transfer Out',
    pledge: 'Pledge',
    unpledge: 'Unpledge',
    dividend: 'Dividend',
    bonus: 'Bonus Issue',
  };
  return labels[type];
};

function TransactionCard({ transaction }: { transaction: Transaction }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted mt-0.5">
              {getTransactionIcon(transaction.type)}
            </div>
            <div>
              <CardTitle className="text-base">{transaction.security}</CardTitle>
              <CardDescription className="text-xs">
                {getTransactionLabel(transaction.type)} · {transaction.quantity.toLocaleString()} units
              </CardDescription>
            </div>
          </div>
          <StatusBadge status={transaction.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div>
            {transaction.value && (
              <p className="font-medium">TSh {transaction.value.toLocaleString()}</p>
            )}
            <p className="text-xs text-muted-foreground">{transaction.date}</p>
          </div>
          <p className="text-xs text-muted-foreground font-mono">{transaction.reference}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Transactions() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">Transactions</h1>
          <p className="text-sm opacity-90">Your transaction history</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
            <TabsTrigger value="corporate">Corporate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-4">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>

          <TabsContent value="trades" className="space-y-3 mt-4">
            {transactions.filter(t => ['buy', 'sell'].includes(t.type)).map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>

          <TabsContent value="transfers" className="space-y-3 mt-4">
            {transactions.filter(t => ['transfer_in', 'transfer_out', 'pledge', 'unpledge'].includes(t.type)).map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>

          <TabsContent value="corporate" className="space-y-3 mt-4">
            {transactions.filter(t => ['dividend', 'bonus'].includes(t.type)).map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav />
    </div>
  );
}
