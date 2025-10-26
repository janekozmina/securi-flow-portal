import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalInfo {
  fullName: string;
  govIdNumber: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
}

interface Step2PersonalInfoProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: (info: PersonalInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2PersonalInfo({ personalInfo, setPersonalInfo, onNext, onBack }: Step2PersonalInfoProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const isValid = personalInfo.fullName && personalInfo.govIdNumber && personalInfo.dateOfBirth && 
                  personalInfo.gender && personalInfo.phone;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
          <CardDescription>Enter your details for identity verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Legal Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name as per ID"
              value={personalInfo.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="govIdNumber">Government ID Number *</Label>
            <Input
              id="govIdNumber"
              placeholder="XXXX-XXXXXXXX-XXXXX-XX"
              value={personalInfo.govIdNumber}
              onChange={(e) => handleChange('govIdNumber', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              National ID, Passport, or Driver's License number
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={personalInfo.gender} onValueChange={(value) => handleChange('gender', value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 000-0000"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Residential Address</Label>
            <Input
              id="address"
              placeholder="Enter your full address"
              value={personalInfo.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1" size="lg">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1" size="lg" disabled={!isValid}>
          Continue
        </Button>
      </div>
    </div>
  );
}