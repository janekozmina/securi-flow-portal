import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';

interface Step2_5SMSOtpProps {
  phoneNumber: string;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2_5SMSOtp({ phoneNumber, onNext, onBack }: Step2_5SMSOtpProps) {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Emulate verification with hardcoded OTP
    setTimeout(() => {
      if (otp === '0000') {
        toast.success('Phone number verified successfully!');
        onNext();
      } else {
        toast.error('Invalid OTP. Please try again. (Use 0000)');
      }
      setIsVerifying(false);
    }, 500);
  };

  const handleResend = () => {
    toast.success('OTP resent to ' + phoneNumber);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Verify Phone Number</CardTitle>
        <CardDescription>
          Enter the OTP sent to {phoneNumber}
          <br />
          <span className="text-xs text-muted-foreground mt-1 block">
            (Demo: Use 0000 as verification code)
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          
          <Button
            variant="link"
            size="sm"
            onClick={handleResend}
            className="text-primary"
          >
            Resend OTP
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 4 || isVerifying}
            className="flex-1"
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
