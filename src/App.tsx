import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { clerkPubKey } from './lib/clerk';
import { useAuthStore } from './store/authStore';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Actions } from './pages/Actions';
import { StartupDetail } from './pages/StartupDetail';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Landing } from './pages/Landing';

// Component to sync Clerk user with our auth store
const AuthSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (isLoaded) {
      if (clerkUser) {
        setUser({
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: clerkUser.fullName || clerkUser.firstName || 'User',
          credits: 100, // Default credits - will be synced from backend
          created_at: clerkUser.createdAt?.toISOString() || new Date().toISOString()
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [clerkUser, isLoaded, setUser, setLoading]);

  return <>{children}</>;
};

function AppContent() {
  const { isLoading } = useAuthStore();

  // Show loading screen while Clerk is initializing
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
            <Route path="/" element={
              <SignedOut>
                <Landing />
              </SignedOut>
            } />
            <Route path="/login" element={
              <SignedOut>
                <Login />
              </SignedOut>
            } />
            <Route path="/signup" element={
              <SignedOut>
                <Signup />
              </SignedOut>
            } />
            
            {/* Protected routes */}
            <Route path="/*" element={
              <SignedIn>
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
              </SignedIn>
            } />
            
            {/* Redirect signed in users from public routes */}
            <Route path="*" element={
              <SignedIn>
                <Navigate to="/home" replace />
              </SignedIn>
            } />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AuthSync>
        <AppContent />
      </AuthSync>
    </ClerkProvider>
  );
}

export default App;