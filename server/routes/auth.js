import express from 'express';
import { supabase } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    if (authData.user) {
      // Create profile in database
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          clerk_id: authData.user.id,
          email: authData.user.email,
          first_name: firstName,
          last_name: lastName
        })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        return res.status(500).json({ error: 'Failed to create user profile' });
      }

      // Create initial credits record
      await supabase
        .from('credits')
        .insert({
          profile_id: profile.id,
          balance: 100, // Welcome credits
          total_purchased: 100
        });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          profile: profile
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Get user credits
    const { data: credits, error: creditsError } = await supabase
      .from('credits')
      .select('*')
      .eq('profile_id', req.profile.id)
      .single();

    if (creditsError) {
      console.error('Credits fetch error:', creditsError);
    }

    res.json({
      user: req.user,
      profile: req.profile,
      credits: credits || { balance: 0, total_purchased: 0, total_used: 0 }
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

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        avatar_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.profile.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;