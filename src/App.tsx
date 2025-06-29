import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useAuthStore } from './store/authStore';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Actions } from './pages/Actions';
import { StartupDetail } from './pages/StartupDetail';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Landing } from './pages/Landing';

function App() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
      
      if (isSignedIn && user) {
        // Set user data from Clerk
        setUser({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          name: user.fullName || user.firstName || 'User',
          credits: 100, // Default credits - this should be fetched from your backend
          created_at: user.createdAt?.toISOString() || new Date().toISOString()
        });
      } else {
        setUser(null);
      }
    }
  }, [isLoaded, isSignedIn, user, setUser, setLoading]);

  // Show loading screen while Clerk is initializing
  if (!isLoaded) {
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
            <Route path="/" element={isSignedIn ? <Navigate to="/home" replace /> : <Landing />} />
            <Route path="/login" element={isSignedIn ? <Navigate to="/home" replace /> : <Login />} />
            <Route path="/signup" element={isSignedIn ? <Navigate to="/home" replace /> : <Signup />} />
            
            {/* Protected routes */}
            {isSignedIn ? (
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