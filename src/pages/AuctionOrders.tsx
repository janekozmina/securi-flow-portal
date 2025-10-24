import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AuctionOrders() {
  const orders = [
    {
      id: 'AO-001',
      security: 'CRDB-BOND-2025',
      quantity: 1000,
      bidPrice: 105.5,
      status: 'active',
      date: '2024-01-15',
    },
    {
      id: 'AO-002',
      security: 'TBL-91D-2024',
      quantity: 500,
      bidPrice: 98.75,
      status: 'won',
      date: '2024-01-14',
    },
    {
      id: 'AO-003',
      security: 'GOV-BOND-10Y',
      quantity: 2000,
      bidPrice: 102.3,
      status: 'outbid',
      date: '2024-01-13',
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'won':
        return 'outline';
      case 'outbid':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Auction Orders</h1>
        <p className="text-muted-foreground">View and manage your auction bid orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>Track your auction participation and bid status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Bid Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.security}</TableCell>
                    <TableCell className="text-right">{order.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{order.bidPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
