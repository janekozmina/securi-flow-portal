import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import MobileNav from '@/components/layout/MobileNav';
import NewBuyOrderDialog from '@/components/auctions/NewBuyOrderDialog';
import TextMessagesDialog from '@/components/auctions/TextMessagesDialog';
import { Gavel, Search, Calendar, FileText, MessageSquare, Copy, Download } from 'lucide-react';
import { mockAuctions, AuctionItem } from '@/config/auctions';
import { toast } from 'sonner';

export default function Auctions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ from: '08.10.2025', to: '23.10.2025' });
  const [statusFilter, setStatusFilter] = useState<'Active' | 'All'>('Active');
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(null);
  const [buyOrderOpen, setBuyOrderOpen] = useState(false);
  const [textMessagesOpen, setTextMessagesOpen] = useState(false);

  const filteredAuctions = mockAuctions.filter((auction) => {
    const matchesSearch =
      auction.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'All' || auction.status === 'Opened';
    
    return matchesSearch && matchesStatus;
  });

  const handlePlaceBid = (auction: AuctionItem) => {
    setSelectedAuction(auction);
    setBuyOrderOpen(true);
  };

  const handleCopyReference = (reference: string) => {
    navigator.clipboard.writeText(reference);
    toast.success('Reference copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Gavel className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Auctions</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        {/* Date Range */}
        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Start date</span>
            </div>
            <p className="font-medium mt-1">
              From {dateRange.from} to {dateRange.to}
            </p>
          </CardContent>
        </Card>

        {/* Status Filter */}
        <Card className="mb-4">
          <CardContent className="pt-4">
            <RadioGroup
              value={statusFilter}
              onValueChange={(value: 'Active' | 'All') => setStatusFilter(value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Active" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="All" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Auctions List */}
        <div className="space-y-3">
          {filteredAuctions.map((auction) => (
            <Card key={auction.reference}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base">Reference: {auction.reference}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopyReference(auction.reference)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <CardDescription className="text-xs space-y-1">
                      <div>Instrument: {auction.instrument}</div>
                      <div>Code: {auction.code}</div>
                    </CardDescription>
                  </div>
                  <Badge variant={auction.status === 'Opened' ? 'default' : 'secondary'}>
                    {auction.statusName}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Instrument code</p>
                    <p className="font-medium">{auction.instrumentCode}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Flex</p>
                    <p className="font-medium">{auction.flex}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start date</p>
                    <p className="font-medium">{auction.startDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Close date</p>
                    <p className="font-medium">{auction.closeDate}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="w-full"
                    onClick={() => handlePlaceBid(auction)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Place Bid
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setTextMessagesOpen(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No auctions found
            </CardContent>
          </Card>
        )}

        {/* Pagination Info */}
        {filteredAuctions.length > 0 && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Rows per page: 10 • 1-{filteredAuctions.length} of {filteredAuctions.length}
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
