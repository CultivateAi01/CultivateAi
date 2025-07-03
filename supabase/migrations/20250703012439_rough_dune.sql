/*
  # Seed AI Agents

  1. Insert default AI agents
    - Market Research
    - MVP Builder
    - Pitch Deck Generator
    - Business Plan Generator
    - Marketing Strategy
    - Legal Advisor
*/

INSERT INTO agents (name, description, category, cost, prompt_template, icon) VALUES
(
  'Market Research',
  'Comprehensive market analysis, competitor research, and industry insights',
  'research',
  10,
  'Analyze the market for this startup idea: {input}. Provide detailed market size, target demographics, competitive landscape, and market entry strategy.',
  'TrendingUp'
),
(
  'MVP Builder',
  'Technical architecture, feature prioritization, and development roadmap',
  'development',
  15,
  'Create an MVP development plan for: {input}. Include core features, technical architecture, development timeline, and cost estimation.',
  'Rocket'
),
(
  'Pitch Deck Generator',
  'Professional investor presentation with compelling storytelling',
  'validation',
  12,
  'Generate a comprehensive pitch deck for: {input}. Include problem, solution, market opportunity, business model, traction, team, and funding ask.',
  'Presentation'
),
(
  'Business Plan Generator',
  'Comprehensive business strategy, financial projections, and execution plan',
  'validation',
  20,
  'Create a detailed business plan for: {input}. Include executive summary, market analysis, financial projections, and operational strategy.',
  'FileText'
),
(
  'Marketing Strategy',
  'Customer acquisition, brand positioning, and growth marketing tactics',
  'marketing',
  10,
  'Develop a marketing strategy for: {input}. Include brand positioning, target audience, marketing channels, and customer acquisition plan.',
  'Target'
),
(
  'Legal Advisor',
  'Entity structure, intellectual property, and compliance guidance',
  'legal',
  15,
  'Provide legal guidance for: {input}. Include business entity recommendations, intellectual property strategy, and compliance requirements.',
  'Scale'
);