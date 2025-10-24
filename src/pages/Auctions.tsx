import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileNav from '@/components/layout/MobileNav';
import NewBuyOrderDialog from '@/components/auctions/NewBuyOrderDialog';
import TextMessagesDialog from '@/components/auctions/TextMessagesDialog';
import AuctionCard from '@/components/auctions/AuctionCard';
import AuctionTable from '@/components/auctions/AuctionTable';
import { Gavel, Search, Download, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { mockAuctions, AuctionItem } from '@/config/auctions';
import { toast } from 'sonner';

export default function Auctions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange] = useState({ from: '08.10.2025', to: '23.10.2025' });
  const [statusFilter, setStatusFilter] = useState<'Active' | 'All'>('Active');
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(null);
  const [buyOrderOpen, setBuyOrderOpen] = useState(false);
  const [textMessagesOpen, setTextMessagesOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredAuctions = mockAuctions.filter((auction) => {
    const matchesSearch =
      auction.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'All' || auction.status === 'Opened';
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAuctions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedAuctions = filteredAuctions.slice(startIndex, endIndex);

  const handlePlaceBid = (auction: AuctionItem) => {
    setSelectedAuction(auction);
    setBuyOrderOpen(true);
  };

  const handleCopyReference = (reference: string) => {
    navigator.clipboard.writeText(reference);
    toast.success('Reference copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Header - Sticky on mobile */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground px-4 py-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gavel className="h-6 w-6" />
              <h1 className="text-xl lg:text-2xl font-bold">Auctions</h1>
            </div>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 lg:mr-2" />
              <span className="hidden lg:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Filters Section */}
        <div className="mb-4 space-y-3">
          {/* Date Range */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Period:</span>
                <span className="font-medium">
                  {dateRange.from} - {dateRange.to}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Status Filter & Search */}
          <div className="flex gap-3">
            <Card className="flex-1">
              <CardContent className="p-3">
                <RadioGroup
                  value={statusFilter}
                  onValueChange={(value: 'Active' | 'All') => setStatusFilter(value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Active" id="active" />
                    <Label htmlFor="active" className="text-sm">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="All" id="all" />
                    <Label htmlFor="all" className="text-sm">All</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-full"
              />
            </div>
          </div>
        </div>

        {/* Mobile View - Cards */}
        <div className="lg:hidden space-y-3">
          {paginatedAuctions.map((auction) => (
            <AuctionCard
              key={auction.reference}
              auction={auction}
              onPlaceBid={handlePlaceBid}
              onMessage={() => setTextMessagesOpen(true)}
              onCopyReference={handleCopyReference}
            />
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden lg:block">
          {paginatedAuctions.length > 0 ? (
            <AuctionTable
              auctions={paginatedAuctions}
              onPlaceBid={handlePlaceBid}
              onMessage={() => setTextMessagesOpen(true)}
              onCopyReference={handleCopyReference}
            />
          ) : null}
        </div>

        {/* Empty State */}
        {filteredAuctions.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Gavel className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No auctions found</p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {filteredAuctions.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Rows per page:</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {startIndex + 1}-{Math.min(endIndex, filteredAuctions.length)} of {filteredAuctions.length}
              </span>
              
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <NewBuyOrderDialog
        open={buyOrderOpen}
        onOpenChange={setBuyOrderOpen}
        auctionReference={selectedAuction?.reference}
      />

      <TextMessagesDialog
        open={textMessagesOpen}
        onOpenChange={setTextMessagesOpen}
      />

      <MobileNav />
    </div>
  );
}
