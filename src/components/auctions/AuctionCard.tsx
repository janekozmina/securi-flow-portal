import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, FileText, MessageSquare } from 'lucide-react';
import type { AuctionItem } from '@/config/auctions';

interface AuctionCardProps {
  auction: AuctionItem;
  onPlaceBid: (auction: AuctionItem) => void;
  onMessage: () => void;
  onCopyReference: (reference: string) => void;
}

export default function AuctionCard({ auction, onPlaceBid, onMessage, onCopyReference }: AuctionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs text-muted-foreground">Reference</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => onCopyReference(auction.reference)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="font-mono text-sm font-medium text-primary">
                {auction.reference}
              </p>
            </div>
            <Badge variant={auction.status === 'Opened' ? 'default' : 'secondary'} className="shrink-0">
              {auction.statusName}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Instrument</p>
              <p className="font-medium text-sm">{auction.instrument}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Code</p>
              <p className="font-medium text-sm">{auction.code}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Instrument Code</p>
              <p className="font-medium text-sm">{auction.instrumentCode}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Flex</p>
              <p className="font-medium text-sm">{auction.flex}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Start Date</p>
              <p className="font-medium text-sm">{auction.startDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Close Date</p>
              <p className="font-medium text-sm">{auction.closeDate}</p>
            </div>
          </div>

          <div className="pt-2 border-t grid grid-cols-2 gap-2">
            <Button
              className="w-full"
              onClick={() => onPlaceBid(auction)}
            >
              <FileText className="h-4 w-4 mr-2" />
              Place Bid
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={onMessage}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
