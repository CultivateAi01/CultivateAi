import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { aiActions } from '../../data/aiActions';
import * as Icons from 'lucide-react';

interface AIActionSelectorProps {
  selectedAction: string | null;
  onActionSelect: (actionId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const AIActionSelector: React.FC<AIActionSelectorProps> = ({
  selectedAction,
  onActionSelect,
  isOpen,
  onToggle
}) => {
  const selectedActionData = selectedAction ? aiActions.find(a => a.id === selectedAction) : null;

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-between p-3 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] rounded-xl transition-all duration-200 min-w-[200px]"
      >
        <div className="flex items-center gap-2">
          {selectedActionData ? (
            <>
              <div className={`w-6 h-6 ${selectedActionData.color} rounded-lg flex items-center justify-center`}>
                {React.createElement((Icons as any)[selectedActionData.icon], { className: "w-3 h-3 text-white" })}
              </div>
              <span className="text-white font-medium text-sm">{selectedActionData.name}</span>
            </>
          ) : (
            <span className="text-gray-400 text-sm">Select AI Action</span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-2 z-50 max-h-64 overflow-y-auto min-w-[300px]"
        >
          <div className="space-y-1">
            {aiActions.map((action) => {
              const IconComponent = (Icons as any)[action.icon];
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    onActionSelect(action.id);
                    onToggle();
                  }}
                  className="w-full p-3 text-left hover:bg-white/[0.08] rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{action.name}</div>
                      <div className="text-gray-400 text-xs">{action.description.substring(0, 60)}...</div>
                    </div>
                    <div className="text-yellow-400 text-xs font-medium">{action.cost} credits</div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};