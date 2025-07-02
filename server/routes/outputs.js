import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock outputs data
let outputs = [];

// Get outputs for a project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.auth.userId;

    // Filter outputs by project and user
    const projectOutputs = outputs.filter(o => 
      o.project_id === projectId && o.profile_id === userId
    );

    res.json({ outputs: projectOutputs });
  } catch (error) {
    console.error('Outputs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch outputs' });
  }
});

// Get single output
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.auth.userId;

    const output = outputs.find(o => o.id === id && o.profile_id === userId);

    if (!output) {
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
    const userId = req.auth.userId;

    const output = outputs.find(o => o.id === id && o.profile_id === userId);

    if (!output) {
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