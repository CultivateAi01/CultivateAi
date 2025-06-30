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
      content: `
        <style>
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    p { line-height: 1.6; color: #444; }
    ul { margin-left: 1.5rem; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
  </style>
 <h1 id="marketresearchreportsustainablefooddeliveryplatforminindia">Market Research Report: Sustainable Food Delivery Platform in India</h1>\n<h2 id="executivesummary">Executive Summary</h2>\n<p>This report examines the market potential for a sustainable food delivery platform that connects eco-conscious consumers with local restaurants in India. The sustainable food delivery sector is part of a burgeoning market driven by increasing consumer awareness concerning health and sustainability practices. The report delves into the Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM), while also analyzing regional considerations, consumer demographics, and trends influencing this industry.</p>\n<h2 id="1marketoverview">1. Market Overview</h2>\n<h3 id="11totaladdressablemarkettam">1.1 Total Addressable Market (TAM)</h3>\n<ul>\n<li><strong>Definition</strong>: The Total Available Market is the overall revenue opportunity available if the business achieved 100% market share.</li>\n<li><strong>Current Landscape</strong>: </li>\n<li>India's population stands at approximately 1.4 billion, with a growing trend toward urbanization.</li>\n<li>By 2031, urban dwellers are expected to surpass 600 million, expanding the consumer base for sustainable food options.</li>\n<li>This environment presents a multi-billion dollar opportunity for sustainable food delivery services.</li>\n</ul>\n<h3 id="12serviceableavailablemarketsam">1.2 Serviceable Available Market (SAM)</h3>\n<ul>\n<li><strong>Definition</strong>: The Serviceable Available Market represents the segment of the TAM targeted by a business's products and services.</li>\n<li><strong>Market Segment</strong>:</li>\n<li>Urban areas are the primary focus, as they are more likely to spend on premium, eco-friendly food delivery.</li>\n<li>Estimations indicate that if the overall annual revenue for food delivery in urban regions is projected at $100 billion, capturing a 10% market share could yield a SAM of approximately $10 billion.</li>\n</ul>\n<h3 id="13serviceableobtainablemarketsom">1.3 Serviceable Obtainable Market (SOM)</h3>\n<ul>\n<li><strong>Definition</strong>: The Serviceable Obtainable Market reflects the realistic share of the market that a business can capture in the short term.</li>\n<li><strong>Market Penetration</strong>: </li>\n<li>New market entrants should consider capturing around 5% of the SAM within the first year.</li>\n<li>This projection could translate to potential revenues of approximately $500 million, helping shape pricing strategies and marketing focus.</li>\n</ul>\n<h2 id="2markettrendsanddynamics">2. Market Trends and Dynamics</h2>\n<h3 id="21growthrate">2.1 Growth Rate</h3>\n<ul>\n<li><strong>CAGR Insights</strong>: The Indian food service market is poised for growth, with projections suggesting a compound annual growth rate (CAGR) of 10-12% through 2028.</li>\n<li><strong>Consumer Behavior Shift</strong>: Increasing consumer awareness regarding health and sustainability is shifting preferences towards sustainable and locally sourced food options.</li>\n</ul>\n<h3 id="22urbanization">2.2 Urbanization</h3>\n<ul>\n<li>Growing urbanization, with projections of over 600 million urban residents by 2031, enhances the likelihood of increased demand for sustainable food delivery services.</li>\n</ul>\n<h3 id="23marketingstrategies">2.3 Marketing Strategies</h3>\n<ul>\n<li>It is essential to adapt marketing strategies to resonate with urban populations who prioritize sustainability.</li>\n<li>By leveraging targeted campaigns focused on eco-friendliness and local cuisine, businesses can optimize customer engagement.</li>\n</ul>\n<h3 id="24logisticsandpartnerships">2.4 Logistics and Partnerships</h3>\n<ul>\n<li>Successful sustainable food delivery operations will require efficient logistics and solid partnerships with local restaurants committed to sustainability. </li>\n</ul>\n<h2 id="3competitivelandscape">3. Competitive Landscape</h2>\n<h3 id="31identifyingcompetitors">3.1 Identifying Competitors</h3>\n<ul>\n<li>The competitive environment includes traditional food delivery companies, niche players, and other startups focused on sustainability.</li>\n<li>Important for entrants to conduct a thorough competitive analysis to identify unique value propositions.</li>\n</ul>\n<h3 id="32marketchallenges">3.2 Market Challenges</h3>\n<ul>\n<li>Competition and operational logistics could constrain the SOM.</li>\n<li>Companies need to develop innovative solutions to streamline operations while maintaining sustainability standards.</li>\n</ul>\n<h2 id="4consumerprofile">4. Consumer Profile</h2>\n<h3 id="41ecoconsciousconsumercharacteristics">4.1 Eco-Conscious Consumer Characteristics</h3>\n<ul>\n<li>Targeting consumers across various demographics enhances the overall potential market:</li>\n<li>Environmentally concerned individuals.</li>\n<li>Individuals willing to spend more for sustainable offerings.</li>\n<li>Health-conscious consumers looking for fresh and organic meal options.</li>\n</ul>\n<h2 id="5conclusionandrecommendations">5. Conclusion and Recommendations</h2>\n<h3 id="51marketpotential">5.1 Market Potential</h3>\n<p>The sustainable food delivery market in India represents a significant opportunity, enabled by increased urbanization and a burgeoning consumer preference for eco-friendly options. </p>\n<h3 id="52strategicinsights">5.2 Strategic Insights</h3>\n<ul>\n<li>Emphasize strong marketing strategies that highlight the sustainability aspect and unique offerings.</li>\n<li>Form partnerships with local restaurants to diversify the menu while ensuring sustainable sourcing practices.</li>\n<li>Focus on logistics optimization to create a seamless customer experience.</li>\n</ul>\n<h3 id="53futureoutlook">5.3 Future Outlook</h3>\n<ul>\n<li>Monitoring market trends on sustainability, consumer preferences, and the competitive landscape will be crucial for continued success. Scalable business strategies that leverage technology and innovation will be essential for long-term growth.</li>\n</ul>\n<hr />\n<p>This report provides a comprehensive assessment of the sustainable food delivery platform's market potential in India, highlighting key insights that stakeholders should consider for successful market entry and sustained growth.</p>`,
      creditsUsed: 10
    },
    {
      id: '2',
      actionId: '2',
      actionName: 'MVP Builder',
      status: 'completed' as const,
      timestamp: '2024-01-20T11:45:00Z',
      content: `# MVP Development Roadmap

## Core Features (Phase 1 - 3 months)
### Customer App:
- Restaurant discovery with sustainability ratings
- Eco-packaging options selection
- Carbon footprint tracking per order
- Delivery route optimization display

### Restaurant Dashboard:
- Sustainability metrics tracking
- Eco-packaging inventory management
- Customer feedback on green initiatives

### Delivery Platform:
- Route optimization for minimal emissions
- Electric vehicle integration
- Real-time carbon offset calculations

## Technical Architecture:
- **Frontend**: React Native for mobile apps
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Redis caching
- **Maps**: Google Maps API with custom routing
- **Payments**: Stripe with carbon offset integration

## Development Timeline:
- **Month 1**: Core ordering system
- **Month 2**: Sustainability features
- **Month 3**: Delivery optimization
- **Month 4**: Beta testing and refinement

## Estimated Costs:
- Development team: $180K
- Infrastructure: $15K
- Third-party integrations: $25K
- **Total MVP Cost**: $220K`,
      creditsUsed: 15
    },
    {
      id: '3',
      actionId: '3',
      actionName: 'Pitch Deck Generator',
      status: 'completed' as const,
      timestamp: '2024-01-20T14:20:00Z',
      content: `# EcoDelivery Pitch Deck

## Slide 1: Problem
🌍 **The food delivery industry generates 1.5B tons of packaging waste annually**
- 89% of delivery packaging is non-recyclable
- Average delivery creates 2.3kg CO2 emissions
- Consumers increasingly demand sustainable options

## Slide 2: Solution
🚀 **EcoDelivery: The world's first carbon-neutral food delivery platform**
- AI-optimized routing reduces emissions by 40%
- 100% compostable packaging partnerships
- Real-time carbon offset integration

## Slide 3: Market Opportunity
📈 **$45B TAM with 15.2% CAGR**
- 73% of consumers willing to pay 10-15% premium
- 156M potential users in target demographics
- First-mover advantage in sustainability space

## Slide 4: Business Model
💰 **Multiple Revenue Streams**
- Commission: 15-20% per order
- Sustainability premium: 5% additional
- Carbon offset marketplace: 2-3% transaction fee
- Restaurant sustainability consulting: $500-2K/month

## Slide 5: Traction
🎯 **Early Validation**
- 2,500 pre-registered users
- 45 restaurant partnerships signed
- $125K in pre-seed funding secured

## Slide 6: Financial Projections
📊 **5-Year Growth Plan**
- Year 1: $2.5M revenue, 50K orders
- Year 3: $45M revenue, 2M orders
- Year 5: $180M revenue, 12M orders
- Break-even: Month 18

## Slide 7: Team
👥 **Experienced Leadership**
- CEO: Former Uber Eats operations director
- CTO: Ex-Google Maps engineer
- CMO: Sustainability marketing expert

## Slide 8: Funding Ask
💵 **Seeking $2M Series A**
- 40% Product development
- 30% Market expansion
- 20% Team growth
- 10% Marketing & partnerships`,
      creditsUsed: 12
    },
    {
      id: '4',
      actionId: '5',
      actionName: 'Marketing Strategy',
      status: 'in_progress' as const,
      timestamp: '2024-01-20T15:00:00Z',
      content: `# Marketing Strategy (In Progress)

## Brand Positioning
"The conscious choice for conscious consumers"

## Go-to-Market Strategy
### Phase 1: Community Building (Months 1-3)
- Partner with environmental organizations
- Influencer collaborations with eco-lifestyle creators
- University campus pilot programs

### Phase 2: Market Penetration (Months 4-8)
- Targeted digital advertising in pilot cities
- Restaurant partnership announcements
- Sustainability impact reporting

## Customer Acquisition Channels
1. **Digital Marketing** (40% budget)
   - Instagram/TikTok campaigns
   - Google Ads for "sustainable delivery"
   - Content marketing on environmental blogs

2. **Partnerships** (30% budget)
   - Environmental NGO collaborations
   - Corporate sustainability programs
   - University partnerships

3. **PR & Events** (20% budget)
   - Earth Day activations
   - Sustainability conference presence
   - Local environmental events

4. **Referral Program** (10% budget)
   - Carbon credit rewards for referrals
   - Gamified sustainability challenges

## Success Metrics
- Customer Acquisition Cost (CAC): <$25
- Lifetime Value (LTV): >$150
- Monthly Active Users growth: 20%
- Brand awareness in target markets: 35%`,
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
                            {/* {result.content} */}
                            <div dangerouslySetInnerHTML={{ __html: result.content }} />
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