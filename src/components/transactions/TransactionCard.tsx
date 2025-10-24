import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Transaction } from '@/config/transactions';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        {/* Primary Info - Always Visible */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Reference</p>
              <p className="font-mono text-sm font-medium text-primary truncate">
                {transaction.reference}
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0">
              {transaction.operation}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Instrument</p>
              <p className="font-medium text-sm">{transaction.instrument}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Quantity</p>
              <p className="font-medium text-sm">{transaction.quantity.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {transaction.price && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Price</p>
                <p className="font-medium text-sm">{transaction.price.toFixed(2)}</p>
              </div>
            )}
            {transaction.faceAmount && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Face Amount</p>
                <p className="font-medium text-sm">{transaction.faceAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Value Date: {transaction.valueDate}</span>
              <span>Settlement: {transaction.settlementDate}</span>
            </div>
          </div>
        </div>

        {/* Expandable Section - Additional Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {transaction.amount !== undefined && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="text-sm">{transaction.amount.toFixed(2)}</p>
                </div>
              )}
              {transaction.actualAmount !== undefined && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Actual Amount</p>
                  <p className="text-sm">{transaction.actualAmount.toFixed(2)}</p>
                </div>
              )}
              {transaction.accruedInterest !== undefined && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Accrued Interest</p>
                  <p className="text-sm">{transaction.accruedInterest.toFixed(2)}</p>
                </div>
              )}
              {transaction.feeAmount !== undefined && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fee Amount</p>
                  <p className="text-sm">{transaction.feeAmount.toFixed(2)}</p>
                </div>
              )}
              {transaction.taxAmount !== undefined && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tax Amount</p>
                  <p className="text-sm">{transaction.taxAmount.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Show More Details
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
