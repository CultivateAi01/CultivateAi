import { create } from 'zustand';
import { Project, ActionResult } from '../types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  results: ActionResult[];
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  setResults: (results: ActionResult[]) => void;
  addResult: (result: ActionResult) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  results: [],
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (currentProject) => set({ currentProject }),
  addProject: (project) => set((state) => ({ 
    projects: [...state.projects, project] 
  })),
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  setResults: (results) => set({ results }),
  addResult: (result) => set((state) => ({ 
    results: [...state.results, result] 
  })),
}));