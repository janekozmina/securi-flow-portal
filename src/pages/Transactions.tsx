import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileNav from '@/components/layout/MobileNav';
import TransactionCard from '@/components/transactions/TransactionCard';
import TransactionTable from '@/components/transactions/TransactionTable';
import FiltersSheet from '@/components/transactions/FiltersSheet';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTransactions } from '@/config/transactions';

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('22.10.2025');
  const [dateTo, setDateTo] = useState('28.10.2025');
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
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      {/* Mobile Header */}
      <header className="sticky top-0 z-10 bg-card border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold">Transactions</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Download className="h-4 w-4" />
              </Button>
              <FiltersSheet
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateFromChange={setDateFrom}
                onDateToChange={setDateTo}
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
          </div>

          {/* Date Range - Mobile */}
          <div className="mt-3 text-xs text-muted-foreground">
            {dateFrom} to {dateTo}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {paginatedTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            paginatedTransactions.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <TransactionTable transactions={paginatedTransactions} />
        </div>

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20 h-9">
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
                  className="h-9 w-9"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
