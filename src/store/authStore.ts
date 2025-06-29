import { create } from 'zustand';
import { useAuth } from '@clerk/clerk-react';

interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  created_at: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    try {
      // Clear user from store immediately
      set({ user: null });
      
      // Import Clerk's signOut function dynamically
      const { useAuth } = await import('@clerk/clerk-react');
      
      // Note: This approach won't work directly in Zustand
      // We'll need to handle logout from components that have access to Clerk hooks
      console.log('Logout should be handled from a component with Clerk hooks');
      
      // Force reload to ensure clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear local state and redirect
      set({ user: null });
      window.location.href = '/';
    }
  },
}));