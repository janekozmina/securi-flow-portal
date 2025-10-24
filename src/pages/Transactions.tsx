import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileNav from '@/components/layout/MobileNav';
import { Search, Download, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTransactions, transactionColumns, type Transaction } from '@/config/transactions';

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {transactionColumns.map((column) => (
              <TableHead key={column.key} className="whitespace-nowrap">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-primary">
                {transaction.reference}
              </TableCell>
              <TableCell className="whitespace-nowrap">{transaction.operation}</TableCell>
              <TableCell>{transaction.instrument}</TableCell>
              <TableCell className="text-right">{transaction.quantity}</TableCell>
              <TableCell className="text-right">
                {transaction.faceAmount?.toFixed(2) || '-'}
              </TableCell>
              <TableCell className="text-right">
                {transaction.price?.toFixed(2) || '-'}
              </TableCell>
              <TableCell className="whitespace-nowrap">{transaction.valueDate}</TableCell>
              <TableCell className="whitespace-nowrap">{transaction.settlementDate}</TableCell>
              <TableCell className="text-right">
                {transaction.amount?.toFixed(2) || '-'}
              </TableCell>
              <TableCell className="text-right">
                {transaction.actualAmount?.toFixed(2) || '-'}
              </TableCell>
              <TableCell className="text-right">
                {transaction.accruedInterest?.toFixed(2) || '-'}
              </TableCell>
              <TableCell className="text-right">
                {transaction.feeAmount?.toFixed(2) || '-'}
              </TableCell>
              <TableCell className="text-right">
                {transaction.taxAmount?.toFixed(2) || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom] = useState('22.10.2025');
  const [dateTo] = useState('28.10.2025');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = mockTransactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Transactions</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Create date From {dateFrom} to {dateTo}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <TransactionTable transactions={paginatedTransactions} />

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => setRowsPerPage(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of{' '}
              {filteredTransactions.length}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
