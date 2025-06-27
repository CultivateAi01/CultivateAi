import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

export interface Project {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  startup_idea: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
  actionsRun?: number;
  lastActivity?: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getProjects();
      setProjects(response.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: {
    title: string;
    description: string;
    startup_idea: string;
  }) => {
    try {
      const response = await apiClient.createProject(projectData);
      await fetchProjects(); // Refresh the list
      return response.project;
    } catch (err) {
      throw err;
    }
  };

  const updateProject = async (id: string, projectData: {
    title?: string;
    description?: string;
    startup_idea?: string;
    status?: string;
  }) => {
    try {
      const response = await apiClient.updateProject(id, projectData);
      await fetchProjects(); // Refresh the list
      return response.project;
    } catch (err) {
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await apiClient.deleteProject(id);
      await fetchProjects(); // Refresh the list
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};