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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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

      {/* Credits Display */}
      <div className="glass-card rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Available Credits</h2>
            <p className="text-gray-400 text-sm">Use credits to run AI actions on your startup projects</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-400">{user?.credits || 0}</div>
            <div className="text-sm text-gray-400">credits remaining</div>
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <ActionGrid onActionSelect={handleActionSelect} agents={agents} />

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