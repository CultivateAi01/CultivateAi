import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, Star, Zap, Rocket } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const benefits = [
  { icon: CheckCircle, text: 'Start with 100 free credits', color: 'text-green-400' },
  { icon: Star, text: 'No credit card required', color: 'text-blue-400' },
  { icon: Zap, text: 'Cancel anytime', color: 'text-purple-400' },
  { icon: Rocket, text: 'Full access to all tools', color: 'text-orange-400' }
];

const floatingElements = [
  { icon: Star, delay: 0, duration: 6, x: '10%', y: '20%' },
  { icon: Sparkles, delay: 1, duration: 8, x: '80%', y: '15%' },
  { icon: Zap, delay: 2, duration: 7, x: '15%', y: '70%' },
  { icon: Rocket, delay: 3, duration: 9, x: '85%', y: '75%' },
];

export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Clean background that starts and ends with black */}
      <div className="absolute inset-0">
        {/* Start with black from contact */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main CTA background with enhanced gradients */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-purple-600/10 to-pink-600/15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-500/10 via-transparent to-cyan-500/10" />
        
        {/* Radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_60%)]" />
        
        {/* End with black for footer transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Floating animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: element.x, top: element.y }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            >
              <div className="w-8 h-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <Icon className="w-4 h-4 text-white/40" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative">
            {/* Animated gradient border */}
            <motion.div 
              className="absolute -inset-1 rounded-3xl blur opacity-30"
              animate={{
                background: [
                  'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #F59E0B)',
                  'linear-gradient(45deg, #8B5CF6, #EC4899, #F59E0B, #3B82F6)',
                  'linear-gradient(45deg, #EC4899, #F59E0B, #3B82F6, #8B5CF6)',
                  'linear-gradient(45deg, #F59E0B, #3B82F6, #8B5CF6, #EC4899)',
                  'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #F59E0B)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
              {/* Top accent line with animation */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-px"
                animate={{
                  background: [
                    'linear-gradient(90deg, transparent, #3B82F6, transparent)',
                    'linear-gradient(90deg, transparent, #8B5CF6, transparent)',
                    'linear-gradient(90deg, transparent, #EC4899, transparent)',
                    'linear-gradient(90deg, transparent, #F59E0B, transparent)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative z-10 p-12 md:p-16 text-center">
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-3 mb-8"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </motion.div>
                  <span className="text-blue-300 font-medium">Ready to transform your idea?</span>
                </motion.div>
                
                {/* Main headline with staggered animation */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Start building your
                    <br />
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                        dream startup
                      </span>
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </span>
                    {' '}today
                  </h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                  >
                    Join thousands of entrepreneurs who've already validated and launched their ideas with our AI-powered platform.
                  </motion.p>
                </motion.div>
                
                {/* Benefits grid with icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                >
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={benefit.text}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-3 p-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl hover:bg-white/[0.06] transition-all duration-300 group"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-5 h-5 ${benefit.color}`} />
                        </div>
                        <span className="text-gray-300 text-sm font-medium text-center leading-tight">{benefit.text}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
                
                {/* CTA Buttons with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl shadow-blue-500/25"
                      onClick={() => navigate('/signup')}
                    >
                      Start Building Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
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
                      className="px-12 py-4 text-lg font-semibold border-white/20 hover:border-white/30"
                    >
                      Watch Demo
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Trust indicators with enhanced design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 border-t border-white/10"
                >
                  {[
                    { number: '10,000+', label: 'Active users', icon: '👥' },
                    { number: '50,000+', label: 'Ideas validated', icon: '💡' },
                    { number: '$2M+', label: 'Funding raised', icon: '💰' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center group"
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};