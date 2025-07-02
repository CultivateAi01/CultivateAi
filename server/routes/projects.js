import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock data for development
let mockProjects = [
  {
    id: '1',
    profile_id: 'user_123',
    title: 'EcoDelivery App',
    description: 'Sustainable food delivery platform',
    startup_idea: 'A food delivery service that focuses on eco-friendly packaging and carbon-neutral delivery',
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    actionsRun: 3,
    lastActivity: '2 hours ago'
  }
];

// Get all projects for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Filter projects for current user
    const userProjects = mockProjects.filter(p => p.profile_id === req.auth.userId);
    
    res.json({ projects: userProjects });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = mockProjects.find(p => p.id === id && p.profile_id === req.auth.userId);

    if (!project) {
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

    const newProject = {
      id: Date.now().toString(), // Simple ID generation for mock
      profile_id: req.auth.userId,
      title,
      description,
      startup_idea,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      actionsRun: 0,
      lastActivity: 'Just now'
    };

    mockProjects.push(newProject);

    res.status(201).json({ project: newProject });
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

    const projectIndex = mockProjects.findIndex(p => p.id === id && p.profile_id === req.auth.userId);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      title: title || mockProjects[projectIndex].title,
      description: description || mockProjects[projectIndex].description,
      startup_idea: startup_idea || mockProjects[projectIndex].startup_idea,
      status: status || mockProjects[projectIndex].status,
      updated_at: new Date().toISOString()
    };

    res.json({ project: mockProjects[projectIndex] });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = mockProjects.findIndex(p => p.id === id && p.profile_id === req.auth.userId);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    mockProjects.splice(projectIndex, 1);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;