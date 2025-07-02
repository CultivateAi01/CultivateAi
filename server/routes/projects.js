import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock data store (in real app, use database)
let projects = [];

// Get all projects for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Filter projects by user ID
    const userProjects = projects.filter(p => p.profile_id === req.auth.userId);
    
    // Calculate actions run for each project
    const projectsWithStats = userProjects.map(project => ({
      ...project,
      actionsRun: 0, // Mock data
      lastActivity: project.updated_at
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

    const project = projects.find(p => p.id === id && p.profile_id === req.auth.userId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Add mock agent runs data
    project.agent_runs = [];

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

    const project = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      profile_id: req.auth.userId,
      title,
      description,
      startup_idea,
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    projects.push(project);

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

    const projectIndex = projects.findIndex(p => p.id === id && p.profile_id === req.auth.userId);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      title: title || projects[projectIndex].title,
      description: description || projects[projectIndex].description,
      startup_idea: startup_idea || projects[projectIndex].startup_idea,
      status: status || projects[projectIndex].status,
      updated_at: new Date().toISOString()
    };

    res.json({ project: projects[projectIndex] });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id === id && p.profile_id === req.auth.userId);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects.splice(projectIndex, 1);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;