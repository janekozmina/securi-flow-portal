import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Step1AccountTypeProps {
  accountType: 'individual' | 'institutional';
  setAccountType: (type: 'individual' | 'institutional') => void;
  onNext: () => void;
}

export default function Step1AccountType({ accountType, setAccountType, onNext }: Step1AccountTypeProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Account Type</CardTitle>
          <CardDescription>Choose the type of account you want to open</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={accountType} onValueChange={(value: string) => setAccountType(value as 'individual' | 'institutional')}>
            <div className="flex items-center space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-accent/5 transition-colors">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual" className="flex-1 cursor-pointer">
                <p className="font-medium">Individual Account</p>
                <p className="text-sm text-muted-foreground">For personal investment and trading</p>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border cursor-pointer hover:bg-accent/5 transition-colors">
              <RadioGroupItem value="institutional" id="institutional" />
              <Label htmlFor="institutional" className="flex-1 cursor-pointer">
                <p className="font-medium">Institutional Account</p>
                <p className="text-sm text-muted-foreground">For organizations and companies</p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full" size="lg">
        Continue
      </Button>
    </div>
  );
}