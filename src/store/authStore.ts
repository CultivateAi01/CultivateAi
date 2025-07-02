import { create } from 'zustand';
import { User } from '../types';

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
      
      // Clerk logout is handled by the useClerk hook in components
      // This is just for clearing local state
      
      // Force clear any remaining session data
      localStorage.clear();
      sessionStorage.clear();
      
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