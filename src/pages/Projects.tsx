import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FolderOpen, Clock, MoreVertical, Eye, Play, Trash2, Edit3 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useProjects } from '../hooks/useProjects';

interface ProjectFormData {
  title: string;
  description: string;
  startup_idea: string;
}

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProjectFormData>();

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      await createProject({
        title: data.title,
        description: data.description,
        startup_idea: data.startup_idea
      });
      setIsCreateModalOpen(false);
      reset();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleEditProject = async (data: ProjectFormData) => {
    if (!selectedProject) return;
    
    try {
      await updateProject(selectedProject.id, {
        title: data.title,
        description: data.description,
        startup_idea: data.startup_idea
      });
      setIsEditModalOpen(false);
      setSelectedProject(null);
      reset();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjectToDelete(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleViewDetails = (projectId: string) => {
    navigate(`/startup/${projectId}`);
  };

  const handleRunAction = (projectId: string) => {
    navigate('/actions', { state: { selectedProjectId: projectId } });
  };

  const openEditModal = (project: any) => {
    setSelectedProject(project);
    setValue('title', project.title);
    setValue('description', project.description);
    setValue('startup_idea', project.startup_idea);
    setIsEditModalOpen(true);
    setOpenDropdown(null);
  };

  const toggleDropdown = (projectId: string) => {
    setOpenDropdown(openDropdown === projectId ? null : projectId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return formatDate(dateString);
  };

  if (loading) {
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
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-purple-500/5 to-transparent" />
        <div className="absolute top-1/3 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-green-500/3 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-orange-500/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between relative z-10"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your startup projects and track their progress.</p>
        </div>
        
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-5 h-5" />
          New Project
        </Button>
      </motion.div>

      <div className="relative z-10">
        {projects.length === 0 ? (
          <Card className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Create your first project to start analyzing and building your startup ideas with AI-powered tools.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
              Create Your First Project
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="relative">
                      <button 
                        className="text-gray-400 hover:text-white p-1 transition-colors"
                        onClick={() => toggleDropdown(project.id)}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      
                      {openDropdown === project.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className="absolute right-0 top-8 bg-black border border-white/20 rounded-xl p-2 z-10 min-w-[140px] shadow-2xl"
                          style={{ 
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
                          }}
                        >
                          <button
                            onClick={() => openEditModal(project)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit Project
                          </button>
                          <button
                            onClick={() => {
                              setProjectToDelete(project.id);
                              setOpenDropdown(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'completed'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {project.status}
                    </div>
                    <div className="text-sm text-gray-500">{project.actionsRun || 0} actions run</div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {getTimeAgo(project.updated_at)}
                    </div>
                    <div>Created {formatDate(project.created_at)}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="glass" 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => handleViewDetails(project.id)}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => handleRunAction(project.id)}
                    >
                      <Play className="w-4 h-4" />
                      Run Action
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          reset();
        }}
        title="Create New Project"
        size="lg"
      >
        <form onSubmit={handleSubmit(handleCreateProject)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Title
            </label>
            <input
              {...register('title', { required: 'Project title is required' })}
              type="text"
              placeholder="Enter your project title..."
              className="input-glass w-full px-4 py-3 rounded-xl"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Brief description of your project..."
              className="input-glass w-full px-4 py-3 rounded-xl h-24 resize-none"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Startup Idea
            </label>
            <textarea
              {...register('startup_idea', { required: 'Startup idea is required' })}
              placeholder="Describe your startup idea in detail..."
              className="input-glass w-full px-4 py-3 rounded-xl h-32 resize-none"
            />
            {errors.startup_idea && (
              <p className="text-red-400 text-sm mt-1">{errors.startup_idea.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="glass"
              onClick={() => {
                setIsCreateModalOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProject(null);
          reset();
        }}
        title="Edit Project"
        size="lg"
      >
        <form onSubmit={handleSubmit(handleEditProject)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Title
            </label>
            <input
              {...register('title', { required: 'Project title is required' })}
              type="text"
              placeholder="Enter your project title..."
              className="input-glass w-full px-4 py-3 rounded-xl"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Brief description of your project..."
              className="input-glass w-full px-4 py-3 rounded-xl h-24 resize-none"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Startup Idea
            </label>
            <textarea
              {...register('startup_idea', { required: 'Startup idea is required' })}
              placeholder="Describe your startup idea in detail..."
              className="input-glass w-full px-4 py-3 rounded-xl h-32 resize-none"
            />
            {errors.startup_idea && (
              <p className="text-red-400 text-sm mt-1">{errors.startup_idea.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="glass"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedProject(null);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal - Pure Black */}
      <Modal
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title="Delete Project"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Delete Project</h3>
            <p className="text-gray-400">
              Are you sure you want to delete this project? This action cannot be undone and will remove all associated data.
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="glass"
              onClick={() => setProjectToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => handleDeleteProject(projectToDelete!)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Project
            </Button>
          </div>
        </div>
      </Modal>

      {/* Click outside to close dropdown */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
};