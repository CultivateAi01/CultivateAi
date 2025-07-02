import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // In a real app, you would fetch user profile from your database
    // For now, return mock data based on Clerk user
    const profile = {
      id: req.auth.userId,
      clerk_id: req.auth.userId,
      email: req.user.email || 'user@example.com',
      first_name: req.user.firstName || 'User',
      last_name: req.user.lastName || '',
      avatar_url: req.user.imageUrl || null
    };

    const credits = {
      balance: 100,
      total_purchased: 100,
      total_used: 0
    };

    res.json({
      user: req.user,
      profile: profile,
      credits: credits
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { first_name, last_name, avatar_url } = req.body;

    // In a real app, you would update the profile in your database
    const profile = {
      id: req.auth.userId,
      clerk_id: req.auth.userId,
      email: req.user.email || 'user@example.com',
      first_name: first_name || req.user.firstName || 'User',
      last_name: last_name || req.user.lastName || '',
      avatar_url: avatar_url || req.user.imageUrl || null,
      updated_at: new Date().toISOString()
    };

    res.json({ profile });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;