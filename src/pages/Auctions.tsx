import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MobileNav from '@/components/layout/MobileNav';
import { Gavel, Clock, TrendingUp } from 'lucide-react';

const auctions = [
  {
    id: '1',
    security: 'Tanzania Government Bond',
    isin: 'TZ000A001',
    lotSize: 1000,
    minBid: 95.50,
    currentBid: 97.25,
    bidsCount: 12,
    closingDate: '2025-10-28',
    closingTime: '14:00',
    status: 'active',
  },
  {
    id: '2',
    security: 'CRDB Bank Rights Issue',
    isin: 'TZ000001R',
    lotSize: 500,
    minBid: 150.00,
    currentBid: 152.50,
    bidsCount: 8,
    closingDate: '2025-10-26',
    closingTime: '16:00',
    status: 'active',
  },
  {
    id: '3',
    security: 'Treasury Bill 91-Day',
    isin: 'TZ000TB91',
    lotSize: 10000,
    minBid: 98.75,
    currentBid: null,
    bidsCount: 0,
    closingDate: '2025-10-30',
    closingTime: '12:00',
    status: 'upcoming',
  },
];

export default function Auctions() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Gavel className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Auctions</h1>
          </div>
          <p className="text-sm opacity-90">Active and upcoming securities auctions</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            {auctions.filter(a => a.status === 'active').length} Active Auctions
          </h2>
        </div>

        <div className="space-y-3">
          {auctions.map((auction) => (
            <Card key={auction.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-base">{auction.security}</CardTitle>
                    <CardDescription className="text-xs">{auction.isin}</CardDescription>
                  </div>
                  <Badge variant={auction.status === 'active' ? 'default' : 'secondary'}>
                    {auction.status === 'active' ? 'Active' : 'Upcoming'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Lot Size</p>
                    <p className="font-medium">{auction.lotSize.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Bid</p>
                    <p className="font-medium">TSh {auction.minBid.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bids</p>
                    <p className="font-medium">{auction.bidsCount}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {auction.currentBid && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-accent/10">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Current Highest Bid</p>
                      <p className="font-bold text-accent">TSh {auction.currentBid.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Closes:</span>
                  <span className="font-medium">{auction.closingDate} at {auction.closingTime}</span>
                </div>

                <Button className="w-full" disabled={auction.status === 'upcoming'}>
                  {auction.status === 'active' ? 'Place Bid' : 'Not Yet Open'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-base">Auction Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>• Ensure sufficient free balance before bidding</p>
            <p>• Bids are binding once submitted</p>
            <p>• Final allocation notified after auction close</p>
            <p>• Settlement occurs automatically upon success</p>
          </CardContent>
        </Card>
      </main>

      <MobileNav />
    </div>
  );
}
