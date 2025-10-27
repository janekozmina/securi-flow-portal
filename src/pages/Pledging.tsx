import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MobileNav from '@/components/layout/MobileNav';
import WorkflowProgress from '@/components/shared/WorkflowProgress';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getWorkflowById } from '@/config/workflows';
import { submitPledgeRequest, PledgeFormData } from './PledgingSubmit';

export default function Pledging() {
  const workflow = getWorkflowById('securities-pledge');
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('details');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<PledgeFormData>({
    pledgeType: '',
    pledgeDate: '',
    pledgeReason: '',
    referenceNumber: `PLG${Date.now()}`,
    sourceAccount: '',
    instrument: '',
    quantity: 0,
    lenderName: '',
    lenderAccount: '',
    lenderContact: '',
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    const success = await submitPledgeRequest(formData);
    setSubmitting(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  if (!workflow) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 opacity-90 hover:opacity-100">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <Shield className="h-6 w-6" />
            <h1 className="text-2xl font-bold">{workflow.title}</h1>
          </div>
          <p className="text-sm opacity-90">{workflow.description}</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Workflow Progress</CardTitle>
            <CardDescription className="text-xs">
              Track your pledging request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkflowProgress steps={workflow.steps} />
          </CardContent>
        </Card>

        {/* Sidebar Navigation */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <Button
            variant={activeSection === 'details' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('details')}
          >
            Pledge Details
          </Button>
          <Button
            variant={activeSection === 'securities' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('securities')}
          >
            Securities
          </Button>
          <Button
            variant={activeSection === 'lender' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('lender')}
          >
            Lender Information
          </Button>
        </div>

        {/* Pledge Details Section */}
        {activeSection === 'details' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Pledge Details</CardTitle>
              <CardDescription className="text-xs">
                Enter the details of your pledge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pledge-type">Pledge Type</Label>
                <Select value={formData.pledgeType} onValueChange={(v) => setFormData({...formData, pledgeType: v})}>
                  <SelectTrigger id="pledge-type">
                    <SelectValue placeholder="Select pledge type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loan">Loan Collateral</SelectItem>
                    <SelectItem value="guarantee">Guarantee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pledge-amount">Pledge Amount (USD)</Label>
                <Input
                  id="pledge-amount"
                  type="number"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pledge-date">Pledge Date</Label>
                <Input
                  id="pledge-date"
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maturity-date">Maturity Date</Label>
                <Input
                  id="maturity-date"
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  placeholder="Describe the purpose of the pledge"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Securities Section */}
        {activeSection === 'securities' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Securities to Pledge</CardTitle>
              <CardDescription className="text-xs">
                Select securities from your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instrument">Instrument</Label>
                <Select>
                  <SelectTrigger id="instrument">
                    <SelectValue placeholder="Select instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bond1">Government Bond - TB001</SelectItem>
                    <SelectItem value="bond2">Corporate Bond - CB205</SelectItem>
                    <SelectItem value="stock1">Equity - CRDB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="face-value">Face Value (USD)</Label>
                <Input
                  id="face-value"
                  type="number"
                  placeholder="0.00"
                  disabled
                />
              </div>

              <Button variant="outline" className="w-full">
                + Add Another Security
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Lender Information Section */}
        {activeSection === 'lender' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Lender Information</CardTitle>
              <CardDescription className="text-xs">
                Details of the pledgee/lender
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lender-name">Lender Name</Label>
                <Input
                  id="lender-name"
                  placeholder="Enter lender name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lender-type">Lender Type</Label>
                <Select>
                  <SelectTrigger id="lender-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="financial">Financial Institution</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lender-account">Lender Account Number</Label>
                <Input
                  id="lender-account"
                  placeholder="Enter account number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input
                  id="contact-person"
                  placeholder="Name of contact person"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="contact@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+255 XXX XXX XXX"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Button className="w-full" size="lg" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Pledge Request'}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Your pledge request will be reviewed and processed by the CSD
        </p>
      </main>

      <MobileNav />
    </div>
  );
}
