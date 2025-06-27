// This file is now deprecated - agents are fetched from the database
// Keeping for reference and potential fallback scenarios

import { AIAction } from '../types';

export const aiActionCategories = {
  'research': {
    name: 'Idea Validation',
    description: 'Validate and refine your concept',
    color: 'from-green-500 to-emerald-500'
  },
  'validation': {
    name: 'Business Strategy',
    description: 'Strategic planning and analysis',
    color: 'from-blue-500 to-cyan-500'
  },
  'development': {
    name: 'Product Strategy',
    description: 'Product development and roadmap',
    color: 'from-orange-500 to-amber-500'
  },
  'marketing': {
    name: 'Brand & Marketing',
    description: 'Marketing and brand strategy',
    color: 'from-pink-500 to-rose-500'
  },
  'legal': {
    name: 'Growth & Operations',
    description: 'Scaling and operational excellence',
    color: 'from-indigo-500 to-purple-500'
  }
};

// Fallback static data - not used when database agents are available
export const aiActions: AIAction[] = [];

// Helper function to get actions by category - now uses database agents
export const getActionsByCategory = (category: string, agents: any[] = []) => {
  return agents.filter(agent => agent.category === category && agent.is_active);
};

// Helper function to get all categories with their actions - now uses database agents
export const getGroupedActions = (agents: any[] = []) => {
  const grouped: Record<string, any[]> = {};
  
  Object.keys(aiActionCategories).forEach(categoryKey => {
    grouped[categoryKey] = getActionsByCategory(categoryKey, agents);
  });
  
  return grouped;
};