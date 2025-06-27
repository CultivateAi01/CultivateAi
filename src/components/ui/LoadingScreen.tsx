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
                  {/* Letters before cube */}
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

                  {/* Animated Cube */}
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
                        duration: 2, 
                        delay: 0.8, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                    className="mx-2 relative"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative transform-gpu">
                      {/* Cube faces */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform rotateY-0 translateZ-6" />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg transform rotateY-90 translateZ-6" />
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg transform rotateY-180 translateZ-6" />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg transform rotateY-270 translateZ-6" />
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg transform rotateX-90 translateZ-6" />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg transform rotateX-270 translateZ-6" />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-50 animate-pulse" />
                    </div>
                  </motion.div>

                  {/* Letters after cube */}
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
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/60 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};