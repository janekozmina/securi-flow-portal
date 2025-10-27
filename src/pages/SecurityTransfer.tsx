import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import MobileNav from '@/components/layout/MobileNav';
import WorkflowProgress from '@/components/shared/WorkflowProgress';
import { ArrowLeft, ArrowRightLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getWorkflowById } from '@/config/workflows';
import { submitTransferRequest, TransferFormData } from './SecurityTransferSubmit';

export default function SecurityTransfer() {
  const workflow = getWorkflowById('securities-transfer');
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('transfer-details');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<TransferFormData>({
    transferType: '',
    transferDate: '',
    transferReason: '',
    referenceNumber: `TRF${Date.now()}`,
    sourceAccount: '',
    instrument: '',
    quantity: 0,
    recipientType: '',
    recipientName: '',
    recipientAccount: '',
    recipientId: '',
    recipientEmail: '',
    recipientPhone: '',
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    const success = await submitTransferRequest(formData);
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
            <ArrowRightLeft className="h-6 w-6" />
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
              Track your transfer request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkflowProgress steps={workflow.steps} />
          </CardContent>
        </Card>

        {/* Sidebar Navigation */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <Button
            variant={activeSection === 'transfer-details' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('transfer-details')}
          >
            Transfer Details
          </Button>
          <Button
            variant={activeSection === 'securities' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('securities')}
          >
            Securities
          </Button>
          <Button
            variant={activeSection === 'recipient' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection('recipient')}
          >
            Recipient
          </Button>
        </div>

        {/* Transfer Details Section */}
        {activeSection === 'transfer-details' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Transfer Details</CardTitle>
              <CardDescription className="text-xs">
                Enter the details of your securities transfer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transfer-type">Transfer Type</Label>
                <Select value={formData.transferType} onValueChange={(v) => setFormData({...formData, transferType: v})}>
                  <SelectTrigger id="transfer-type">
                    <SelectValue placeholder="Select transfer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gift">Gift</SelectItem>
                    <SelectItem value="sale">Sale</SelectItem>
                    <SelectItem value="inheritance">Inheritance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transfer-date">Transfer Date</Label>
                <Input
                  id="transfer-date"
                  type="date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Transfer</Label>
                <Textarea
                  id="reason"
                  placeholder="Describe the reason for this transfer"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Reference Number (Optional)</Label>
                <Input
                  id="reference"
                  placeholder="External reference number"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Securities Section */}
        {activeSection === 'securities' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Securities to Transfer</CardTitle>
              <CardDescription className="text-xs">
                Select securities from your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-account">From Account</Label>
                <Select>
                  <SelectTrigger id="from-account">
                    <SelectValue placeholder="Select source account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acc1">1004312ICSX00</SelectItem>
                    <SelectItem value="acc2">1004313ICSX00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                <Label htmlFor="available">Available Balance</Label>
                <Input
                  id="available"
                  value="10,000"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Transfer</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="face-value">Total Face Value (USD)</Label>
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

        {/* Recipient Section */}
        {activeSection === 'recipient' && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Recipient Information</CardTitle>
              <CardDescription className="text-xs">
                Details of the person receiving the securities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient-type">Recipient Type</Label>
                <Select>
                  <SelectTrigger id="recipient-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="institutional">Institutional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-name">Full Name / Company Name</Label>
                <Input
                  id="recipient-name"
                  placeholder="Enter recipient name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-account">Recipient CSD Account</Label>
                <Input
                  id="recipient-account"
                  placeholder="XXXXXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-id">GOV ID / TIN</Label>
                <Input
                  id="recipient-id"
                  placeholder="Identification number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-email">Email Address</Label>
                <Input
                  id="recipient-email"
                  type="email"
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-phone">Phone Number</Label>
                <Input
                  id="recipient-phone"
                  type="tel"
                  placeholder="+255 XXX XXX XXX"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Button className="w-full" size="lg" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Transfer Request'}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Your transfer request will be reviewed and processed by the CSD
        </p>
      </main>

      <MobileNav />
    </div>
  );
}
