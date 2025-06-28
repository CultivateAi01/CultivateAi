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
    <section id="cta" className="py-32 px-6 relative">
      {/* Clean background that starts and ends with black - matching About section */}
      <div className="absolute inset-0">
        {/* Start with black from contact */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main CTA background with enhanced gradients - matching About section */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
        
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
        {/* Header - Reduced text sizes to match About section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-300">Ready to transform your idea?</span>
          </div>
          
          {/* Reduced from 6xl to 4xl to match About section */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Start building your
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              dream startup
            </span>
            {' '}today
          </h2>
          
          {/* Reduced from xl to lg to match About section */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of entrepreneurs who've already validated and launched their ideas with our AI-powered platform.
          </p>
        </motion.div>

        {/* Main CTA Card - matching About section style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl blur opacity-20" />
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-12 text-center">
            <Rocket className="w-16 h-16 text-green-400 mx-auto mb-6" />
            
            {/* Reduced from 3xl to 2xl to match About section */}
            <h3 className="text-2xl font-bold text-white mb-6">Transform Your Idea Into Reality</h3>
            
            {/* Reduced from xl to lg to match About section */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
              "To empower every entrepreneur with AI-driven insights and tools that were once only available 
              to well-funded startups and Fortune 500 companies. We're leveling the playing field and making 
              startup success accessible to all."
            </p>

            {/* Benefits grid with icons - matching About section style */}
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
                  className="px-12 py-4 text-lg font-semibold shadow-2xl"
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
                  className="px-12 py-4 text-lg font-semibold"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Trust indicators with enhanced design - matching About section */}
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
                  <div className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};