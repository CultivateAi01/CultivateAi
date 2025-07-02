import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get outputs for a project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project belongs to user
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .eq('profile_id', req.profile.id)
      .single();

    if (projectError || !project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { data: outputs, error } = await supabase
      .from('outputs')
      .select(`
        *,
        agent_runs(
          id,
          status,
          credits_used,
          execution_time_ms,
          agents(id, name, icon, category)
        )
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ outputs: outputs || [] });
  } catch (error) {
    console.error('Outputs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch outputs' });
  }
});

// Get single output
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: output, error } = await supabase
      .from('outputs')
      .select(`
        *,
        agent_runs(
          id,
          status,
          input_data,
          credits_used,
          execution_time_ms,
          agents(id, name, icon, category)
        )
      `)
      .eq('id', id)
      .eq('profile_id', req.profile.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Output not found' });
    }

    res.json({ output });
  } catch (error) {
    console.error('Output fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch output' });
  }
});

// Export output as different formats
router.get('/:id/export/:format', authenticateToken, async (req, res) => {
  try {
    const { id, format } = req.params;

    const { data: output, error } = await supabase
      .from('outputs')
      .select('*')
      .eq('id', id)
      .eq('profile_id', req.profile.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Output not found' });
    }

    switch (format.toLowerCase()) {
      case 'markdown':
        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename="${output.title}.md"`);
        res.send(output.content);
        break;
      
      case 'txt':
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', `attachment; filename="${output.title}.txt"`);
        res.send(output.content);
        break;
      
      case 'json':
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="${output.title}.json"`);
        res.json({
          title: output.title,
          content: output.content,
          metadata: output.metadata,
          created_at: output.created_at
        });
        break;
      
      default:
        res.status(400).json({ error: 'Unsupported export format' });
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export output' });
  }
});

export default router;