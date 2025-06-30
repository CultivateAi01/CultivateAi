import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Download, 
  Copy, 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  Loader2,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { aiActions } from '../data/aiActions';
import * as Icons from 'lucide-react';

// Mock data - in real app this would come from API/database
const mockStartupData = {
  id: '1',
  title: 'EcoDelivery App',
  description: 'Sustainable food delivery platform connecting eco-conscious consumers with local restaurants',
  status: 'active' as const,
  lastUpdated: '2 hours ago',
  createdAt: '2024-01-15',
  tagline: 'Delivering sustainability, one meal at a time',
  problem: 'Traditional food delivery creates massive environmental waste through packaging and inefficient routing',
  solution: 'AI-optimized delivery routes with eco-friendly packaging and carbon-neutral delivery options',
  targetMarket: 'Environmentally conscious millennials and Gen Z consumers in urban areas',
  results: [
    {
      id: '1',
      actionId: '1',
      actionName: 'Market Research',
      status: 'completed' as const,
      timestamp: '2024-01-20T10:30:00Z',
      content: `<h1 id=finalreporttherelationshipbetweendonaldtrumpandjeffreyepstein">Final Report: The Relationship Between Donald Trump and Jeffrey Epstein</h1>\n<h2 id="introduction">Introduction</h2>\n<p>The association between Donald Trump, the 45th President of the United States, and Jeffrey Epstein, a convicted sex offender who was implicated in numerous scandals involving sexual abuse and trafficking, has raised numerous questions regarding political collusion, social connections, and implications for public trust. This report compiles findings from various investigations, social observations, and public claims to explore the nuances of their relationship, the implications of such a connection, and recent developments pertaining to disclosures related to Epstein.</p>\n<h2 id="backgroundonjeffreyepstein">Background on Jeffrey Epstein</h2>\n<p>Jeffrey Epstein was a financier and convicted sex offender known for his high-profile connections. His life took a dramatic turn following his arrest in 2019 for sex trafficking charges. Epstein's social network included many influential figures in various sectors, including politics, business, and entertainment. His connections, coupled with his criminal activities, have cast a long shadow over those associated with him.</p>\n<h2 id="donaldtrumpandjeffreyepsteinachronologicalperspective">Donald Trump and Jeffrey Epstein: A Chronological Perspective</h2>\n<h3 id="early1990stheemergenceofafriendship">Early 1990s: The Emergence of a Friendship</h3>\n<ul>\n<li><strong>Social Interactions</strong>: Trump and Epstein became acquainted in the early 1990s, frequenting upscale social settings. This period marked the beginning of a long-standing friendship, characterized by shared interests in affluent lifestyles and young women. </li>\n<li><strong>Notable Events at Mar-a-Lago</strong>: Trump hosted various high-profile events at his Mar-a-Lago estate, including a calendar girl competition in which Epstein was notably present among VIP attendees, suggesting a comfortable rapport.</li>\n</ul>\n<h3 id="late1990stoearly2000sflightlogsandallegations">Late 1990s to Early 2000s: Flight Logs and Allegations</h3>\n<ul>\n<li><strong>Flight Logs</strong>: Investigations have confirmed that Trump flew on Epstein's private plane at least seven times between 1999 and 2002. Notably, these flights included family members, though there were no reported instances directly linking Trump to any illegal activities during these flights.</li>\n<li><strong>Public Persona</strong>: Despite his associations, there were no direct allegations against Trump during this period that implicated him in Epstein's criminal activities.</li>\n</ul>\n<h3 id="2004theallegedfallingout">2004: The Alleged Falling Out</h3>\n<ul>\n<li><strong>Rival Real Estate Interests</strong>: Trump claimed to have distanced himself from Epstein after experiencing a falling out in 2004, allegedly due to their competing real estate interests in Palm Beach.</li>\n<li><strong>Claims of Distancing</strong>: In subsequent years, Trump publicly disassociated himself from Epstein, particularly following Epstein's 2008 conviction. However, Trump's comments about Ghislaine Maxwell, Epstein's close associate, raised eyebrows when he wished her well during her legal troubles, indicating a more complex and potentially ambivalent relationship.</li>\n</ul>\n<h2 id="recentdevelopments">Recent Developments</h2>\n<h3 id="elonmusksaccusations">Elon Musk's Accusations</h3>\n<ul>\n<li><strong>Public Claims</strong>: In a surprising turn, Elon Musk publicly accused Trump of being named in government files related to Epstein. Musk suggested that the government was withholding these files to protect Trump, a statement made without substantial evidence.</li>\n</ul>\n<h3 id="callsfortransparency">Calls for Transparency</h3>\n<ul>\n<li><strong>Congressional Demands</strong>: On June 5, 2025, Representatives Robert Garcia and Stephen F. Lynch demanded greater transparency concerning the Epstein files, proposing that they could contain evidence implicating Trump. This has raised suspicions about possible governmental suppression of information that could impact public perception of Trump.</li>\n</ul>\n<h3 id="socialandpoliticalimplications">Social and Political Implications</h3>\n<ul>\n<li><strong>Impact on Trust</strong>: The surfacing of allegations and demands for transparency has fostered a climate of skepticism regarding Trump's previous assertions and the nature of his relationships. The conflicting narratives surrounding his distancing from Epstein juxtaposed with maintaining ties through mutual acquaintances have significant repercussions for public trust in political leadership.</li>\n</ul>\n<h2 id="summaryoffindings">Summary of Findings</h2>\n<table>\n<thead>\n<tr>\n<th><strong>Aspect</strong></th>\n<th><strong>Details</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Friendship Origin</strong></td>\n<td>Began in the early 1990s, involving social interactions in affluent settings.</td>\n</tr>\n<tr>\n<td><strong>Flight Logs</strong></td>\n<td>Confirmed flights on Epstein's plane at least seven times between 1999 and 2002; no direct accusations of misconduct during flights.</td>\n</tr>\n<tr>\n<td><strong>Alleged Falling Out</strong></td>\n<td>Trump claims to have distanced himself in 2004 over real estate competition; maintains ambivalent ties through mutual acquaintances.</td>\n</tr>\n<tr>\n<td><strong>Elon Musk's Accusations</strong></td>\n<td>Claims Trump is implicated in undisclosed Epstein files; lack of substantial evidence prompts doubts.</td>\n</tr>\n<tr>\n<td><strong>Congressional Transparency Calls</strong></td>\n<td>Calls for the release of Epstein files that might contain critical information regarding Trump's associations; raises questions about suppression.</td>\n</tr>\n</tbody>\n</table>\n<h2 id="conclusion">Conclusion</h2>\n<p>The relationship between Donald Trump and Jeffrey Epstein presents a complex narrative characterized by social proximity, public distancing, and ongoing scrutiny. Despite Trump's declarations of separation from Epstein post-2004, the resurging interest in this dynamic—especially in light of recent allegations and calls for transparency—suggests that this association will continue to be a point of interest in both public discourse and political investigation.</p>\n<p>The implications of this relationship extend beyond Trump's past affiliations, challenging societal perceptions of accountability in leadership and the importance of transparent governance. As new information emerges, the focus on Trump's past connections to Epstein is likely to persist, necessitating ongoing examination and dialogue.</p>`,
      creditsUsed: 10
    }
  ],
  activityLog: [
    { id: '1', action: 'Pitch Deck rerun', timestamp: '2 hours ago', user: 'You' },
    { id: '2', action: 'Market Research completed', timestamp: '1 day ago', user: 'AI Assistant' },
    { id: '3', action: 'MVP Builder analysis', timestamp: '2 days ago', user: 'AI Assistant' },
    { id: '4', action: 'Project created', timestamp: '5 days ago', user: 'You' }
  ],
  notes: [
    { id: '1', content: 'Focus on B-Corp certification for credibility', timestamp: '1 day ago' },
    { id: '2', content: 'Consider partnership with local farms for supply chain', timestamp: '3 days ago' }
  ]
};

const sectionTabs = [
  { id: 'overview', label: 'Overview', icon: 'Eye' },
  { id: 'market-research', label: 'Market Research', icon: 'TrendingUp' },
  { id: 'mvp-builder', label: 'MVP Builder', icon: 'Rocket' },
  { id: 'pitch-deck', label: 'Pitch Deck', icon: 'Presentation' },
  { id: 'business-plan', label: 'Business Plan', icon: 'FileText' },
  { id: 'marketing', label: 'Marketing', icon: 'Target' },
  { id: 'legal', label: 'Legal', icon: 'Scale' }
];

export const StartupDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedResults, setExpandedResults] = useState<string[]>(['1', '2', '3']);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const startup = mockStartupData; // In real app, fetch by id

  const toggleResultExpansion = (resultId: string) => {
    setExpandedResults(prev => 
      prev.includes(resultId) 
        ? prev.filter(id => id !== resultId)
        : [...prev, resultId]
    );
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // TODO: Show success toast
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRerunAction = (actionId: string) => {
    // TODO: Implement rerun action
    console.log('Rerunning action:', actionId);
  };

  const handleRerunAll = () => {
    // TODO: Implement rerun all actions
    console.log('Rerunning all actions');
  };

  const handleAddNewAction = () => {
    // TODO: Open action selector modal
    console.log('Adding new action');
  };

  const handleExportAll = () => {
    // TODO: Implement export functionality
    console.log('Exporting all results');
  };

  const addNote = () => {
    if (newNote.trim()) {
      // TODO: Add note to database
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const getActionIcon = (actionId: string) => {
    const action = aiActions.find(a => a.id === actionId);
    return action ? (Icons as any)[action.icon] : FileText;
  };

  const getActionColor = (actionId: string) => {
    const action = aiActions.find(a => a.id === actionId);
    return action?.color || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const filteredResults = activeSection === 'overview' 
    ? startup.results 
    : startup.results.filter(result => {
        const actionName = result.actionName.toLowerCase().replace(/\s+/g, '-');
        return actionName === activeSection;
      });

  return (
    <div className="space-y-8">
      {/* Header Section - Reduced text sizes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Back Navigation */}
        <Button
          variant="glass"
          size="sm"
          onClick={() => navigate('/home')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        {/* Startup Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {/* Reduced from 3xl to 2xl */}
              <h1 className="text-2xl font-bold text-white">{startup.title}</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                startup.status === 'active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {startup.status}
              </div>
            </div>
            {/* Reduced from lg to base */}
            <p className="text-gray-400 text-base">{startup.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Last updated {startup.lastUpdated}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created {startup.createdAt}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" onClick={handleRerunAll} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Rerun All
            </Button>
            <Button variant="glass" size="sm" onClick={handleAddNewAction} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Action
            </Button>
            <Button variant="primary" size="sm" onClick={handleExportAll} className="gap-2">
              <Download className="w-4 h-4" />
              Export All
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Startup Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="relative overflow-hidden">
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <div className="p-8">
            <div className="text-center mb-8">
              {/* Reduced from 2xl to xl */}
              <h2 className="text-xl font-bold text-white mb-2">{startup.tagline}</h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {startup.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/[0.03] rounded-xl border border-white/[0.08]">
                {/* Reduced from lg to base */}
                <h3 className="text-base font-semibold text-white mb-2">Problem</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{startup.problem}</p>
              </div>
              
              <div className="text-center p-6 bg-white/[0.03] rounded-xl border border-white/[0.08]">
                <h3 className="text-base font-semibold text-white mb-2">Solution</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{startup.solution}</p>
              </div>
              
              <div className="text-center p-6 bg-white/[0.03] rounded-xl border border-white/[0.08]">
                <h3 className="text-base font-semibold text-white mb-2">Target Market</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{startup.targetMarket}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Section Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="sticky top-20 z-10 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2"
      >
        <div className="flex items-center gap-2 overflow-x-auto">
          {sectionTabs.map((tab) => {
            const Icon = (Icons as any)[tab.icon];
            const isActive = activeSection === tab.id;
            const hasResults = tab.id === 'overview' || startup.results.some(r => 
              r.actionName.toLowerCase().replace(/\s+/g, '-') === tab.id
            );
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : hasResults
                    ? 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                    : 'text-gray-500 cursor-not-allowed'
                }`}
                disabled={!hasResults}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {hasResults && tab.id !== 'overview' && (
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* AI Results Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          {/* Reduced from 2xl to xl */}
          <h2 className="text-xl font-bold text-white">
            {activeSection === 'overview' ? 'All AI Results' : sectionTabs.find(t => t.id === activeSection)?.label}
          </h2>
          <div className="text-sm text-gray-400">
            {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredResults.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            {/* Reduced from lg to base */}
            <h3 className="text-base font-medium text-white mb-2">No results yet</h3>
            <p className="text-gray-400 mb-4">Run AI actions to generate insights for this section.</p>
            <Button variant="primary" size="sm" onClick={handleAddNewAction}>
              <Plus className="w-4 h-4" />
              Add AI Action
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result, index) => {
              const Icon = getActionIcon(result.actionId);
              const isExpanded = expandedResults.includes(result.id);
              
              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    {/* Result Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${getActionColor(result.actionId)} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            {/* Reduced from lg to base */}
                            <h3 className="text-base font-semibold text-white">{result.actionName}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                {result.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                                )}
                                <span className={result.status === 'completed' ? 'text-green-400' : 'text-blue-400'}>
                                  {result.status === 'completed' ? 'Completed' : 'In Progress'}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(result.timestamp).toLocaleDateString()}
                              </div>
                              <div className="text-yellow-400">
                                {result.creditsUsed} credits used
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="glass"
                            size="sm"
                            onClick={() => copyToClipboard(result.content)}
                            className="gap-1"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="glass"
                            size="sm"
                            onClick={() => handleRerunAction(result.actionId)}
                            className="gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="glass"
                            size="sm"
                            onClick={() => toggleResultExpansion(result.id)}
                            className="gap-1"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Result Content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6"
                      >
                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                            {result.content}
                          </pre>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                          <Button variant="glass" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export as PDF
                          </Button>
                          <Button variant="glass" size="sm" className="gap-2">
                            <FileText className="w-4 h-4" />
                            Export as Markdown
                          </Button>
                          <Button variant="glass" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Share Link
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Activity Log & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="p-6 border-b border-white/10">
              {/* Reduced from lg to base */}
              <h3 className="text-base font-semibold text-white">Activity Log</h3>
            </div>
            <div className="p-6 space-y-4">
              {startup.activityLog.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <div className="flex-1">
                    <div className="text-white text-sm">{activity.action}</div>
                    <div className="text-gray-400 text-xs">{activity.timestamp} by {activity.user}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                {/* Reduced from lg to base */}
                <h3 className="text-base font-semibold text-white">Notes</h3>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => setIsAddingNote(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Note
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {isAddingNote && (
                <div className="space-y-3">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full h-20 px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-white/20"
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="primary" size="sm" onClick={addNote}>
                      Save
                    </Button>
                    <Button variant="glass" size="sm" onClick={() => setIsAddingNote(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              {startup.notes.map((note) => (
                <div key={note.id} className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                  <div className="text-white text-sm mb-1">{note.content}</div>
                  <div className="text-gray-400 text-xs">{note.timestamp}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};