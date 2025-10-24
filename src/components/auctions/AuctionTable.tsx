import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, MessageSquare, Copy } from 'lucide-react';
import type { AuctionItem } from '@/config/auctions';

interface AuctionTableProps {
  auctions: AuctionItem[];
  onPlaceBid: (auction: AuctionItem) => void;
  onMessage: () => void;
  onCopyReference: (reference: string) => void;
}

export default function AuctionTable({ auctions, onPlaceBid, onMessage, onCopyReference }: AuctionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Instrument</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Instrument Code</TableHead>
            <TableHead>Flex</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Close Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auctions.map((auction) => (
            <TableRow key={auction.reference}>
              <TableCell className="font-mono">
                <div className="flex items-center gap-2">
                  {auction.reference}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onCopyReference(auction.reference)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{auction.instrument}</TableCell>
              <TableCell>{auction.code}</TableCell>
              <TableCell>{auction.instrumentCode}</TableCell>
              <TableCell>{auction.flex}</TableCell>
              <TableCell>{auction.startDate}</TableCell>
              <TableCell>{auction.closeDate}</TableCell>
              <TableCell>
                <Badge variant={auction.status === 'Opened' ? 'default' : 'secondary'}>
                  {auction.statusName}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    onClick={() => onPlaceBid(auction)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Place Bid
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onMessage}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
