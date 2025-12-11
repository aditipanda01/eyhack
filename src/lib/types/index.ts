// Core types for the multi-agent system

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
  dob: string;
  address: string;
  employmentType: 'salaried' | 'self-employed' | 'business';
  monthlyIncome: number;
  companyName?: string;
  yearsInJob?: number;
}

export interface KYCData {
  customerId: string;
  panVerified: boolean;
  aadhaarVerified: boolean;
  addressVerified: boolean;
  videoKYCCompleted: boolean;
  documentsUploaded: string[];
  verificationDate?: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface CreditData {
  customerId: string;
  creditScore: number;
  bureau: 'CIBIL' | 'Experian' | 'Equifax';
  existingLoans: number;
  totalOutstanding: number;
  latePayments: number;
  creditUtilization: number;
  inquiriesLast6Months: number;
  oldestAccount: string;
}

export interface LoanApplication {
  applicationId: string;
  customerId: string;
  loanType: 'personal' | 'home' | 'auto' | 'business';
  loanAmount: number;
  tenure: number;
  purpose: string;
  status: 'initiated' | 'verified' | 'underwriting' | 'sanctioned' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface AgentTool {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required: string[];
  };
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  agentName: string;
  toolName: string;
}

export interface OrchestratorContext {
  conversationHistory: any[];
  currentStage: 'sales' | 'verification' | 'underwriting' | 'sanction' | 'complete';
  applicationId?: string;
  customerId?: string;
  metadata: Record<string, any>;
}