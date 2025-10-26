import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Step4ReviewProps {
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}

export default function Step4Review({ onSubmit, onBack, submitting }: Step4ReviewProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const canSubmit = agreedToTerms && agreedToPrivacy;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Review & Submit</CardTitle>
          <CardDescription>Review your information and accept the terms to complete your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Account Type Selected</p>
                <p className="text-sm text-muted-foreground">Your account type has been configured</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Personal Information Provided</p>
                <p className="text-sm text-muted-foreground">Your identity details have been recorded</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Documents Uploaded</p>
                <p className="text-sm text-muted-foreground">All required verification documents submitted</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                I agree to the <span className="text-primary underline">Terms of Service</span> and understand the risks involved in securities trading
              </Label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={agreedToPrivacy}
                onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
              />
              <Label htmlFor="privacy" className="text-sm cursor-pointer leading-relaxed">
                I agree to the <span className="text-primary underline">Privacy Policy</span> and consent to the processing of my personal data for account verification
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1" size="lg" disabled={submitting}>
          Back
        </Button>
        <Button onClick={onSubmit} className="flex-1" size="lg" disabled={!canSubmit || submitting}>
          {submitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Your application will be reviewed by our compliance team within 2-3 business days
      </p>
    </div>
  );
}