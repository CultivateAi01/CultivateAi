import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Clock, FolderOpen, Zap, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MultipleAIActionSelector } from '../components/dashboard/MultipleAIActionSelector';
import { FileUploadModal } from '../components/dashboard/FileUploadModal';
import { useProjectStore } from '../store/projectStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useAgents } from '../hooks/useAgents';
import { apiClient } from '../lib/api';

export const Dashboard: React.FC = () => {
  const [appIdea, setAppIdea] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { user } = useAuthStore();
  const { projects, loading: projectsLoading, createProject } = useProjects();
  const { agents, loading: agentsLoading, runAgent } = useAgents();
  const navigate = useNavigate();

  // Check for pending startup idea from landing page
  useEffect(() => {
    const pendingIdea = localStorage.getItem('pendingStartupIdea');
    if (pendingIdea) {
      setAppIdea(pendingIdea);
      localStorage.removeItem('pendingStartupIdea'); // Clear it after using
    }
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height based on scrollHeight with min and max constraints
      const newHeight = Math.max(120, Math.min(400, textarea.scrollHeight));
      textarea.style.height = `${newHeight}px`;
      
      // Enable scrolling if content exceeds max height
      if (textarea.scrollHeight > 400) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [appIdea]);

  // Get recent projects (limit to 3)
  const recentProjects = projects.slice(0, 3);

  const handleActionToggle = (actionId: string) => {
    const agent = agents.find(a => a.id === actionId);
    if (!agent || !agent.is_active) return; // Only allow toggling active agents
    
    setSelectedActions(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const handleSelectAllActions = () => {
    const activeAgents = agents.filter(agent => agent.is_active);
    const allActiveSelected = activeAgents.every(agent => selectedActions.includes(agent.id));
    
    if (allActiveSelected) {
      setSelectedActions([]);
    } else {
      setSelectedActions(activeAgents.map(agent => agent.id));
    }
  };

  const handleClearAllActions = () => {
    setSelectedActions([]);
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    console.log('Files uploaded:', files);
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRunActions = async () => {
    if (selectedActions.length === 0 || !appIdea.trim()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // First create a project for this analysis
      const project = await createProject({
        title: `Analysis: ${appIdea.substring(0, 50)}...`,
        description: `AI analysis of startup idea: ${appIdea}`,
        startup_idea: appIdea
      });

      // Run each selected action (only active ones)
      for (const agentId of selectedActions) {
        const agent = agents.find(a => a.id === agentId);
        if (!agent || !agent.is_active) continue; // Skip inactive agents
        
        try {
          await runAgent({
            project_id: project.id,
            agent_id: agentId,
            input_data: {
              description: appIdea,
              files: uploadedFiles.map(f => f.name) // In real app, upload files first
            }
          });
        } catch (error) {
          console.error(`Error running agent ${agentId}:`, error);
        }
      }
      
      setAppIdea('');
      setSelectedActions([]);
      setUploadedFiles([]);
      
      // Navigate to the project detail page
      navigate(`/startup/${project.id}`);
      
    } catch (error) {
      console.error('Error running actions:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenStartup = (startupId: string) => {
    navigate(`/startup/${startupId}`);
  };

  const canRunActions = selectedActions.length > 0 && appIdea.trim() && !isProcessing;
  
  // Calculate total cost of selected actions (only active ones)
  const totalCost = selectedActions.reduce((sum, agentId) => {
    const agent = agents.find(a => a.id === agentId);
    return sum + (agent?.is_active ? (agent?.cost || 0) : 0);
  }, 0);

  if (projectsLoading || agentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-16 relative">
      {/* Smooth color transitions throughout dashboard */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="absolute top-1/4 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-green-500/3 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-orange-500/5" />
      </div>

      {/* Header Section - Reduced text sizes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        {/* Reduced from 6xl to 4xl */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          What would you build today?
        </h1>
        {/* Reduced from xl to lg */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Select AI actions and describe your idea to get comprehensive analysis.
        </p>
      </motion.div>

      {/* Main Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
            
            <div className="relative bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-2xl p-4">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={appIdea}
                  onChange={(e) => setAppIdea(e.target.value)}
                  placeholder="Describe your startup idea in detail... What problem does it solve? Who is your target audience? What makes it unique? The more details you provide, the better our AI can analyze and help you build your startup."
                  className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-400 text-base resize-none focus:outline-none leading-relaxed pr-16"
                  style={{
                    minHeight: '120px',
                    maxHeight: '400px',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    overflowY: 'auto'
                  }}
                  rows={1}
                />
                
                {/* Small Get Started button in bottom right corner */}
                <button
                  onClick={handleRunActions}
                  disabled={!canRunActions}
                  className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    canRunActions
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-110'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {uploadedFiles.length > 0 && (
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] rounded-lg px-3 py-2">
                        <span className="text-white text-sm truncate max-w-32">{file.name}</span>
                        <button
                          onClick={() => removeUploadedFile(index)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between px-4 pb-2">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="glass" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    <FolderOpen className="w-4 h-4" />
                    Upload Files
                  </Button>
                  
                  {/* Character count indicator */}
                  <div className="text-xs text-gray-500">
                    {appIdea.length} characters
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {selectedActions.length > 0 && (
                    <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
                      <div className="text-sm text-blue-400 font-medium">
                        {selectedActions.length} action{selectedActions.length > 1 ? 's' : ''} selected
                      </div>
                      <div className="w-px h-4 bg-blue-500/30" />
                      <div className="text-sm text-yellow-400 font-medium">
                        {totalCost} credits
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Helper text */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              💡 Tip: The more detailed your description, the better our AI can analyze and help build your startup
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Action Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10"
      >
        <MultipleAIActionSelector
          selectedActions={selectedActions}
          onActionToggle={handleActionToggle}
          onClearAll={handleClearAllActions}
          onSelectAll={handleSelectAllActions}
          allActionsSelected={false} // This will be calculated inside the component
          agents={agents}
        />
      </motion.div>

      {/* My Recent Apps Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-between mb-8">
          {/* Reduced from 2xl to xl */}
          <h2 className="text-xl font-bold text-white">My Recent Projects</h2>
          <Button variant="glass" size="sm" onClick={() => navigate('/projects')}>
            View All
          </Button>
        </div>
        
        {recentProjects.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-gray-400" />
            </div>
            {/* Reduced from lg to base */}
            <h3 className="text-base font-medium text-white mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-4">Create your first project by describing your startup idea above.</p>
            <Button variant="primary" size="sm" onClick={() => navigate('/projects')}>
              <Plus className="w-4 h-4" />
              Create Project
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <Card hover className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {project.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1 truncate">{project.title}</h3>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : project.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Updated {project.lastActivity || 'recently'}
                    </div>
                    <Button 
                      variant="glass" 
                      size="sm"
                      onClick={() => handleOpenStartup(project.id)}
                    >
                      Open
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};