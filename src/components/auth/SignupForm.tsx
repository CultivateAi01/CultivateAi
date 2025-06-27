import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { authHelpers } from '../../lib/supabase';
import { apiClient } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthStore();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: authData, error: authError } = await authHelpers.signUp(data.email, data.password, data.name);
      if (authError) throw authError;
      
      if (authData.user) {
        // Get user profile from backend (it should be created automatically)
        try {
          const profileResponse = await apiClient.getProfile();
          setUser({
            id: authData.user.id,
            email: authData.user.email!,
            name: profileResponse.profile?.first_name || data.name,
            credits: profileResponse.credits?.balance || 100, // Welcome credits
            created_at: authData.user.created_at!
          });
        } catch (profileError) {
          console.error('Failed to fetch profile:', profileError);
          // Fallback to basic user data
          setUser({
            id: authData.user.id,
            email: authData.user.email!,
            name: data.name,
            credits: 100, // Welcome credits
            created_at: authData.user.created_at!
          });
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'Signup failed. Please try again.');
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
          <h2 className="text-3xl font-bold text-gradient mb-2">Join Cultivate.ai</h2>
          <p className="text-gray-400">Create your account and start building</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="Full name"
              className="input-glass w-full pl-12 pr-4 py-3 rounded-xl"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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
                  value: 8,
                  message: 'Password must be at least 8 characters'
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

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              type="password"
              placeholder="Confirm password"
              className="input-glass w-full pl-12 pr-4 py-3 rounded-xl"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};