import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum loading time in ms
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  minDuration = 2000 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const checkLoadingComplete = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          onComplete?.();
        }, 800); // Wait for fade out animation
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      checkLoadingComplete();
    } else {
      window.addEventListener('load', checkLoadingComplete);
      return () => window.removeEventListener('load', checkLoadingComplete);
    }

    // Show content after a brief delay
    const contentTimer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(contentTimer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          {/* Gradient effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center gap-1"
                >
                  {/* Letters before U icon */}
                  <div className="flex">
                    {['U', 'n', 'C'].map((letter, index) => (
                      <motion.span
                        key={`before-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.2 + index * 0.1,
                          ease: "easeOut"
                        }}
                        className="text-6xl md:text-7xl lg:text-8xl font-bold text-white"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>

                  {/* Animated Technical U Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotateY: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 360,
                    }}
                    transition={{ 
                      opacity: { duration: 0.4, delay: 0.5 },
                      scale: { duration: 0.6, delay: 0.5, ease: "easeOut" },
                      rotateY: { 
                        duration: 3, 
                        delay: 0.8, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    className="mx-2 relative"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative">
                      {/* Technical U Icon SVG */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' }}
                      >
                        {/* Construction lines */}
                        <defs>
                          <pattern id="constructionGrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                          </pattern>
                          
                          {/* Gradient for the U */}
                          <linearGradient id="uGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="50%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#EC4899" />
                          </linearGradient>
                          
                          {/* Glow effect */}
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        
                        {/* Background construction grid */}
                        <rect width="100" height="100" fill="url(#constructionGrid)" opacity="0.3" />
                        
                        {/* Technical construction lines */}
                        <g stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" fill="none">
                          {/* Outer frame */}
                          <rect x="10" y="10" width="80" height="80" strokeDasharray="2,2" />
                          
                          {/* Center guidelines */}
                          <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="1,1" />
                          <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="1,1" />
                          
                          {/* Corner markers */}
                          <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.3)" />
                          <circle cx="80" cy="20" r="1" fill="rgba(255,255,255,0.3)" />
                          <circle cx="20" cy="80" r="1" fill="rgba(255,255,255,0.3)" />
                          <circle cx="80" cy="80" r="1" fill="rgba(255,255,255,0.3)" />
                          
                          {/* Dimension lines */}
                          <path d="M 15 15 L 25 15 M 20 12 L 20 18" opacity="0.4" />
                          <path d="M 75 15 L 85 15 M 80 12 L 80 18" opacity="0.4" />
                        </g>
                        
                        {/* Main U shape with technical styling */}
                        <g filter="url(#glow)">
                          {/* Outer U stroke */}
                          <path
                            d="M 25 20 L 25 55 Q 25 75 50 75 Q 75 75 75 55 L 75 20"
                            fill="none"
                            stroke="url(#uGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                          {/* Inner U for depth */}
                          <path
                            d="M 30 25 L 30 55 Q 30 70 50 70 Q 70 70 70 55 L 70 25"
                            fill="none"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          
                          {/* Technical details */}
                          <circle cx="25" cy="20" r="2" fill="url(#uGradient)" />
                          <circle cx="75" cy="20" r="2" fill="url(#uGradient)" />
                          <circle cx="50" cy="75" r="2" fill="url(#uGradient)" />
                        </g>
                        
                        {/* Measurement annotations */}
                        <g fill="rgba(255,255,255,0.4)" fontSize="4" textAnchor="middle">
                          <text x="50" y="8">U</text>
                          <text x="8" y="52" transform="rotate(-90 8 52)">H</text>
                          <text x="92" y="52" transform="rotate(90 92 52)">W</text>
                        </g>
                        
                        {/* Animated construction points */}
                        <g>
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="1"
                            fill="#3B82F6"
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </g>
                      </svg>
                    </div>
                  </motion.div>

                  {/* Letters after U icon */}
                  <div className="flex">
                    {['u', 'b', 'e', 'd'].map((letter, index) => (
                      <motion.span
                        key={`after-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: 0.5 + index * 0.1,
                          ease: "easeOut"
                        }}
                        className="text-6xl md:text-7xl lg:text-8xl font-bold text-white"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            >
              
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};