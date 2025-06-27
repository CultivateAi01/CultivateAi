import React from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Subtle gradient overlay without interfering with global grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};