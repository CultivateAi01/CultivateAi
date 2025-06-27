import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  gradient = false
}) => {
  const baseClasses = gradient 
    ? 'rounded-2xl p-6 border border-white/10'
    : 'glass-card rounded-2xl p-6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};