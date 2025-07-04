import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { HelpCircle } from 'lucide-react';
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

interface ActionGridProps {
  onActionSelect: (actionId: string) => void;
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

export const ActionGrid: React.FC<ActionGridProps> = ({ onActionSelect, agents }) => {
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
          <Icons.Box className="w-8 h-8 text-gray-400" />
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
      {sortedCategories.map(([categoryKey, categoryAgents], categoryIndex) => {
        const categoryInfo = categoryMapping[categoryKey] || {
          name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
          description: 'AI-powered analysis tools',
          color: 'from-gray-500 to-gray-600'
        };

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
              <div>
                <h3 className="text-lg font-bold text-white">{categoryInfo.name}</h3>
                <p className="text-gray-400 text-sm">{categoryInfo.description}</p>
              </div>
            </div>

            {/* Compact Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryAgents.map((agent, index) => {
                const IconComponent = (Icons as any)[agent.icon] || Icons.FileText;
                
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (categoryIndex * 0.05) + (index * 0.02) }}
                  >
                    <Card hover className="h-full relative">
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDetailAction(agent.id);
                          }}
                          className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors bg-white/[0.05] hover:bg-white/[0.1] rounded-full flex items-center justify-center"
                        >
                          <HelpCircle className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className={`w-10 h-10 bg-gradient-to-r ${categoryInfo.color} rounded-lg flex items-center justify-center mb-3`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      
                      <h4 className="text-base font-semibold text-white mb-2 pr-8">{agent.name}</h4>
                      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">{agent.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 font-medium text-sm">{agent.cost}</span>
                          <span className="text-gray-500 text-xs">credits</span>
                        </div>
                        
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onActionSelect(agent.id)}
                        >
                          Run
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

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
                  if (selectedDetailAction) {
                    onActionSelect(selectedDetailAction);
                  }
                  setSelectedDetailAction(null);
                }}
              >
                Run Action
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};