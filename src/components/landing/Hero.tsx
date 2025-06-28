import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Rocket, Star, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const floatingIcons = [
  { icon: Sparkles, x: '15%', y: '25%', delay: 0, scale: 1.2 },
  { icon: Zap, x: '85%', y: '30%', delay: 0.5, scale: 1 },
  { icon: Rocket, x: '10%', y: '70%', delay: 1, scale: 1.1 },
  { icon: Star, x: '90%', y: '75%', delay: 1.5, scale: 0.9 },
];

const testimonials = [
  { name: "Sarah Chen", role: "Founder, EcoTech", text: "Validated my idea in 24 hours", avatar: "SC" },
  { name: "Marcus Rodriguez", role: "CEO, FinanceAI", text: "Raised $2M after using UnCubed", avatar: "MR" },
  { name: "Emily Johnson", role: "Startup Advisor", text: "Best AI tools for entrepreneurs", avatar: "EJ" },
];

export const Hero: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  // Typing effect simulation
  useEffect(() => {
    if (idea.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [idea]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Background System */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Animated mesh gradient */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, rgba(139,92,246,0.3) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(59,130,246,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: item.x, top: item.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0.3, 0.6],
                scale: [0, item.scale, item.scale * 0.8, item.scale],
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              <div className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-white/60" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-2xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white font-medium">10,000+ entrepreneurs building with AI</span>
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            <span className="block text-white">Transform</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Ideas into Startups
            </span>
            <span className="block text-white">in Minutes</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
          >
            The world's most advanced AI platform for entrepreneurs. 
            <br className="hidden md:block" />
            Research, validate, and build your startup with superhuman speed.
          </motion.p>
        </motion.div>

        {/* Interactive Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              {/* Animated border */}
              <motion.div 
                className="absolute -inset-1 rounded-3xl blur-sm opacity-30"
                animate={{
                  background: [
                    'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)',
                    'linear-gradient(45deg, #8B5CF6, #EC4899, #3B82F6)',
                    'linear-gradient(45deg, #EC4899, #3B82F6, #8B5CF6)',
                    'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea... e.g., 'AI-powered fitness app that creates personalized workout plans based on your goals, schedule, and available equipment'"
                    className="w-full px-8 py-6 bg-transparent text-white placeholder-gray-400 text-lg resize-none focus:outline-none leading-relaxed pr-20"
                    style={{
                      minHeight: '80px',
                      maxHeight: '200px',
                      wordWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                    }}
                    rows={1}
                  />
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-6 left-8 flex items-center gap-2"
                    >
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-gray-400 text-sm">AI analyzing...</span>
                    </motion.div>
                  )}
                  
                  {/* Enhanced CTA Button */}
                  <motion.button
                    onClick={handleGetStarted}
                    className="absolute bottom-4 right-4 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl">
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Helper text with stats */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>100 free credits to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>Results in under 5 minutes</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="primary" 
              size="lg" 
              className="px-12 py-4 text-lg font-semibold shadow-2xl"
              onClick={handleGetStarted}
            >
              Start Building Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="glass" 
              size="lg" 
              className="px-12 py-4 text-lg font-semibold backdrop-blur-xl"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <p className="text-gray-400 mb-6">Trusted by entrepreneurs worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-3 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/[0.08] transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div className="text-left">
                  <div className="text-white font-medium text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.role}</div>
                </div>
                <div className="text-gray-300 text-sm italic">"{testimonial.text}"</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-400 text-sm">Discover our AI tools</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center"
          >
            <ChevronDown className="w-4 h-4 text-white/60" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Fade to black at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
};