import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MobileNav from '@/components/layout/MobileNav';
import WorkflowCard from '@/components/shared/WorkflowCard';
import { User, Settings, LogOut, FileText, HelpCircle } from 'lucide-react';
import { workflowScenarios } from '@/config/workflows';

export default function Account() {
  const accountWorkflows = workflowScenarios.filter(w => w.category === 'account');

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">Account</h1>
          <p className="text-sm opacity-90">Manage your profile and settings</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>John Investor</CardTitle>
                <CardDescription>investor@example.com</CardDescription>
                <p className="text-xs text-muted-foreground mt-1">CSD Account: INV-2024-001234</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Account Management</h2>
          <div className="space-y-3">
            {accountWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <FileText className="mr-2 h-5 w-5" />
            Documents & Reports
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <HelpCircle className="mr-2 h-5 w-5" />
            Help & Support
          </Button>
          
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" size="lg">
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
