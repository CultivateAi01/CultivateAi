import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckSquare, Square, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import * as Icons from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  cost: number;
  icon: string;
  is_active: boolean;
  output_example?: string;
}

interface MultipleAIActionSelectorProps {
  selectedActions: string[];
  onActionToggle: (actionId: string) => void;
  onClearAll: () => void;
  onSelectAll: () => void;
  allActionsSelected: boolean;
  agents: Agent[];
}

// Category mapping for better organization
const categoryMapping: Record<string, {
  name: string;
  description: string;
  color: string;
  order: number;
}> = {
  'research': {
    name: 'Idea Validation',
    description: 'Validate and refine your concept',
    color: 'from-green-500 to-emerald-500',
    order: 1
  },
  'validation': {
    name: 'Business Strategy',
    description: 'Strategic planning and analysis',
    color: 'from-blue-500 to-cyan-500',
    order: 2
  },
  'development': {
    name: 'Product Strategy',
    description: 'Product development and roadmap',
    color: 'from-orange-500 to-amber-500',
    order: 3
  },
  'marketing': {
    name: 'Brand & Marketing',
    description: 'Marketing and brand strategy',
    color: 'from-pink-500 to-rose-500',
    order: 4
  },
  'legal': {
    name: 'Growth & Operations',
    description: 'Scaling and operational excellence',
    color: 'from-indigo-500 to-purple-500',
    order: 5
  }
};

// Generate detailed descriptions based on agent data
const generateActionDetails = (agent: Agent) => {
  const baseFeatures = {
    'research': ['Market size analysis', 'Industry trends analysis', 'Customer segmentation', 'Growth projections'],
    'validation': ['Executive summary', 'Market analysis', 'Financial projections', 'Risk analysis'],
    'development': ['Feature prioritization', 'Technical architecture', 'Development timeline', 'Resource planning'],
    'marketing': ['Customer acquisition strategy', 'Brand positioning', 'Marketing channels', 'Growth tactics'],
    'legal': ['Entity structure advice', 'IP strategy', 'Compliance checklist', 'Legal risk assessment']
  };

  const baseDeliverables = {
    'research': ['Market research report', 'Industry analysis', 'Customer personas'],
    'validation': ['Complete business plan', 'Financial model', 'Implementation roadmap'],
    'development': ['MVP specification', 'Technical roadmap', 'Development plan'],
    'marketing': ['Marketing strategy', 'Channel plan', 'Brand guidelines'],
    'legal': ['Legal structure recommendation', 'IP protection plan', 'Compliance guide']
  };

  return {
    fullDescription: agent.description,
    features: baseFeatures[agent.category as keyof typeof baseFeatures] || ['Comprehensive analysis', 'Detailed insights', 'Actionable recommendations'],
    deliverables: baseDeliverables[agent.category as keyof typeof baseDeliverables] || ['Detailed report', 'Analysis summary', 'Recommendations'],
    timeEstimate: `${Math.max(2, Math.floor(agent.cost / 2))}-${Math.max(4, agent.cost)} minutes`
  };
};

export const MultipleAIActionSelector: React.FC<MultipleAIActionSelectorProps> = ({
  selectedActions,
  onActionToggle,
  onClearAll,
  onSelectAll,
  allActionsSelected,
  agents
}) => {
  const [selectedDetailAction, setSelectedDetailAction] = useState<string | null>(null);
  
  // Group agents by category
  const groupedAgents = agents.reduce((acc, agent) => {
    if (!agent.is_active) return acc;
    
    const category = agent.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(agent);
    return acc;
  }, {} as Record<string, Agent[]>);

  // Sort categories by order
  const sortedCategories = Object.entries(groupedAgents).sort(([a], [b]) => {
    const orderA = categoryMapping[a]?.order || 999;
    const orderB = categoryMapping[b]?.order || 999;
    return orderA - orderB;
  });

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Icons.Zap className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No AI actions available</h3>
        <p className="text-gray-400">AI actions will appear here once they're configured.</p>
      </div>
    );
  }

  const selectedAgent = selectedDetailAction ? agents.find(a => a.id === selectedDetailAction) : null;
  const selectedDetail = selectedAgent ? generateActionDetails(selectedAgent) : null;

  return (
    <div className="space-y-8">
      {/* Header with Select All and Clear All */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">AI Actions</h3>
          <p className="text-gray-400 text-sm">Select the AI actions you want to run on your idea</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="glass"
            size="sm"
            onClick={onSelectAll}
            className="gap-2"
          >
            {allActionsSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
            {allActionsSelected ? 'Deselect All' : 'Select All'}
          </Button>
          
          {selectedActions.length > 0 && (
            <Button
              variant="glass"
              size="sm"
              onClick={onClearAll}
              className="gap-2"
            >
              Clear All ({selectedActions.length})
            </Button>
          )}
        </div>
      </div>

      {/* Categorized Actions */}
      <div className="space-y-8">
        {sortedCategories.map(([categoryKey, categoryAgents], categoryIndex) => {
          const categoryInfo = categoryMapping[categoryKey] || {
            name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
            description: 'AI-powered analysis tools',
            color: 'from-gray-500 to-gray-600'
          };
          
          const selectedInCategory = categoryAgents.filter(agent => selectedActions.includes(agent.id)).length;

          return (
            <motion.div
              key={categoryKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.05 }}
              className="space-y-4"
            >
              {/* Compact Category Header */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${categoryInfo.color} rounded-lg flex items-center justify-center`}>
                  <Icons.Folder className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-white">{categoryInfo.name}</h4>
                    {selectedInCategory > 0 && (
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-full px-2 py-0.5">
                        <span className="text-blue-400 text-xs font-medium">
                          {selectedInCategory}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{categoryInfo.description}</p>
                </div>
              </div>

              {/* Compact Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {categoryAgents.map((agent, index) => {
                  const IconComponent = (Icons as any)[agent.icon] || Icons.FileText;
                  const isSelected = selectedActions.includes(agent.id);
                  
                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (categoryIndex * 0.05) + (index * 0.02) }}
                      className={`relative p-3 rounded-lg border transition-all duration-200 group cursor-pointer ${
                        isSelected
                          ? 'bg-blue-500/20 border-blue-500/40 ring-1 ring-blue-500/30'
                          : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.05] hover:border-white/[0.1]'
                      }`}
                      onClick={() => onActionToggle(agent.id)}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-8 h-8 bg-gradient-to-r ${categoryInfo.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h5 className="text-white font-medium text-sm leading-tight">{agent.name}</h5>
                            <div className="flex items-center gap-1 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDetailAction(agent.id);
                                }}
                                className="w-4 h-4 text-gray-400 hover:text-blue-400 transition-colors"
                              >
                                <HelpCircle className="w-4 h-4" />
                              </button>
                              {isSelected ? (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <CheckSquare className="w-2.5 h-2.5 text-white" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center group-hover:border-blue-400 transition-colors duration-200">
                                  <Plus className="w-2.5 h-2.5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed mb-2 line-clamp-2">{agent.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-yellow-400 text-xs font-medium">{agent.cost} credits</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedDetailAction}
        onClose={() => setSelectedDetailAction(null)}
        title="Action Details"
        size="lg"
      >
        {selectedDetail && selectedAgent && (
          <div className="space-y-6">
            {/* Action Header */}
            <div className="flex items-start gap-4">
              {(() => {
                const IconComponent = (Icons as any)[selectedAgent.icon] || Icons.FileText;
                const categoryInfo = categoryMapping[selectedAgent.category] || { color: 'from-gray-500 to-gray-600' };
                return (
                  <div className={`w-12 h-12 bg-gradient-to-r ${categoryInfo.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                );
              })()}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{selectedAgent.name}</h3>
                <p className="text-gray-400 leading-relaxed">{selectedDetail.fullDescription}</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">What's Included</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedDetail.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">You'll Receive</h4>
              <div className="space-y-2">
                {selectedDetail.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    <span className="text-gray-300 text-sm">{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Example */}
            {selectedAgent.output_example && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Example Output</h4>
                <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.08]">
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedAgent.output_example}</p>
                </div>
              </div>
            )}

            {/* Time and Cost */}
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.08]">
              <div>
                <div className="text-white font-medium">Estimated Time</div>
                <div className="text-gray-400 text-sm">{selectedDetail.timeEstimate}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">Cost</div>
                <div className="text-yellow-400 font-semibold">{selectedAgent.cost} credits</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="glass"
                onClick={() => setSelectedDetailAction(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (selectedDetailAction && !selectedActions.includes(selectedDetailAction)) {
                    onActionToggle(selectedDetailAction);
                  }
                  setSelectedDetailAction(null);
                }}
                disabled={selectedDetailAction ? selectedActions.includes(selectedDetailAction) : false}
              >
                {selectedDetailAction && selectedActions.includes(selectedDetailAction) ? 'Already Selected' : 'Select Action'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};