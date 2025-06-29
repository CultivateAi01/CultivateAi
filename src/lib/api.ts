const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      // Get token from Clerk session
      const { getToken } = await import('@clerk/clerk-react');
      // Note: This won't work directly in a class method
      // We'll need to pass the token from components that have access to Clerk hooks
      return null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
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

  async getProfile(token?: string) {
    return this.request('/auth/profile', {}, token);
  }

  async updateProfile(profileData: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  }, token?: string) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }, token);
  }

  // Projects endpoints
  async getProjects(token?: string) {
    return this.request('/projects', {}, token);
  }

  async getProject(id: string, token?: string) {
    return this.request(`/projects/${id}`, {}, token);
  }

  async createProject(projectData: {
    title: string;
    description: string;
    startup_idea: string;
  }, token?: string) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    }, token);
  }

  async updateProject(id: string, projectData: {
    title?: string;
    description?: string;
    startup_idea?: string;
    status?: string;
  }, token?: string) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    }, token);
  }

  async deleteProject(id: string, token?: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    }, token);
  }

  // Agents endpoints
  async getAgents(token?: string) {
    return this.request('/agents', {}, token);
  }

  async runAgent(agentData: {
    project_id: string;
    agent_id: string;
    input_data: any;
  }, token?: string) {
    return this.request('/agents/run', {
      method: 'POST',
      body: JSON.stringify(agentData),
    }, token);
  }

  async getAgentRun(id: string, token?: string) {
    return this.request(`/agents/runs/${id}`, {}, token);
  }

  // Credits endpoints
  async getCredits(token?: string) {
    return this.request('/credits', {}, token);
  }

  async purchaseCredits(purchaseData: {
    amount: number;
    payment_intent_id?: string;
  }, token?: string) {
    return this.request('/credits/purchase', {
      method: 'POST',
      body: JSON.stringify(purchaseData),
    }, token);
  }

  async getCreditPackages(token?: string) {
    return this.request('/credits/packages', {}, token);
  }

  // Outputs endpoints
  async getProjectOutputs(projectId: string, token?: string) {
    return this.request(`/outputs/project/${projectId}`, {}, token);
  }

  async getOutput(id: string, token?: string) {
    return this.request(`/outputs/${id}`, {}, token);
  }

  async exportOutput(id: string, format: 'markdown' | 'txt' | 'json', token?: string) {
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