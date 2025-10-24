export type WorkflowStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed';

export interface WorkflowStep {
  id: string;
  label: string;
  status: WorkflowStatus;
  actor: string;
  completedAt?: string;
}

export interface WorkflowScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  category: 'account' | 'securities' | 'documents' | 'transactions';
  actors: string[];
  steps: WorkflowStep[];
}

export const workflowScenarios: WorkflowScenario[] = [
  {
    id: 'kyc-update',
    title: 'KYC Update',
    description: 'Update and verify your Know Your Customer information',
    icon: 'UserCheck',
    route: '/kyc',
    category: 'account',
    actors: ['Investor', 'Broker', 'CSD Compliance'],
    steps: [
      { id: '1', label: 'Update Profile', status: 'completed', actor: 'Investor' },
      { id: '2', label: 'Upload Documents', status: 'completed', actor: 'Investor' },
      { id: '3', label: 'Broker Verification', status: 'in_review', actor: 'Broker' },
      { id: '4', label: 'CSD Validation', status: 'pending', actor: 'CSD Compliance' },
      { id: '5', label: 'Final Approval', status: 'pending', actor: 'CSD Compliance' },
    ],
  },
  {
    id: 'account-opening',
    title: 'Account Opening',
    description: 'Open new CSD account (Individual or Institutional)',
    icon: 'UserPlus',
    route: '/account-opening',
    category: 'account',
    actors: ['Applicant', 'Broker', 'CSD Officer'],
    steps: [
      { id: '1', label: 'Registration', status: 'pending', actor: 'Applicant' },
      { id: '2', label: 'Identity Verification', status: 'pending', actor: 'System/GOV' },
      { id: '3', label: 'Document Upload', status: 'pending', actor: 'Applicant' },
      { id: '4', label: 'Broker Validation', status: 'pending', actor: 'Broker' },
      { id: '5', label: 'Account Creation', status: 'pending', actor: 'CSD Officer' },
    ],
  },
  {
    id: 'securities-pledge',
    title: 'Securities Pledging',
    description: 'Pledge or unpledge your securities',
    icon: 'Lock',
    route: '/pledging',
    category: 'securities',
    actors: ['Investor/Broker', 'Lender', 'CSD'],
    steps: [
      { id: '1', label: 'Create Pledge Request', status: 'pending', actor: 'Investor' },
      { id: '2', label: 'Eligibility Check', status: 'pending', actor: 'System' },
      { id: '3', label: 'Lender Authorization', status: 'pending', actor: 'Lender' },
      { id: '4', label: 'CSD Approval', status: 'pending', actor: 'CSD' },
      { id: '5', label: 'Balance Update', status: 'pending', actor: 'System' },
    ],
  },
  {
    id: 'securities-transfer',
    title: 'Securities Transfer',
    description: 'Transfer securities between CSD accounts',
    icon: 'ArrowRightLeft',
    route: '/security-transfer',
    category: 'securities',
    actors: ['Sender', 'Receiver', 'Broker/CSD'],
    steps: [
      { id: '1', label: 'Initiate Transfer', status: 'pending', actor: 'Sender' },
      { id: '2', label: 'Validation', status: 'pending', actor: 'System' },
      { id: '3', label: 'Receiver Acceptance', status: 'pending', actor: 'Receiver' },
      { id: '4', label: 'Approval', status: 'pending', actor: 'Broker/CSD' },
      { id: '5', label: 'Settlement', status: 'pending', actor: 'System' },
    ],
  },
  {
    id: 'security-confirmation',
    title: 'Security Confirmation',
    description: 'Request holding certificates and confirmations',
    icon: 'FileText',
    route: '/certificates',
    category: 'documents',
    actors: ['Investor', 'System'],
    steps: [
      { id: '1', label: 'Select Certificate Type', status: 'pending', actor: 'Investor' },
      { id: '2', label: 'Verify Holdings', status: 'pending', actor: 'System' },
      { id: '3', label: 'Generate Document', status: 'pending', actor: 'System' },
      { id: '4', label: 'Archive & Download', status: 'pending', actor: 'System' },
    ],
  },
  {
    id: 'auction-participation',
    title: 'Auction Participation',
    description: 'Participate in securities auctions',
    icon: 'Gavel',
    route: '/auctions',
    category: 'securities',
    actors: ['Investor', 'Broker', 'Auction Engine'],
    steps: [
      { id: '1', label: 'Browse Auctions', status: 'pending', actor: 'Investor' },
      { id: '2', label: 'Place Bid', status: 'pending', actor: 'Investor' },
      { id: '3', label: 'Eligibility Check', status: 'pending', actor: 'System' },
      { id: '4', label: 'Auction Close', status: 'pending', actor: 'Auction Engine' },
      { id: '5', label: 'Settlement', status: 'pending', actor: 'System' },
    ],
  },
];

export const getWorkflowById = (id: string): WorkflowScenario | undefined => {
  return workflowScenarios.find(workflow => workflow.id === id);
};

export const getWorkflowsByCategory = (category: WorkflowScenario['category']): WorkflowScenario[] => {
  return workflowScenarios.filter(workflow => workflow.category === category);
};
