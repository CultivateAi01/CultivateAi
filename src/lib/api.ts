const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthToken(): Promise<string | null> {
    // Try to get token from Supabase session
    const { supabase } = await import('./supabase');
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get auth token
    const token = await this.getAuthToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Projects endpoints
  async getProjects() {
    return this.request('/projects');
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(projectData: {
    title: string;
    description: string;
    startup_idea: string;
  }) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id: string, projectData: {
    title?: string;
    description?: string;
    startup_idea?: string;
    status?: string;
  }) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Agents endpoints
  async getAgents() {
    return this.request('/agents');
  }

  async runAgent(agentData: {
    project_id: string;
    agent_id: string;
    input_data: any;
  }) {
    return this.request('/agents/run', {
      method: 'POST',
      body: JSON.stringify(agentData),
    });
  }

  async getAgentRun(id: string) {
    return this.request(`/agents/runs/${id}`);
  }

  // Credits endpoints
  async getCredits() {
    return this.request('/credits');
  }

  async purchaseCredits(purchaseData: {
    amount: number;
    payment_intent_id?: string;
  }) {
    return this.request('/credits/purchase', {
      method: 'POST',
      body: JSON.stringify(purchaseData),
    });
  }

  async getCreditPackages() {
    return this.request('/credits/packages');
  }

  // Outputs endpoints
  async getProjectOutputs(projectId: string) {
    return this.request(`/outputs/project/${projectId}`);
  }

  async getOutput(id: string) {
    return this.request(`/outputs/${id}`);
  }

  async exportOutput(id: string, format: 'markdown' | 'txt' | 'json') {
    const token = await this.getAuthToken();
    const response = await fetch(`${this.baseURL}/outputs/${id}/export/${format}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);