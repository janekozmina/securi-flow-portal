import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MobileNav from '@/components/layout/MobileNav';
import WorkflowProgress from '@/components/shared/WorkflowProgress';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWorkflowById } from '@/config/workflows';

export default function AccountOpening() {
  const workflow = getWorkflowById('account-opening');

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
            <CardTitle className="text-base">Application Progress</CardTitle>
            <CardDescription className="text-xs">
              Track your account opening application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WorkflowProgress steps={workflow.steps} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Account Type</CardTitle>
            <CardDescription className="text-xs">
              Select the type of account to open
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="individual">
              <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent/5">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual" className="flex-1 cursor-pointer">
                  <p className="font-medium">Individual Account</p>
                  <p className="text-xs text-muted-foreground">For personal investment</p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border cursor-pointer hover:bg-accent/5">
                <RadioGroupItem value="institutional" id="institutional" />
                <Label htmlFor="institutional" className="flex-1 cursor-pointer">
                  <p className="font-medium">Institutional Account</p>
                  <p className="text-xs text-muted-foreground">For organizations and companies</p>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription className="text-xs">
              Enter your details for verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" placeholder="Enter your full legal name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gov-id">GOV ID Number</Label>
              <Input id="gov-id" placeholder="XXXX-XXXXXXXX-XXXXX-XX" />
              <p className="text-xs text-muted-foreground">
                Used for automatic identity verification
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" placeholder="Select" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone-new">Phone Number</Label>
              <Input id="phone-new" placeholder="+255 XXX XXX XXX" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-new">Email Address</Label>
              <Input id="email-new" type="email" placeholder="your@email.com" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Required Documents</CardTitle>
            <CardDescription className="text-xs">
              Upload documents for verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Upload className="mr-2 h-5 w-5" />
              National ID (Front & Back)
            </Button>
            
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Upload className="mr-2 h-5 w-5" />
              Proof of Residence
            </Button>
            
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Upload className="mr-2 h-5 w-5" />
              Passport Photo
            </Button>
          </CardContent>
        </Card>

        <Button className="w-full" size="lg">
          Submit Application
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Your application will be reviewed by our team within 2-3 business days
        </p>
      </main>

      <MobileNav />
    </div>
  );
}
