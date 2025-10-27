export interface InvestorProfile {
  // General
  investorCode: string;
  institutionType: 'Individual' | 'Legal' | 'Foreign';
  
  // Physical Investor Details
  underage: boolean;
  citizenship: string;
  countryOfResidence: string;
  city: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  idDocumentType: string;
  idDocumentSeriesAndNumber: string;
  
  // KIN Details
  kinFullName: string;
  kinRelationship: string;
  kinPhone: string;
  kinEmail: string;
  kinAddress: string;
  
  // Additional Details
  postalAddress: string;
  email: string;
  occupation: string;
  employer: string;
  taxNumber: string;
  
  // Bank Details
  bicOfInvestorsBank: string;
  nameOfInvestorsBank: string;
  branchCode: string;
  branchName: string;
  beneficiaryAccount: string;
  beneficiaryName: string;
  dividendPaymentOption: string;
}

export const profileSections = [
  { id: 'general', label: 'GENERAL' },
  { id: 'physical', label: 'PHYSICAL INVESTOR DETAILS' },
  { id: 'kin', label: 'KIN' },
  { id: 'details', label: 'DETAILS' },
  { id: 'bank', label: 'BANK DETAILS' },
  { id: 'document', label: 'COPY OF DOCUMENT' },
  { id: 'kyc', label: 'COPIES OF KYC DOCUMENTS' },
] as const;

export const institutionTypes = ['Individual', 'Legal', 'Foreign'];

export const countries = [
  'Botswana',
  'South Africa',
  'Zimbabwe',
  'Namibia',
  'Zambia',
];

export const cities = [
  'ARTESIA',
  'Gaborone',
  'Francistown',
  'Maun',
];

export const genders = ['Male', 'Female', 'Other'];

export const idDocumentTypes = [
  'Age Estimate Certificate',
  'National ID',
  'Passport',
  'Driver License',
];

export const banks = [
  { bic: 'BARCBWGX', name: 'ABSA BANK LIMITED' },
  { bic: 'FNBBWGX', name: 'First National Bank Botswana' },
  { bic: 'SBICBWGX', name: 'Standard Bank Botswana' },
];

export const dividendPaymentOptions = [
  'To bank details',
  'Re-invest',
  'Cheque',
];

export const relationshipTypes = [
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Other Family',
  'Friend',
];

export const occupations = [
  'Employed',
  'Self-Employed',
  'Business Owner',
  'Retired',
  'Student',
  'Unemployed',
];

export const mockInvestorProfile: InvestorProfile = {
  investorCode: '1004312',
  institutionType: 'Individual',
  underage: false,
  citizenship: 'Botswana',
  countryOfResidence: 'Botswana',
  city: 'ARTESIA',
  firstName: 'ARTESIA',
  middleName: 'Nik',
  lastName: 'GER',
  gender: 'Male',
  dateOfBirth: '01.01.1990',
  idDocumentType: 'Age Estimate Certificate',
  idDocumentSeriesAndNumber: '122234',
  kinFullName: 'John Doe',
  kinRelationship: 'Spouse',
  kinPhone: '+267 7234 5678',
  kinEmail: 'john.doe@example.com',
  kinAddress: 'Plot 456, Gaborone, Botswana',
  postalAddress: 'P.O. Box 123, Gaborone',
  email: 'artesia.ger@example.com',
  occupation: 'Business Owner',
  employer: 'Self Employed',
  taxNumber: 'TAX123456789',
  bicOfInvestorsBank: 'BARCBWGX - ABSA BANK LIMITED',
  nameOfInvestorsBank: 'ABSA BANK CAPITAL LIMITED',
  branchCode: '',
  branchName: '',
  beneficiaryAccount: '56789876543',
  beneficiaryName: '',
  dividendPaymentOption: 'To bank details',
};
