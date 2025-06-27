import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import * as Icons from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  cost: number;
  icon: string;
  is_active: boolean;
}

interface ActionModalProps {
  actionId: string | null;
  projectId: string | null;
  projectTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (actionId: string, projectId: string, input: string) => void;
  agents: Agent[];
}

interface FormData {
  input: string;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  actionId,
  projectId,
  projectTitle,
  isOpen,
  onClose,
  onSubmit,
  agents
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const agent = actionId ? agents.find(a => a.id === actionId) : null;
  const IconComponent = agent ? (Icons as any)[agent.icon] || Icons.FileText : null;

  const handleFormSubmit = async (data: FormData) => {
    if (!actionId || !projectId) return;
    
    setLoading(true);
    try {
      await onSubmit(actionId, projectId, data.input);
      reset();
      onClose();
    } catch (error) {
      console.error('Action submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!agent) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${agent.name} - ${projectTitle}`}
      size="lg"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
            <p className="text-gray-400 text-sm">{agent.description}</p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-400 font-medium">Project: {projectTitle}</span>
            <span className="text-yellow-400 font-medium">Cost: {agent.cost} credits</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Describe what you want to analyze for this project
            </label>
            <textarea
              {...register('input', { 
                required: 'Please describe what you want to analyze',
                minLength: {
                  value: 20,
                  message: 'Please provide at least 20 characters of detail'
                }
              })}
              placeholder={`Describe what aspects of "${projectTitle}" you want to analyze with ${agent.name}...`}
              className="input-glass w-full px-4 py-3 rounded-xl h-32 resize-none"
            />
            {errors.input && (
              <p className="text-red-400 text-sm mt-1">{errors.input.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="glass"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              Run Analysis ({agent.cost} credits)
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};