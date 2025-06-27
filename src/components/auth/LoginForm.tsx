import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { authHelpers } from '../../lib/supabase';
import { apiClient } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: authData, error: authError } = await authHelpers.signIn(data.email, data.password);
      if (authError) throw authError;
      
      if (authData.user) {
        // Get user profile from backend
        try {
          const profileResponse = await apiClient.getProfile();
          setUser({
            id: authData.user.id,
            email: authData.user.email!,
            name: profileResponse.profile?.first_name || authData.user.user_metadata?.name || 'User',
            credits: profileResponse.credits?.balance || 0,
            created_at: authData.user.created_at!
          });
        } catch (profileError) {
          console.error('Failed to fetch profile:', profileError);
          // Fallback to basic user data
          setUser({
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.user_metadata?.name || 'User',
            credits: 0,
            created_at: authData.user.created_at!
          });
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to continue to Cultivate.ai</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder="Email address"
              className="input-glass w-full pl-12 pr-4 py-3 rounded-xl"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input-glass w-full pl-12 pr-12 py-3 rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};