import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/config/currency';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import MobileNav from '@/components/layout/MobileNav';
import { Badge } from '@/components/ui/badge';

interface Bid {
  id: string;
  auction_id: string;
  bid_price: number;
  quantity: number;
  status: string;
  created_at: string;
  auctions: {
    reference: string;
    instrument: string;
    start_date: string;
  } | null;
}

export default function Bids() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to view your bids');
        return;
      }

      const { data, error } = await supabase
        .from('bids')
        .select(`
          *,
          auctions (
            reference,
            instrument,
            start_date
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBids(data || []);
    } catch (error: any) {
      console.error('Error fetching bids:', error);
      toast.error('Failed to load bids');
    } finally {
      setLoading(false);
    }
  };

  const filteredBids = bids.filter(bid => {
    const matchesSearch = 
      bid.auctions?.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.auctions?.instrument.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bid.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBids.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedBids = filteredBids.slice(startIndex, endIndex);

  const handleExport = () => {
    toast.success('Bids exported successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="bg-primary text-primary-foreground px-4 pt-6 pb-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">My Bids</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <p>Loading bids...</p>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">My Bids</h1>
          <p className="text-sm opacity-90">View and track your auction bids</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {filteredBids.length} Bid{filteredBids.length !== 1 ? 's' : ''}
          </h2>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <Card className="mb-6">
          <div className="p-4 space-y-4">
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by reference or instrument..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Instrument</TableHead>
                  <TableHead>Bid Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Auction Date</TableHead>
                  <TableHead>Placed On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBids.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell className="font-medium">{bid.auctions?.reference || 'N/A'}</TableCell>
                    <TableCell>{bid.auctions?.instrument || 'N/A'}</TableCell>
                    <TableCell>{formatCurrency(bid.bid_price)}</TableCell>
                    <TableCell>{bid.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        bid.status.toLowerCase() === 'pending' ? 'secondary' :
                        bid.status.toLowerCase() === 'accepted' ? 'outline' :
                        'destructive'
                      }>
                        {bid.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{bid.auctions?.start_date || 'N/A'}</TableCell>
                    <TableCell>{new Date(bid.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between p-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select
                value={rowsPerPage.toString()}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {startIndex + 1}-{Math.min(endIndex, filteredBids.length)} of {filteredBids.length}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <MobileNav />
    </div>
  );
}
