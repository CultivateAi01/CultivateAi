import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Zap, Rocket, Star, TrendingUp, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const floatingIcons = [
  { icon: Sparkles, delay: 0, duration: 6, x: '15%', y: '20%', color: 'text-blue-400' },
  { icon: Zap, delay: 1, duration: 5, x: '85%', y: '25%', color: 'text-purple-400' },
  { icon: Rocket, delay: 2, duration: 7, x: '10%', y: '70%', color: 'text-green-400' },
  { icon: Star, delay: 0.5, duration: 4, x: '90%', y: '75%', color: 'text-yellow-400' },
  { icon: TrendingUp, delay: 1.5, duration: 6, x: '20%', y: '45%', color: 'text-pink-400' },
  { icon: Target, delay: 2.5, duration: 5, x: '80%', y: '50%', color: 'text-cyan-400' },
];

const testimonialCards = [
  {
    text: "Validated my SaaS idea in 30 minutes",
    author: "Sarah Chen",
    role: "Founder, TechFlow",
    avatar: "SC",
    delay: 0
  },
  {
    text: "Raised $2M with AI-generated pitch deck",
    author: "Marcus Rodriguez",
    role: "CEO, GreenLogistics",
    avatar: "MR",
    delay: 0.5
  },
  {
    text: "Built MVP roadmap that saved 6 months",
    author: "Emily Watson",
    role: "CTO, DataSync",
    avatar: "EW",
    delay: 1
  }
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

  // Typing animation effect
  useEffect(() => {
    if (idea.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [idea]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-black" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        
        {/* Fade to black at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </motion.div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((element, index) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: element.x, top: element.y }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            >
              <div className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center">
                <Icon className={`w-6 h-6 ${element.color}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main headline with enhanced animations - TWO LINES & SMALLER TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-white">AI-Powered Startup Builder</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          {/* Two-line headline with smaller text sizes */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="text-white block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Turn your{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  wildest ideas
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </motion.span>
            <motion.span 
              className="text-white block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              into{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                billion-dollar startups
              </span>
            </motion.span>
          </motion.h1>
          
          {/* Smaller subheading */}
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Our AI agents research, validate, and build your startup in{' '}
            <span className="text-blue-400 font-semibold">minutes, not months</span>.
            Join 50,000+ entrepreneurs who've already transformed their ideas.
          </motion.p>
        </motion.div>

        {/* Enhanced Input Section - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <motion.div 
                className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-4">
                <div className="relative">
                  <motion.div
                    className="absolute top-3 left-4 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </motion.div>
                  
                  <textarea
                    ref={textareaRef}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea... e.g., 'AI-powered fitness app that creates personalized workout plans based on your DNA and lifestyle data'"
                    className="w-full px-6 py-6 pt-12 bg-transparent text-white placeholder-gray-400 text-base resize-none focus:outline-none leading-relaxed pr-16"
                    style={{
                      minHeight: '100px',
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
                      className="absolute bottom-4 left-6 flex items-center gap-2"
                    >
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-pink-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm">AI analyzing...</span>
                    </motion.div>
                  )}
                  
                  {/* Enhanced CTA button */}
                  <motion.button
                    onClick={handleGetStarted}
                    className="absolute bottom-4 right-4 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300" />
                      <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Helper text with stats - More compact */}
            <motion.div 
              className="mt-4 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>No credit card required</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>100 free credits to start</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-400" />
                <span>Join 50,000+ entrepreneurs</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Social Proof with Testimonials - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-10"
        >
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-4">Trusted by entrepreneurs worldwide</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>$50M+ funding raised</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>10,000+ startups launched</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>95% success rate</span>
              </div>
            </div>
          </div>

          {/* Floating testimonial cards - Smaller */}
          <div className="relative h-24">
            {testimonialCards.map((testimonial, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${20 + index * 30}%`,
                  top: `${index * 5}px`,
                }}
                initial={{ opacity: 0, y: 30, rotate: -5 + index * 5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotate: -3 + index * 3,
                  x: [0, 10, 0],
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.5 + testimonial.delay,
                  x: {
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              >
                <div className="bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-xl p-3 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white text-xs font-medium">{testimonial.author}</div>
                      <div className="text-gray-400 text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs">"{testimonial.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              className="px-10 py-3 text-base font-semibold shadow-2xl relative overflow-hidden group"
              onClick={handleGetStarted}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Start Building Now</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="glass" 
              size="lg" 
              className="px-10 py-3 text-base font-semibold group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};