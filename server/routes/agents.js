import express from 'express';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Mock agents data
const agents = [
  {
    id: 'agent_market_research',
    name: 'Market Research',
    description: 'Comprehensive market analysis, competitor research, and industry insights',
    category: 'research',
    cost: 10,
    icon: 'TrendingUp',
    is_active: true,
    output_example: 'Detailed market analysis including TAM, SAM, competitive landscape, and growth projections.',
    prompt_template: 'Analyze the market for this startup idea: {input}. Provide detailed market size, target demographics, competitive landscape, and market entry strategy.'
  },
  {
    id: 'agent_mvp_builder',
    name: 'MVP Builder',
    description: 'Technical architecture, feature prioritization, and development roadmap',
    category: 'development',
    cost: 15,
    icon: 'Rocket',
    is_active: true,
    output_example: 'Complete MVP development plan with core features, technical stack, timeline, and cost estimates.',
    prompt_template: 'Create an MVP development plan for: {input}. Include core features, technical architecture, development timeline, and cost estimation.'
  },
  {
    id: 'agent_pitch_deck',
    name: 'Pitch Deck Generator',
    description: 'Professional investor presentation with compelling storytelling',
    category: 'validation',
    cost: 12,
    icon: 'Presentation',
    is_active: true,
    output_example: 'Investor-ready pitch deck with problem, solution, market opportunity, business model, and funding ask.',
    prompt_template: 'Generate a comprehensive pitch deck for: {input}. Include problem, solution, market opportunity, business model, traction, team, and funding ask.'
  },
  {
    id: 'agent_business_plan',
    name: 'Business Plan Generator',
    description: 'Comprehensive business strategy, financial projections, and execution plan',
    category: 'validation',
    cost: 20,
    icon: 'FileText',
    is_active: false,
    output_example: 'Complete business plan with executive summary, market analysis, financial projections, and operational strategy.',
    prompt_template: 'Create a detailed business plan for: {input}. Include executive summary, market analysis, financial projections, and operational strategy.'
  },
  {
    id: 'agent_marketing',
    name: 'Marketing Strategy',
    description: 'Customer acquisition, brand positioning, and growth marketing tactics',
    category: 'marketing',
    cost: 10,
    icon: 'Target',
    is_active: false,
    output_example: 'Comprehensive marketing strategy with brand positioning, target audience, channels, and acquisition tactics.',
    prompt_template: 'Develop a marketing strategy for: {input}. Include brand positioning, target audience, marketing channels, and customer acquisition plan.'
  },
  {
    id: 'agent_legal',
    name: 'Legal Advisor',
    description: 'Entity structure, intellectual property, and compliance guidance',
    category: 'legal',
    cost: 15,
    icon: 'Scale',
    is_active: false,
    output_example: 'Legal guidance including business entity recommendations, IP strategy, and compliance requirements.',
    prompt_template: 'Provide legal guidance for: {input}. Include business entity recommendations, intellectual property strategy, and compliance requirements.'
  }
];

// Mock agent runs store
let agentRuns = [];

// Get all active agents
router.get('/', optionalAuth, async (req, res) => {
  try {
    res.json({ agents });
  } catch (error) {
    console.error('Agents fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// Run agent action
router.post('/run', authenticateToken, async (req, res) => {
  try {
    const { project_id, agent_id, input_data } = req.body;

    if (!project_id || !agent_id || !input_data) {
      return res.status(400).json({ error: 'Project ID, agent ID, and input data are required' });
    }

    // Get agent details
    const agent = agents.find(a => a.id === agent_id);

    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    if (!agent.is_active) {
      return res.status(400).json({ error: 'Agent is not active' });
    }

    // Check user credits (mock - always allow for now)
    const userCredits = 100; // Mock credits

    if (userCredits < agent.cost) {
      return res.status(400).json({ error: 'Insufficient credits' });
    }

    // Create agent run record
    const agentRun = {
      id: `run_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      project_id,
      agent_id,
      profile_id: req.auth.userId,
      status: 'running',
      input_data,
      credits_used: agent.cost,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    agentRuns.push(agentRun);

    // Simulate AI processing
    setTimeout(async () => {
      try {
        const mockOutput = generateMockOutput(agent, input_data);
        
        // Update agent run status
        const runIndex = agentRuns.findIndex(r => r.id === agentRun.id);
        if (runIndex !== -1) {
          agentRuns[runIndex] = {
            ...agentRuns[runIndex],
            status: 'completed',
            execution_time_ms: Math.floor(Math.random() * 5000) + 2000,
            updated_at: new Date().toISOString()
          };
        }

        // In a real app, you would also create an output record here

      } catch (error) {
        console.error('Agent processing error:', error);
        
        // Update agent run with error status
        const runIndex = agentRuns.findIndex(r => r.id === agentRun.id);
        if (runIndex !== -1) {
          agentRuns[runIndex] = {
            ...agentRuns[runIndex],
            status: 'failed',
            error_message: error.message,
            updated_at: new Date().toISOString()
          };
        }
      }
    }, 3000); // 3 second delay to simulate processing

    res.status(201).json({ 
      message: 'Agent run started successfully',
      agentRun: {
        ...agentRun,
        agent
      }
    });
  } catch (error) {
    console.error('Agent run error:', error);
    res.status(500).json({ error: 'Failed to run agent' });
  }
});

// Get agent run status
router.get('/runs/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const agentRun = agentRuns.find(r => r.id === id && r.profile_id === req.auth.userId);

    if (!agentRun) {
      return res.status(404).json({ error: 'Agent run not found' });
    }

    // Add agent details
    const agent = agents.find(a => a.id === agentRun.agent_id);
    agentRun.agents = agent;

    res.json({ agentRun });
  } catch (error) {
    console.error('Agent run fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch agent run' });
  }
});

// Mock output generator
function generateMockOutput(agent, inputData) {
  const templates = {
    'Market Research': `# Market Research Analysis

## Market Overview
Based on your idea: "${inputData.description || inputData}", here's a comprehensive market analysis.

### Market Size & Opportunity
- Total Addressable Market (TAM): $${Math.floor(Math.random() * 50 + 10)}B
- Serviceable Addressable Market (SAM): $${Math.floor(Math.random() * 15 + 5)}B
- Projected CAGR: ${Math.floor(Math.random() * 20 + 5)}%

### Target Demographics
- Primary audience: Ages ${Math.floor(Math.random() * 20 + 25)}-${Math.floor(Math.random() * 20 + 45)}
- Income level: $${Math.floor(Math.random() * 50 + 40)}K+ annually
- Geographic focus: Urban and suburban markets

### Competitive Analysis
Key competitors identified with market positioning and differentiation opportunities.

### Market Entry Strategy
Recommended approach for market penetration and customer acquisition.`,

    'MVP Builder': `# MVP Development Plan

## Core Features
Essential features for your minimum viable product based on: "${inputData.description || inputData}"

### Phase 1 Features (Months 1-2)
- User authentication and onboarding
- Core functionality implementation
- Basic user interface

### Phase 2 Features (Months 3-4)
- Advanced features and integrations
- Analytics and reporting
- Performance optimization

## Technical Architecture
- Frontend: React/React Native
- Backend: Node.js with Express
- Database: PostgreSQL
- Hosting: AWS/Vercel

## Development Timeline
Estimated ${Math.floor(Math.random() * 6 + 3)} months for full MVP completion.

## Cost Estimation
Total development cost: $${Math.floor(Math.random() * 200 + 100)}K`,

    'Pitch Deck Generator': `# Investor Pitch Deck

## Slide Structure for: "${inputData.description || inputData}"

### Slide 1: Problem
Clear articulation of the market problem you're solving.

### Slide 2: Solution
Your unique approach and value proposition.

### Slide 3: Market Opportunity
Size, growth potential, and target segments.

### Slide 4: Product Demo
Visual representation of your solution.

### Slide 5: Business Model
Revenue streams and monetization strategy.

### Slide 6: Traction
Current progress and key metrics.

### Slide 7: Competition
Competitive landscape and differentiation.

### Slide 8: Team
Founding team and key advisors.

### Slide 9: Financials
Revenue projections and key metrics.

### Slide 10: Funding Ask
Investment amount and use of funds.`
  };

  return templates[agent.name] || `# ${agent.name} Analysis\n\nDetailed analysis for your project: "${inputData.description || inputData}"\n\nThis is a comprehensive report generated by our AI system.`;
}

export default router;