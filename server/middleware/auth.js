import { ClerkExpressRequireAuth } from '@clerk/express';

// Middleware to require authentication
export const authenticateToken = ClerkExpressRequireAuth();

// Optional auth middleware (doesn't require authentication)
export const optionalAuth = (req, res, next) => {
  // For optional auth, we'll just pass through
  // Clerk user data will be available in req.auth if user is signed in
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