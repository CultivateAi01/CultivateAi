import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [idea, setIdea] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Enhanced background with smooth gradient transitions */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]" />
        
        {/* Extended smooth transition to features section */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-blue-500/6 to-blue-500/12" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-blue-500/15" />
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
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300">AI-Powered • Trusted by 10,000+ founders</span>
          </div>
        </motion.div>

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
              <span className="bg-gradient-to-r bg-clip-text text-transparent">
                ideas
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
              />
            </span>
            <br />
            <span className="text-white">into </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              startups
            </span>
            <span className="text-white">, in </span>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              minutes
            </span>
          </h1>
          
          {/* Subtext - Further reduced from lg to base */}
          <p className="text-base md:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
            The first all-in-one AI platform to research, validate, and build your startup ideas with 
            <span className="text-white font-medium"> professional-grade tools</span>
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
              <div className="relative bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-3xl p-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea... e.g., 'AI-powered fitness app for busy professionals'"
                    className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none"
                  />
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleGetStarted}
                    className="px-8 py-4 rounded-2xl font-semibold whitespace-nowrap"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Start with 100 free credits • Cancel anytime
            </p>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
                >
                  {i === 1 && <Users className="w-5 h-5" />}
                  {i !== 1 && String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">10,000+ entrepreneurs</div>
              <div className="text-gray-400 text-sm">have validated their ideas</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-px h-8 bg-gray-700" />
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