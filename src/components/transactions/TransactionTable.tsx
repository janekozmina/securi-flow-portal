import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { transactionColumns, type Transaction } from '@/config/transactions';

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
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
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={transactionColumns.length} className="text-center py-8 text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction, index) => (
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
