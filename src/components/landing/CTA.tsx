import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const benefits = [
  'Start with 100 free credits',
  'No credit card required',
  'Cancel anytime',
  'Full access to all tools'
];

export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 relative">
      {/* Background without grid (grid is now global) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main card */}
          <div className="relative">
            {/* Gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20" />
            
            <div className="relative bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Ready to transform your idea?</span>
                </div>
                
                {/* Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Start building your
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    dream startup
                  </span>
                  {' '}today
                </h2>
                
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of entrepreneurs who've already validated and launched their ideas with our AI-powered platform.
                </p>
                
                {/* Benefits */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-10 py-4 text-lg font-semibold"
                    onClick={() => navigate('/signup')}
                  >
                    Start Building Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="px-10 py-4 text-lg font-semibold"
                  >
                    Watch Demo
                  </Button>
                </div>
                
                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">10,000+</div>
                    <div className="text-sm text-gray-400">Active users</div>
                  </div>
                  <div className="w-px h-8 bg-gray-700" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50,000+</div>
                    <div className="text-sm text-gray-400">Ideas validated</div>
                  </div>
                  <div className="w-px h-8 bg-gray-700" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">$2M+</div>
                    <div className="text-sm text-gray-400">Funding raised</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};