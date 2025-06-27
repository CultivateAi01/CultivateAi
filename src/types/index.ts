export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  idea: string;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface AIAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  category: 'ALL-IN-ONE' | 'IDEA_VALIDATION' | 'BUSINESS_STRATEGY' | 'PRODUCT_STRATEGY' | 'BRAND_MARKETING' | 'GROWTH_OPERATIONS';
  color: string;
}

export interface ActionResult {
  id: string;
  project_id: string;
  action_id: string;
  input: string;
  output: string;
  status: 'processing' | 'completed' | 'failed';
  credits_used: number;
  created_at: string;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'purchase' | 'usage' | 'refund';
  description: string;
  created_at: string;
}