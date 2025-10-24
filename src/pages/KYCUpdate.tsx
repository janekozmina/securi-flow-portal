import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MobileNav from '@/components/layout/MobileNav';
import WorkflowProgress from '@/components/shared/WorkflowProgress';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWorkflowById } from '@/config/workflows';

export default function KYCUpdate() {
  const workflow = getWorkflowById('kyc-update');

  if (!workflow) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 opacity-90 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">{workflow.title}</h1>
          <p className="text-sm opacity-90">{workflow.description}</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Workflow Progress</CardTitle>
            <CardDescription className="text-xs">
              Track your KYC update request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkflowProgress steps={workflow.steps} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Update Information</CardTitle>
            <CardDescription className="text-xs">
              Update your profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+255 XXX XXX XXX" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Residential Address</Label>
              <Input id="address" placeholder="Enter your address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Bank Account Number</Label>
              <Input id="bank" placeholder="XXXXXXXXXXXXXXXX" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Supporting Documents</CardTitle>
            <CardDescription className="text-xs">
              Upload required verification documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Upload className="mr-2 h-5 w-5" />
              National ID / Passport
            </Button>
            
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Upload className="mr-2 h-5 w-5" />
              Proof of Residence
            </Button>
            
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Upload className="mr-2 h-5 w-5" />
              Bank Confirmation Letter
            </Button>
          </CardContent>
        </Card>

        <Button className="w-full" size="lg">
          Submit KYC Update
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Your request will be reviewed by your broker and CSD compliance team
        </p>
      </main>

      <MobileNav />
    </div>
  );
}
