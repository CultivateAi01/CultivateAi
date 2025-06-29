import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ActionGrid } from '../components/actions/ActionGrid';
import { ActionModal } from '../components/actions/ActionModal';
import { ProjectSelector } from '../components/dashboard/ProjectSelector';
import { useAuthStore } from '../store/authStore';
import { useLocation } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useAgents } from '../hooks/useAgents';

export const Actions: React.FC = () => {
  const location = useLocation();
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = useState(false);
  
  const { user } = useAuthStore();
  const { projects, loading: projectsLoading } = useProjects();
  const { agents, runAgent } = useAgents();

  // Handle pre-selected project from navigation state
  useEffect(() => {
    const state = location.state as { selectedProjectId?: string };
    if (state?.selectedProjectId && projects.length > 0) {
      const project = projects.find(p => p.id === state.selectedProjectId);
      if (project) {
        setSelectedProject(project);
      }
    } else if (projects.length > 0 && !selectedProject) {
      // Auto-select first project if none selected
      setSelectedProject(projects[0]);
    }
  }, [location.state, projects, selectedProject]);

  const handleActionSelect = (actionId: string) => {
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }
    setSelectedActionId(actionId);
    setIsModalOpen(true);
  };

  const handleActionSubmit = async (actionId: string, projectId: string, input: string) => {
    try {
      await runAgent({
        project_id: projectId,
        agent_id: actionId,
        input_data: {
          description: input,
          project_context: selectedProject?.startup_idea
        }
      });
      
      // TODO: Show success notification
      console.log('Action submitted successfully');
    } catch (error) {
      console.error('Error submitting action:', error);
      // TODO: Show error notification
    }
  };

  const handleCreateProject = () => {
    // TODO: Implement create project modal or navigate to projects page
    console.log('Create new project');
  };

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Smooth color transitions */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-green-500/5 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-orange-500/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">AI Actions</h1>
        <p className="text-gray-400">Choose an AI-powered action to analyze and enhance your startup project.</p>
      </motion.div>

      {/* Project Selection */}
      {projects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10"
        >
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-300 mb-2">Select Project:</h2>
          </div>
          <ProjectSelector
            selectedProject={selectedProject}
            projects={projects}
            onProjectSelect={setSelectedProject}
            onCreateProject={handleCreateProject}
            isOpen={isProjectSelectorOpen}
            onToggle={() => setIsProjectSelectorOpen(!isProjectSelectorOpen)}
          />
        </motion.div>
      )}


      {/* Action Grid */}
      <div className="relative z-10">
        <ActionGrid onActionSelect={handleActionSelect} agents={agents} />
      </div>

      {/* Action Modal */}
      <ActionModal
        actionId={selectedActionId}
        projectId={selectedProject?.id || null}
        projectTitle={selectedProject?.title}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedActionId(null);
        }}
        onSubmit={handleActionSubmit}
        agents={agents}
      />
    </div>
  );
};