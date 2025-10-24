import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MobileNav from '@/components/layout/MobileNav';
import { Calendar } from 'lucide-react';
import {
  mockInvestorProfile,
  profileSections,
  institutionTypes,
  countries,
  cities,
  genders,
  idDocumentTypes,
  banks,
  dividendPaymentOptions,
  type InvestorProfile,
} from '@/config/investorProfile';

export default function Account() {
  const [activeSection, setActiveSection] = useState('general');
  const [profile, setProfile] = useState<InvestorProfile>(mockInvestorProfile);
  const [isLegal, setIsLegal] = useState(false);
  const [isForeign, setIsForeign] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Investor profile</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar Navigation */}
          <nav className="space-y-1">
            {profileSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  activeSection === section.id
                    ? 'text-primary border-l-4 border-primary bg-primary/5 font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <Card>
            <CardHeader>
              <div className="space-y-6">
                {/* GENERAL Section */}
                {activeSection === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Investor code</Label>
                      <Input value={profile.investorCode} readOnly className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Institution type *</Label>
                      <Select value={profile.institutionType}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {institutionTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-8">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="legal" checked={isLegal} onCheckedChange={(checked) => setIsLegal(checked === true)} />
                        <Label htmlFor="legal">Legal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="foreign" checked={isForeign} onCheckedChange={(checked) => setIsForeign(checked === true)} />
                        <Label htmlFor="foreign">Foreign</Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* PHYSICAL INVESTOR DETAILS Section */}
                {activeSection === 'physical' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="underage" checked={profile.underage} />
                      <Label htmlFor="underage">Underage</Label>
                    </div>

                    <div>
                      <Label className="text-destructive">Citizenship *</Label>
                      <Select value={profile.citizenship}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-destructive">Country of residence *</Label>
                      <Select value={profile.countryOfResidence}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-destructive">City *</Label>
                      <Select value={profile.city}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-destructive">First name *</Label>
                      <Input value={profile.firstName} className="mt-1.5" />
                    </div>

                    <div>
                      <Label>Middle name</Label>
                      <Input value={profile.middleName} className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Last name *</Label>
                      <Input value={profile.lastName} className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Gender *</Label>
                      <Select value={profile.gender}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-destructive">Date of birth *</Label>
                      <div className="relative mt-1.5">
                        <Input value={profile.dateOfBirth} />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-destructive">ID document type *</Label>
                      <Select value={profile.idDocumentType}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {idDocumentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-destructive">ID document series and number *</Label>
                      <Input value={profile.idDocumentSeriesAndNumber} className="mt-1.5" />
                    </div>
                  </div>
                )}

                {/* BANK DETAILS Section */}
                {activeSection === 'bank' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-destructive">BIC of the investor's bank *</Label>
                      <Select value={profile.bicOfInvestorsBank}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank.bic} value={`${bank.bic} - ${bank.name}`}>
                              {bank.bic} - {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-destructive">Name of the investor's bank *</Label>
                      <Input value={profile.nameOfInvestorsBank} className="mt-1.5" />
                    </div>

                    <div>
                      <Label>Branch code</Label>
                      <Input value={profile.branchCode} className="mt-1.5" />
                    </div>

                    <div>
                      <Label>Branch name</Label>
                      <Input value={profile.branchName} className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Beneficiary account *</Label>
                      <Input value={profile.beneficiaryAccount} className="mt-1.5" />
                    </div>

                    <div>
                      <Label>Beneficiary name</Label>
                      <Input value={profile.beneficiaryName} className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Dividend payment option *</Label>
                      <Select value={profile.dividendPaymentOption}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {dividendPaymentOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Placeholder sections */}
                {activeSection === 'kin' && (
                  <div className="text-center py-8 text-muted-foreground">
                    KIN section - Coming soon
                  </div>
                )}

                {activeSection === 'details' && (
                  <div className="text-center py-8 text-muted-foreground">
                    Details section - Coming soon
                  </div>
                )}

                {activeSection === 'document' && (
                  <div className="text-center py-8 text-muted-foreground">
                    Copy of document - Coming soon
                  </div>
                )}

                {activeSection === 'kyc' && (
                  <div className="text-center py-8 text-muted-foreground">
                    Copies of KYC documents - Coming soon
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex justify-end pt-0">
              <Button size="lg" className="min-w-[120px]">
                EDIT
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
