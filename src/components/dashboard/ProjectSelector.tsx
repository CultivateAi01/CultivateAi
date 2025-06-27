import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Plus, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
}

interface ProjectSelectorProps {
  selectedProject: Project | null;
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  onCreateProject: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  selectedProject,
  projects,
  onProjectSelect,
  onCreateProject,
  isOpen,
  onToggle
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] rounded-xl transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FolderOpen className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-white font-medium">
              {selectedProject ? selectedProject.title : 'Select Project'}
            </div>
            <div className="text-gray-400 text-sm">
              {selectedProject ? selectedProject.description.substring(0, 40) + '...' : 'Choose a project to run AI actions'}
            </div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-2 z-50 max-h-64 overflow-y-auto"
        >
          <Button
            variant="glass"
            size="sm"
            className="w-full justify-start mb-2"
            onClick={onCreateProject}
          >
            <Plus className="w-4 h-4" />
            Create New Project
          </Button>
          
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  onProjectSelect(project);
                  onToggle();
                }}
                className="w-full p-3 text-left hover:bg-white/[0.08] rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{project.title}</div>
                    <div className="text-gray-400 text-sm">{project.description.substring(0, 50)}...</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : project.status === 'completed'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.status}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};