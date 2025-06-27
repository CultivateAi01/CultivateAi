import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Import routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import agentRoutes from './routes/agents.js';
import creditRoutes from './routes/credits.js';
import outputRoutes from './routes/outputs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Validate required environment variables
const requiredEnvVars = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
};

// Check for missing or placeholder environment variables
const missingVars = [];
const placeholderVars = [];

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    missingVars.push(key);
  } else if (value.includes('your-') || value === 'your-project-url' || value === 'your-anon-key' || value === 'your-service-role-key') {
    placeholderVars.push(key);
  }
});

if (missingVars.length > 0 || placeholderVars.length > 0) {
  console.error('❌ Environment configuration error:');
  
  if (missingVars.length > 0) {
    console.error(`Missing environment variables: ${missingVars.join(', ')}`);
  }
  
  if (placeholderVars.length > 0) {
    console.error(`Placeholder values detected in: ${placeholderVars.join(', ')}`);
    console.error('Please update your .env file with actual values from your Supabase project.');
  }
  
  console.error('\n📝 To fix this:');
  console.error('1. Copy .env.example to .env');
  console.error('2. Replace placeholder values with your actual Supabase project credentials');
  console.error('3. Get your credentials from: https://app.supabase.com/project/[your-project]/settings/api');
  
  process.exit(1);
}

// Initialize Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : [
        'http://localhost:5173', 
        'http://localhost:3000',
        'https://localhost:5173',
        'https://localhost:3000'
      ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/outputs', outputRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`✅ Supabase connected to: ${process.env.SUPABASE_URL}`);
});