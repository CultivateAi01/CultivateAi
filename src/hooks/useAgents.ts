import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  cost: number;
  icon: string;
  is_active: boolean;
  slug?: string;
  agent_url?: string;
  output_example?: string;
  prompt_template?: string;
  created_at?: string;
  updated_at?: string;
}

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAgents();
      setAgents(response.agents || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  };

  const runAgent = async (agentData: {
    project_id: string;
    agent_id: string;
    input_data: any;
  }) => {
    try {
      const response = await apiClient.runAgent(agentData);
      return response.agentRun;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return {
    agents,
    loading,
    error,
    fetchAgents,
    runAgent,
  };
};