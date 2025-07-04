import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [idea, setIdea] = useState('');
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height based on scrollHeight with min and max constraints
      const newHeight = Math.max(60, Math.min(200, textarea.scrollHeight));
      textarea.style.height = `${newHeight}px`;
      
      // Enable scrolling if content exceeds max height
      if (textarea.scrollHeight > 200) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [idea]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Clean background that starts and ends with black */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
        
        {/* Fade to black at bottom for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main headline - Further reduced sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
            <span className="text-white">Turn your </span>
            <span className="relative">
              <span className="text-white">
                ideas
              </span>
            </span>
            <br />
            <span className="text-white">into </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              startups
            </span>
            <span className="text-white">, in </span>
            <span className="text-white">
              minutes
            </span>
          </h1>
          
          {/* Subtext - Further reduced from lg to base */}
          <p className="text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
            Transform your idea into a startup — built using AI agents for research, MVPs, branding, and more.
          </p>
        </motion.div>

        {/* Input section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-3xl p-3">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea... e.g., 'AI-powered fitness app for busy professionals'"
                    className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none resize-none leading-relaxed pr-16"
                    style={{
                      minHeight: '60px',
                      maxHeight: '200px',
                      wordWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                      overflowY: 'auto'
                    }}
                    rows={1}
                  />
                  
                  {/* Small Get Started button in bottom right corner */}
                  <button
                    onClick={handleGetStarted}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Start with 100 free credits • Cancel anytime
            </p>
          </div>
        </motion.div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="flex items-center gap-3 text-gray-400">
            <Button variant="glass" size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};