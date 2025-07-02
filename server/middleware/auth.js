import jwt from 'jsonwebtoken';

// Middleware to require authentication with Clerk JWT
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    // Verify Clerk JWT token
    const decoded = jwt.verify(token, process.env.CLERK_SECRET_KEY);
    
    if (!decoded || !decoded.sub) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    // Get user profile from database
    const { getUserProfile } = await import('./auth.js');
    const profile = await getUserProfile(decoded.sub);

    req.auth = {
      userId: decoded.sub,
      sessionId: decoded.sid,
      ...decoded
    };
    req.user = decoded;
    req.profile = profile;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({ error: 'Token verification failed' });
  }
};

// Optional auth middleware (doesn't require authentication)
export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.auth = null;
    req.user = null;
    req.profile = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.CLERK_SECRET_KEY);
    
    if (decoded && decoded.sub) {
      const { getUserProfile } = await import('./auth.js');
      const profile = await getUserProfile(decoded.sub);

      req.auth = {
        userId: decoded.sub,
        sessionId: decoded.sid,
        ...decoded
      };
      req.user = decoded;
      req.profile = profile;
    } else {
      req.auth = null;
      req.user = null;
      req.profile = null;
    }
  } catch (error) {
    req.auth = null;
    req.user = null;
    req.profile = null;
  }

  next();
};

// Helper to get user profile from database
export const getUserProfile = async (clerkUserId) => {
  // This would typically query your database
  // For now, return a mock profile
  return {
    id: clerkUserId,
    clerk_id: clerkUserId,
    email: 'user@example.com',
    first_name: 'User',
    last_name: '',
    credits: 100
  };
};