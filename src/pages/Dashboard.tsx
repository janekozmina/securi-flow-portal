import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import MobileNav from '@/components/layout/MobileNav';
import WorkflowCard from '@/components/shared/WorkflowCard';
import { workflowScenarios } from '@/config/workflows';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { formatCurrency } from '@/config/currency';
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const navigate = useNavigate();
  const portfolioValue = 2456789.50;
  const dayChange = 12456.30;
  const dayChangePercent = 0.51;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold">Investor Portal</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-primary-foreground hover:bg-primary-foreground/10">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className="text-sm opacity-90">Welcome back, John Investor</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-6">
        <Card className="mb-6 shadow-lg">
          <CardHeader className="pb-3">
            <CardDescription className="text-xs">Total Portfolio Value</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {formatCurrency(portfolioValue)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              {dayChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              )}
              <span className={dayChange >= 0 ? 'text-success' : 'text-destructive'}>
                {formatCurrency(Math.abs(dayChange))} ({dayChangePercent}%)
              </span>
              <span className="text-muted-foreground">today</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-accent/10">
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
                <CardDescription className="text-xs">Free Balance</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">1.2M</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-warning/10">
                  <Activity className="h-4 w-4 text-warning" />
                </div>
                <CardDescription className="text-xs">Pledged</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">245K</p>
              <p className="text-xs text-muted-foreground">Locked</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="space-y-3">
            {workflowScenarios.slice(0, 4).map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full" asChild>
          <a href="#all-services">View All Services</a>
        </Button>
      </main>

      <MobileNav />
    </div>
  );
}
