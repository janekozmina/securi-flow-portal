import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BuyOrderData, positionAccounts, currencies } from '@/config/auctions';
import { toast } from 'sonner';

interface NewBuyOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auctionReference?: string;
}

export default function NewBuyOrderDialog({
  open,
  onOpenChange,
  auctionReference,
}: NewBuyOrderDialogProps) {
  const [orderData, setOrderData] = useState<BuyOrderData>({
    positionAccount: '1004312ICSX00',
    orderType: 'Competitive',
    executionType: 'Full Execution',
    units: 55,
    currency: 'BWP',
    lots: 55,
    approxSettlementAmount: 4950,
  });

  const handleCalculate = () => {
    // Mock calculation
    const settlement = orderData.units * 90;
    setOrderData({ ...orderData, approxSettlementAmount: settlement });
    toast.success('Settlement amount calculated');
  };

  const handleBuy = () => {
    toast.success(
      `Auction bid P${String(Math.floor(Math.random() * 1000000000000)).padStart(12, '0')} has been sent`
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Buy Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Buyer Section */}
          <div className="space-y-4">
            <h3 className="font-medium">Buyer</h3>
            <div className="space-y-2">
              <Label htmlFor="positionAccount">Position Account *</Label>
              <Select
                value={orderData.positionAccount}
                onValueChange={(value) =>
                  setOrderData({ ...orderData, positionAccount: value })
                }
              >
                <SelectTrigger id="positionAccount">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {positionAccounts.map((account) => (
                    <SelectItem key={account.value} value={account.value}>
                      {account.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="font-medium">Order details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioGroup
                value={orderData.orderType}
                onValueChange={(value: 'Competitive' | 'Non-Competitive') =>
                  setOrderData({ ...orderData, orderType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Competitive" id="competitive" />
                  <Label htmlFor="competitive">Competitive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Non-Competitive" id="non-competitive" />
                  <Label htmlFor="non-competitive">Non-Competitive</Label>
                </div>
              </RadioGroup>

              <RadioGroup
                value={orderData.executionType}
                onValueChange={(value: 'Partial Execution' | 'Full Execution') =>
                  setOrderData({ ...orderData, executionType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Partial Execution" id="partial" />
                  <Label htmlFor="partial">Partial Execution</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Full Execution" id="full" />
                  <Label htmlFor="full">Full Execution</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <div className="flex gap-2 items-center">
                  <Input type="number" value={90} readOnly className="flex-1" />
                  <span className="text-sm font-medium px-3 py-2 bg-muted rounded-md">
                    {orderData.currency}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="units">Units *</Label>
                <Input
                  id="units"
                  type="number"
                  value={orderData.units}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      units: parseFloat(e.target.value) || 0,
                      lots: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lots</Label>
              <Input type="number" value={orderData.lots} readOnly />
            </div>

            <div className="space-y-2">
              <Label>Approx Settlement Amount</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={orderData.approxSettlementAmount.toLocaleString()}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={handleCalculate} variant="secondary">
                  CALC
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            CLOSE
          </Button>
          <Button onClick={handleBuy}>BUY</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
