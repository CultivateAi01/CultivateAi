import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [idea, setIdea] = useState('');
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.max(60, Math.min(200, textarea.scrollHeight));
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = textarea.scrollHeight > 200 ? 'auto' : 'hidden';
    }
  }, [idea]);

  const canGetStarted = idea.trim().length > 0;

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Clean Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-black" />
        
        {/* Single subtle gradient */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        
        {/* Fade to black at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Simple badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-white">AI-Powered Startup Builder</span>
        </motion.div>

        {/* Clean two-line headline */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white block">
            Turn your{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              wildest ideas
            </span>
          </span>
          <span className="text-white block">
            into{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              billion-dollar startups
            </span>
          </span>
        </motion.h1>
        
        {/* Simple subheading */}
        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Our AI agents research, validate, and build your startup in{' '}
          <span className="text-blue-400 font-semibold">minutes, not months</span>.
        </motion.p>

        {/* Clean input section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
              
              <div className="relative bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-2xl p-4">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea..."
                    className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-400 text-base resize-none focus:outline-none leading-relaxed pr-16"
                    style={{
                      minHeight: '60px',
                      maxHeight: '200px',
                      wordWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                      overflowY: 'auto'
                    }}
                    rows={1}
                  />
                  
                  {/* Simple submit button */}
                  <button
                    onClick={handleGetStarted}
                    disabled={!canGetStarted}
                    className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      canGetStarted
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-110'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Simple helper text */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                💡 The more detailed your description, the better our AI can help
              </p>
            </div>
          </div>
        </motion.div>

        {/* Simple CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            variant="primary" 
            size="lg" 
            className="px-8 py-3 text-base font-semibold"
            onClick={handleGetStarted}
          >
            Start Building Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="glass" 
            size="lg" 
            className="px-8 py-3 text-base font-semibold"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* Simple trust indicators */}
        {/*} <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">
            Trusted by 10,000+ entrepreneurs worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>$50M+ funding raised</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>95% success rate</span>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};