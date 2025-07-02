import { ClerkProvider } from '@clerk/clerk-react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

export { ClerkProvider, clerkPubKey };

// Auth helpers for Clerk
export const authHelpers = {
  // Clerk handles sign up automatically through components
  signUp: async (email: string, password: string, name: string) => {
    // This will be handled by Clerk's SignUp component
    throw new Error('Use Clerk SignUp component instead');
  },

  signIn: async (email: string, password: string) => {
    // This will be handled by Clerk's SignIn component
    throw new Error('Use Clerk SignIn component instead');
  },

  signOut: async () => {
    // This will be handled by Clerk's useClerk hook
    throw new Error('Use Clerk useClerk hook instead');
  },

  getCurrentUser: async () => {
    // This will be handled by Clerk's useUser hook
    throw new Error('Use Clerk useUser hook instead');
  }
};