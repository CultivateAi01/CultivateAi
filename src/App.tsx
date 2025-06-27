import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Actions } from './pages/Actions';
import { StartupDetail } from './pages/StartupDetail';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Landing } from './pages/Landing';

function App() {
  const { user, setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Set basic user data from session
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            credits: 100, // Default credits
            created_at: session.user.created_at!
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
      } else if (event === 'SIGNED_IN' && session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          credits: 100, // Default credits
          created_at: session.user.created_at!
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black relative flex items-center justify-center">
        {/* Global grid background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="relative z-10 animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Global grid background for all pages */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      <Router>
        <div className="relative z-10">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={user ? <Navigate to="/home" replace /> : <Landing />} />
            <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <Signup />} />
            
            {/* Protected routes */}
            {user ? (
              <Route path="/*" element={
                <>
                  <Header />
                  <main className="pt-20">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                      <Routes>
                        <Route path="/home" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Navigate to="/home" replace />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/actions" element={<Actions />} />
                        <Route path="/startup/:id" element={<StartupDetail />} />
                        <Route path="/credits" element={<div className="text-white">Credits page coming soon</div>} />
                        <Route path="/settings" element={<div className="text-white">Settings page coming soon</div>} />
                        <Route path="/help" element={<div className="text-white">Help page coming soon</div>} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                      </Routes>
                    </div>
                  </main>
                </>
              } />
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;