import { supabase } from '../index.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Get user profile from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    // If profile doesn't exist, create it
    if (!profile) {
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          clerk_id: user.id,
          email: user.email,
          first_name: user.user_metadata?.name || 'User',
          last_name: ''
        })
        .select()
        .single();

      if (createError) {
        console.error('Profile creation error:', createError);
        return res.status(500).json({ error: 'Failed to create user profile' });
      }

      // Create initial credits record
      await supabase
        .from('credits')
        .insert({
          profile_id: newProfile.id,
          balance: 100, // Welcome credits
          total_purchased: 100
        });

      req.user = user;
      req.profile = newProfile;
    } else {
      req.user = user;
      req.profile = profile;
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({ error: 'Token verification failed' });
  }
};

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    req.profile = null;
    return next();
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (!error && user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('clerk_id', user.id)
        .single();

      req.user = user;
      req.profile = profile;
    } else {
      req.user = null;
      req.profile = null;
    }
  } catch (error) {
    req.user = null;
    req.profile = null;
  }

  next();
};