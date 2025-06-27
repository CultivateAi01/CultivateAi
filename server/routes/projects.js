import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all projects for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select(`
        *,
        agent_runs(
          id,
          status,
          credits_used,
          created_at,
          agents(name, icon)
        )
      `)
      .eq('profile_id', req.profile.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Calculate actions run for each project
    const projectsWithStats = projects.map(project => ({
      ...project,
      actionsRun: project.agent_runs?.length || 0,
      lastActivity: project.agent_runs?.length > 0 
        ? new Date(Math.max(...project.agent_runs.map(run => new Date(run.created_at)))).toISOString()
        : project.updated_at
    }));

    res.json({ projects: projectsWithStats });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        agent_runs(
          id,
          status,
          input_data,
          credits_used,
          execution_time_ms,
          error_message,
          created_at,
          updated_at,
          agents(id, name, icon, category, color),
          outputs(id, title, content, format, metadata, created_at)
        )
      `)
      .eq('id', id)
      .eq('profile_id', req.profile.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create new project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, startup_idea } = req.body;

    if (!title || !description || !startup_idea) {
      return res.status(400).json({ error: 'Title, description, and startup idea are required' });
    }

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        profile_id: req.profile.id,
        title,
        description,
        startup_idea,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ project });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startup_idea, status } = req.body;

    const { data: project, error } = await supabase
      .from('projects')
      .update({
        title,
        description,
        startup_idea,
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('profile_id', req.profile.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ project });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('profile_id', req.profile.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;