/*
  # Create UnCubed Database Schema

  1. New Tables
    - `profiles` - User profiles linked to Supabase auth
    - `projects` - User startup projects
    - `agents` - AI agents/tools available
    - `agent_runs` - Execution records of AI agents
    - `outputs` - Generated content from AI agents
    - `credits` - User credit balances
    - `transactions` - Credit transaction history

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  startup_idea text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  cost integer NOT NULL DEFAULT 0,
  icon text NOT NULL DEFAULT 'FileText',
  is_active boolean DEFAULT true,
  slug text,
  agent_url text,
  output_example text,
  prompt_template text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agent_runs table
CREATE TABLE IF NOT EXISTS agent_runs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id),
  profile_id uuid REFERENCES profiles(id),
  status text DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  input_data jsonb NOT NULL,
  execution_time_ms integer,
  error_message text,
  credits_used integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create outputs table
CREATE TABLE IF NOT EXISTS outputs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_run_id uuid REFERENCES agent_runs(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  profile_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  content text NOT NULL,
  format text DEFAULT 'markdown' CHECK (format IN ('markdown', 'html', 'json')),
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create credits table
CREATE TABLE IF NOT EXISTS credits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  balance integer DEFAULT 0,
  total_purchased integer DEFAULT 0,
  total_used integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES profiles(id),
  type text NOT NULL CHECK (type IN ('purchase', 'usage', 'refund')),
  amount integer NOT NULL,
  description text NOT NULL,
  stripe_payment_intent_id text,
  agent_run_id uuid REFERENCES agent_runs(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = clerk_id);

-- Create policies for projects
CREATE POLICY "Users can read own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can create own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can delete own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

-- Create policies for agents (public read)
CREATE POLICY "Anyone can read agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for agent_runs
CREATE POLICY "Users can read own agent runs"
  ON agent_runs
  FOR SELECT
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can create own agent runs"
  ON agent_runs
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own agent runs"
  ON agent_runs
  FOR UPDATE
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

-- Create policies for outputs
CREATE POLICY "Users can read own outputs"
  ON outputs
  FOR SELECT
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can create own outputs"
  ON outputs
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

-- Create policies for credits
CREATE POLICY "Users can read own credits"
  ON credits
  FOR SELECT
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can update own credits"
  ON credits
  FOR UPDATE
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

-- Create policies for transactions
CREATE POLICY "Users can read own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));

CREATE POLICY "Users can create own transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE clerk_id = auth.uid()::text));