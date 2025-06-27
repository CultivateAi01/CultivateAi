import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all active agents
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

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

    // Verify project belongs to user
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', project_id)
      .eq('profile_id', req.profile.id)
      .single();

    if (projectError || !project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Get agent details
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agent_id)
      .eq('is_active', true)
      .single();

    if (agentError || !agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Check user credits
    const { data: credits, error: creditsError } = await supabase
      .from('credits')
      .select('balance')
      .eq('profile_id', req.profile.id)
      .single();

    if (creditsError || !credits || credits.balance < agent.cost) {
      return res.status(400).json({ error: 'Insufficient credits' });
    }

    // Create agent run record
    const { data: agentRun, error: runError } = await supabase
      .from('agent_runs')
      .insert({
        project_id,
        agent_id,
        profile_id: req.profile.id,
        status: 'running',
        input_data,
        credits_used: agent.cost
      })
      .select()
      .single();

    if (runError) {
      return res.status(400).json({ error: runError.message });
    }

    // Deduct credits
    await supabase
      .from('credits')
      .update({
        balance: credits.balance - agent.cost,
        total_used: supabase.sql`total_used + ${agent.cost}`,
        updated_at: new Date().toISOString()
      })
      .eq('profile_id', req.profile.id);

    // Create transaction record
    await supabase
      .from('transactions')
      .insert({
        profile_id: req.profile.id,
        type: 'usage',
        amount: -agent.cost,
        description: `Used ${agent.cost} credits for ${agent.name}`,
        agent_run_id: agentRun.id
      });

    // Simulate AI processing (in real app, this would call actual AI services)
    setTimeout(async () => {
      try {
        const mockOutput = generateMockOutput(agent, input_data);
        
        // Update agent run status
        await supabase
          .from('agent_runs')
          .update({
            status: 'completed',
            execution_time_ms: Math.floor(Math.random() * 5000) + 2000,
            updated_at: new Date().toISOString()
          })
          .eq('id', agentRun.id);

        // Create output record
        await supabase
          .from('outputs')
          .insert({
            agent_run_id: agentRun.id,
            project_id,
            profile_id: req.profile.id,
            title: `${agent.name} Analysis`,
            content: mockOutput,
            format: 'markdown'
          });

      } catch (error) {
        console.error('Agent processing error:', error);
        
        // Update agent run with error status
        await supabase
          .from('agent_runs')
          .update({
            status: 'failed',
            error_message: error.message,
            updated_at: new Date().toISOString()
          })
          .eq('id', agentRun.id);
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

    const { data: agentRun, error } = await supabase
      .from('agent_runs')
      .select(`
        *,
        agents(name, icon, category),
        outputs(id, title, content, format, created_at)
      `)
      .eq('id', id)
      .eq('profile_id', req.profile.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Agent run not found' });
    }

    res.json({ agentRun });
  } catch (error) {
    console.error('Agent run fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch agent run' });
  }
});

// Mock output generator (replace with actual AI integration)
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
Investment amount and use of funds.`,

    'Business Plan Generator': `# Comprehensive Business Plan

## Executive Summary
Strategic overview for: "${inputData.description || inputData}"

## Company Description
Mission, vision, and core values.

## Market Analysis
Industry overview and target market definition.

## Organization & Management
Team structure and key personnel.

## Products & Services
Detailed offering description and development roadmap.

## Marketing & Sales Strategy
Customer acquisition and retention plans.

## Financial Projections
5-year financial forecast with key assumptions.

## Funding Requirements
Capital needs and investment timeline.`,

    'Marketing Strategy': `# Marketing Strategy Plan

## Brand Positioning
Strategic positioning for: "${inputData.description || inputData}"

## Target Audience
Detailed customer personas and segments.

## Marketing Channels
- Digital marketing (${Math.floor(Math.random() * 40 + 30)}% of budget)
- Content marketing (${Math.floor(Math.random() * 30 + 20)}% of budget)
- Partnerships (${Math.floor(Math.random() * 20 + 15)}% of budget)
- Events & PR (${Math.floor(Math.random() * 15 + 10)}% of budget)

## Customer Acquisition Strategy
Multi-channel approach with measurable KPIs.

## Budget Allocation
Recommended marketing spend: $${Math.floor(Math.random() * 100 + 50)}K annually.

## Success Metrics
Key performance indicators and tracking methods.`,

    'Legal Advisor': `# Legal Structure & Compliance Guide

## Business Entity Recommendation
Optimal legal structure for: "${inputData.description || inputData}"

### Recommended Entity Type
LLC or C-Corporation based on growth plans and funding needs.

## Intellectual Property Strategy
- Trademark protection for brand assets
- Copyright considerations for content
- Patent evaluation for unique innovations

## Compliance Requirements
Industry-specific regulations and ongoing obligations.

## Contract Templates
Essential agreements for operations:
- Terms of Service
- Privacy Policy
- Employment agreements
- Vendor contracts

## Risk Management
Liability protection and insurance recommendations.`
  };

  return templates[agent.name] || `# ${agent.name} Analysis\n\nDetailed analysis for your project: "${inputData.description || inputData}"\n\nThis is a comprehensive report generated by our AI system.`;
}

export default router;