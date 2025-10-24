import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MobileNav from '@/components/layout/MobileNav';
import { TrendingUp, Lock } from 'lucide-react';

const holdings = [
  { isin: 'TZ000001', name: 'CRDB Bank PLC', quantity: 5000, free: 4000, pledged: 1000, value: 750000 },
  { isin: 'TZ000002', name: 'NMB Bank PLC', quantity: 3000, free: 3000, pledged: 0, value: 450000 },
  { isin: 'TZ000003', name: 'TBL Group', quantity: 2500, free: 1500, pledged: 1000, value: 625000 },
  { isin: 'TZ000004', name: 'TPCC PLC', quantity: 1500, free: 1500, pledged: 0, value: 225000 },
];

export default function Portfolio() {
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalFree = holdings.reduce((sum, h) => sum + (h.value * h.free / h.quantity), 0);
  const totalPledged = holdings.reduce((sum, h) => sum + (h.value * h.pledged / h.quantity), 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">Portfolio</h1>
          <p className="text-sm opacity-90">Your securities holdings</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">Total Value</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">
                {(totalValue / 1000000).toFixed(1)}M
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Free
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-success">
                {(totalFree / 1000000).toFixed(1)}M
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Pledged
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-warning">
                {(totalPledged / 1000000).toFixed(1)}M
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="pledged">Pledged</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-4">
            {holdings.map((holding) => (
              <Card key={holding.isin}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{holding.name}</CardTitle>
                      <CardDescription className="text-xs">{holding.isin}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {holding.quantity.toLocaleString()} units
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-lg font-bold">
                        TSh {(holding.value / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Free</p>
                        <p className="font-medium text-success">{holding.free.toLocaleString()}</p>
                      </div>
                      {holding.pledged > 0 && (
                        <div>
                          <p className="text-muted-foreground">Pledged</p>
                          <p className="font-medium text-warning">{holding.pledged.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="free" className="space-y-3 mt-4">
            {holdings.filter(h => h.free > 0).map((holding) => (
              <Card key={holding.isin}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{holding.name}</CardTitle>
                      <CardDescription className="text-xs">{holding.isin}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {holding.free.toLocaleString()} free
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">
                    TSh {((holding.value * holding.free / holding.quantity) / 1000).toFixed(0)}K
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pledged" className="space-y-3 mt-4">
            {holdings.filter(h => h.pledged > 0).map((holding) => (
              <Card key={holding.isin}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{holding.name}</CardTitle>
                      <CardDescription className="text-xs">{holding.isin}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs bg-warning/10">
                      {holding.pledged.toLocaleString()} pledged
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">
                    TSh {((holding.value * holding.pledged / holding.quantity) / 1000).toFixed(0)}K
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav />
    </div>
  );
}
