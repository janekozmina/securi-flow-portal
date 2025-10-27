import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MobileNav from '@/components/layout/MobileNav';
import { Calendar, Upload, FileText, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
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
  relationshipTypes,
  occupations,
  type InvestorProfile,
} from '@/config/investorProfile';

export default function Account() {
  const [activeSection, setActiveSection] = useState('general');
  const [profile, setProfile] = useState<InvestorProfile>(mockInvestorProfile);
  const [isLegal, setIsLegal] = useState(false);
  const [isForeign, setIsForeign] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('kyc_documents')
      .select('*')
      .eq('user_id', user.id)
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error loading documents:', error);
      return;
    }

    setDocuments(data || []);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('You must be logged in to upload documents');
      return;
    }

    setUploading(true);

    try {
      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${documentType}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('kyc-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save to database
      const { error: dbError } = await supabase
        .from('kyc_documents')
        .insert({
          user_id: user.id,
          document_type: documentType,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
        });

      if (dbError) throw dbError;

      toast.success('Document uploaded successfully');
      await loadDocuments();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('kyc-documents')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Download error:', error);
      toast.error('Failed to download document');
    }
  };

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

                {/* KIN Section */}
                {activeSection === 'kin' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-destructive">Full Name *</Label>
                      <Input value={profile.kinFullName} className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Relationship *</Label>
                      <Select value={profile.kinRelationship}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {relationshipTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-destructive">Phone Number *</Label>
                      <Input value={profile.kinPhone} className="mt-1.5" />
                    </div>

                    <div>
                      <Label>Email Address</Label>
                      <Input value={profile.kinEmail} type="email" className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Address *</Label>
                      <Input value={profile.kinAddress} className="mt-1.5" />
                    </div>
                  </div>
                )}

                {/* DETAILS Section */}
                {activeSection === 'details' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Postal Address</Label>
                      <Input value={profile.postalAddress} className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Email Address *</Label>
                      <Input value={profile.email} type="email" className="mt-1.5" />
                    </div>

                    <div>
                      <Label className="text-destructive">Occupation *</Label>
                      <Select value={profile.occupation}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {occupations.map((occupation) => (
                            <SelectItem key={occupation} value={occupation}>
                              {occupation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Employer</Label>
                      <Input value={profile.employer} className="mt-1.5" />
                    </div>

                    <div>
                      <Label>Tax Number</Label>
                      <Input value={profile.taxNumber} className="mt-1.5" />
                    </div>
                  </div>
                )}

                {/* COPY OF DOCUMENT Section */}
                {activeSection === 'document' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>ID Document (Front)</Label>
                        <div className="mt-1.5 flex gap-2">
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'id_front')}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={uploading}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>ID Document (Back)</Label>
                        <div className="mt-1.5 flex gap-2">
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'id_back')}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={uploading}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {documents.filter(d => d.document_type.startsWith('id_')).length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Documents</Label>
                        <div className="space-y-2">
                          {documents
                            .filter(d => d.document_type.startsWith('id_'))
                            .map((doc) => (
                              <div
                                key={doc.id}
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">{doc.file_name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(doc.uploaded_at).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => downloadDocument(doc.file_path, doc.file_name)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* COPIES OF KYC DOCUMENTS Section */}
                {activeSection === 'kyc' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Proof of Residence</Label>
                        <div className="mt-1.5 flex gap-2">
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'proof_of_residence')}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={uploading}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Bank Statement</Label>
                        <div className="mt-1.5 flex gap-2">
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'bank_statement')}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={uploading}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Passport Photo</Label>
                        <div className="mt-1.5 flex gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'passport_photo')}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={uploading}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Other Documents</Label>
                        <div className="mt-1.5 flex gap-2">
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'other')}
                            disabled={uploading}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={uploading}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {documents.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded KYC Documents</Label>
                        <div className="space-y-2">
                          {documents.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-3 border rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">{doc.file_name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {doc.document_type.replace(/_/g, ' ').toUpperCase()} • {new Date(doc.uploaded_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => downloadDocument(doc.file_path, doc.file_name)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
