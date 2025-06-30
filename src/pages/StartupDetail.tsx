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
      content: `<h1>Market Research Analysis</h1>
<h2>Market Size & Opportunity</h2>
<p>The sustainable food delivery market is experiencing rapid growth, with a projected CAGR of 15.2% through 2028. The total addressable market (TAM) is estimated at $45B globally.</p>

<h3>Key Market Insights:</h3>
<ul>
<li>73% of consumers willing to pay premium for sustainable options</li>
<li>Urban markets show highest adoption rates (85% in major cities)</li>
<li>Competitor analysis reveals significant gaps in eco-packaging solutions</li>
</ul>

<h2>Target Demographics:</h2>
<ul>
<li>Primary: Ages 25-40, household income $50K+</li>
<li>Secondary: Eco-conscious families with children</li>
<li>Geographic focus: Major metropolitan areas</li>
</ul>

<h2>Competitive Landscape:</h2>
<ol>
<li><strong>DoorDash</strong>: Limited sustainability features</li>
<li><strong>Uber Eats</strong>: Basic carbon offset program</li>
<li><strong>Grubhub</strong>: No significant green initiatives</li>
</ol>

<h2>Market Entry Strategy:</h2>
<p>Focus on 3-5 pilot cities with high environmental awareness and strong restaurant density.</p>`,
      creditsUsed: 10
    },
    {
      id: '2',
      actionId: '2',
      actionName: 'MVP Builder',
      status: 'completed' as const,
      timestamp: '2024-01-20T11:45:00Z',
      content: `<h1>MVP Development Roadmap</h1>

<h2>Core Features (Phase 1 - 3 months)</h2>
<h3>Customer App:</h3>
<ul>
<li>Restaurant discovery with sustainability ratings</li>
<li>Eco-packaging options selection</li>
<li>Carbon footprint tracking per order</li>
<li>Delivery route optimization display</li>
</ul>

<h3>Restaurant Dashboard:</h3>
<ul>
<li>Sustainability metrics tracking</li>
<li>Eco-packaging inventory management</li>
<li>Customer feedback on green initiatives</li>
</ul>

<h3>Delivery Platform:</h3>
<ul>
<li>Route optimization for minimal emissions</li>
<li>Electric vehicle integration</li>
<li>Real-time carbon offset calculations</li>
</ul>

<h2>Technical Architecture:</h2>
<ul>
<li><strong>Frontend</strong>: React Native for mobile apps</li>
<li><strong>Backend</strong>: Node.js with Express</li>
<li><strong>Database</strong>: PostgreSQL with Redis caching</li>
<li><strong>Maps</strong>: Google Maps API with custom routing</li>
<li><strong>Payments</strong>: Stripe with carbon offset integration</li>
</ul>

<h2>Development Timeline:</h2>
<ul>
<li><strong>Month 1</strong>: Core ordering system</li>
<li><strong>Month 2</strong>: Sustainability features</li>
<li><strong>Month 3</strong>: Delivery optimization</li>
<li><strong>Month 4</strong>: Beta testing and refinement</li>
</ul>

<h2>Estimated Costs:</h2>
<ul>
<li>Development team: $180K</li>
<li>Infrastructure: $15K</li>
<li>Third-party integrations: $25K</li>
<li><strong>Total MVP Cost</strong>: $220K</li>
</ul>`,
      creditsUsed: 15
    },
    {
      id: '3',
      actionId: '3',
      actionName: 'Pitch Deck Generator',
      status: 'completed' as const,
      timestamp: '2024-01-20T14:20:00Z',
      content: `<h1>EcoDelivery Pitch Deck</h1>

<h2>Slide 1: Problem</h2>
<p>🌍 <strong>The food delivery industry generates 1.5B tons of packaging waste annually</strong></p>
<ul>
<li>89% of delivery packaging is non-recyclable</li>
<li>Average delivery creates 2.3kg CO2 emissions</li>
<li>Consumers increasingly demand sustainable options</li>
</ul>

<h2>Slide 2: Solution</h2>
<p>🚀 <strong>EcoDelivery: The world's first carbon-neutral food delivery platform</strong></p>
<ul>
<li>AI-optimized routing reduces emissions by 40%</li>
<li>100% compostable packaging partnerships</li>
<li>Real-time carbon offset integration</li>
</ul>

<h2>Slide 3: Market Opportunity</h2>
<p>📈 <strong>$45B TAM with 15.2% CAGR</strong></p>
<ul>
<li>73% of consumers willing to pay 10-15% premium</li>
<li>156M potential users in target demographics</li>
<li>First-mover advantage in sustainability space</li>
</ul>

<h2>Slide 4: Business Model</h2>
<p>💰 <strong>Multiple Revenue Streams</strong></p>
<ul>
<li>Commission: 15-20% per order</li>
<li>Sustainability premium: 5% additional</li>
<li>Carbon offset marketplace: 2-3% transaction fee</li>
<li>Restaurant sustainability consulting: $500-2K/month</li>
</ul>

<h2>Slide 5: Traction</h2>
<p>🎯 <strong>Early Validation</strong></p>
<ul>
<li>2,500 pre-registered users</li>
<li>45 restaurant partnerships signed</li>
<li>$125K in pre-seed funding secured</li>
</ul>

<h2>Slide 6: Financial Projections</h2>
<p>📊 <strong>5-Year Growth Plan</strong></p>
<ul>
<li>Year 1: $2.5M revenue, 50K orders</li>
<li>Year 3: $45M revenue, 2M orders</li>
<li>Year 5: $180M revenue, 12M orders</li>
<li>Break-even: Month 18</li>
</ul>

<h2>Slide 7: Team</h2>
<p>👥 <strong>Experienced Leadership</strong></p>
<ul>
<li>CEO: Former Uber Eats operations director</li>
<li>CTO: Ex-Google Maps engineer</li>
<li>CMO: Sustainability marketing expert</li>
</ul>

<h2>Slide 8: Funding Ask</h2>
<p>💵 <strong>Seeking $2M Series A</strong></p>
<ul>
<li>40% Product development</li>
<li>30% Market expansion</li>
<li>20% Team growth</li>
<li>10% Marketing & partnerships</li>
</ul>`,
      creditsUsed: 12
    },
    {
      id: '4',
      actionId: '5',
      actionName: 'Marketing Strategy',
      status: 'in_progress' as const,
      timestamp: '2024-01-20T15:00:00Z',
      content: `<h1>Marketing Strategy (In Progress)</h1>

<h2>Brand Positioning</h2>
<p>"The conscious choice for conscious consumers"</p>

<h2>Go-to-Market Strategy</h2>
<h3>Phase 1: Community Building (Months 1-3)</h3>
<ul>
<li>Partner with environmental organizations</li>
<li>Influencer collaborations with eco-lifestyle creators</li>
<li>University campus pilot programs</li>
</ul>

<h3>Phase 2: Market Penetration (Months 4-8)</h3>
<ul>
<li>Targeted digital advertising in pilot cities</li>
<li>Restaurant partnership announcements</li>
<li>Sustainability impact reporting</li>
</ul>

<h2>Customer Acquisition Channels</h2>
<ol>
<li><strong>Digital Marketing</strong> (40% budget)
<ul>
<li>Instagram/TikTok campaigns</li>
<li>Google Ads for "sustainable delivery"</li>
<li>Content marketing on environmental blogs</li>
</ul>
</li>
<li><strong>Partnerships</strong> (30% budget)
<ul>
<li>Environmental NGO collaborations</li>
<li>Corporate sustainability programs</li>
<li>University partnerships</li>
</ul>
</li>
<li><strong>PR & Events</strong> (20% budget)
<ul>
<li>Earth Day activations</li>
<li>Sustainability conference presence</li>
<li>Local environmental events</li>
</ul>
</li>
<li><strong>Referral Program</strong> (10% budget)
<ul>
<li>Carbon credit rewards for referrals</li>
<li>Gamified sustainability challenges</li>
</ul>
</li>
</ol>

<h2>Success Metrics</h2>
<ul>
<li>Customer Acquisition Cost (CAC): <$25</li>
<li>Lifetime Value (LTV): >$150</li>
<li>Monthly Active Users growth: 20%</li>
<li>Brand awareness in target markets: 35%</li>
</ul>`,
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
      // Strip HTML tags for clipboard
      const textContent = content.replace(/<[^>]*>/g, '');
      await navigator.clipboard.writeText(textContent);
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

                    {/* Result Content - Now renders HTML properly with custom styles */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6"
                      >
                        <div className="max-w-none">
                          <div 
                            className="text-gray-300 leading-relaxed rendered-html-content"
                            dangerouslySetInnerHTML={{ __html: result.content }}
                          />
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

      {/* Custom CSS for rendered HTML content */}
      <style jsx>{`
        .rendered-html-content h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
        }
        
        .rendered-html-content h1:first-child {
          margin-top: 0;
        }
        
        .rendered-html-content h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.75rem;
          margin-top: 1.25rem;
        }
        
        .rendered-html-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #e5e7eb;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }
        
        .rendered-html-content p {
          color: #d1d5db;
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .rendered-html-content ul, .rendered-html-content ol {
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
        }
        
        .rendered-html-content li {
          color: #d1d5db;
          margin-bottom: 0.25rem;
          line-height: 1.5;
        }
        
        .rendered-html-content strong {
          color: white;
          font-weight: 600;
        }
        
        .rendered-html-content ul {
          list-style-type: disc;
        }
        
        .rendered-html-content ol {
          list-style-type: decimal;
        }
        
        .rendered-html-content ul ul, .rendered-html-content ol ul {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};