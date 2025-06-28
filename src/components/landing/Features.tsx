import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, FileText, Target, Scale, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Market Research',
    description: 'Deep market analysis, competitor insights, and industry trends powered by advanced AI algorithms',
    stats: '95% accuracy',
    benefits: ['Market size analysis', 'Competitor mapping', 'Industry trends', 'Customer insights']
  },
  {
    icon: Rocket,
    title: 'MVP Builder',
    description: 'Technical architecture and development roadmap for your minimum viable product with cost estimates',
    stats: '3x faster',
    benefits: ['Feature prioritization', 'Tech stack selection', 'Development timeline', 'Cost estimation']
  },
  {
    icon: FileText,
    title: 'Business Plan Generator',
    description: 'Comprehensive business strategy with financial projections and detailed execution plans',
    stats: 'Investor-ready',
    benefits: ['Executive summary', 'Financial projections', 'Market analysis', 'Risk assessment']
  },
  {
    icon: Target,
    title: 'Marketing Strategy',
    description: 'Customer acquisition tactics, brand positioning, and growth marketing plans tailored to your market',
    stats: '10x ROI avg',
    benefits: ['Brand positioning', 'Customer acquisition', 'Growth tactics', 'Channel strategy']
  },
  {
    icon: Scale,
    title: 'Legal Advisor',
    description: 'Entity structure guidance, intellectual property protection, and compliance recommendations',
    stats: 'Compliant',
    benefits: ['Entity structure', 'IP protection', 'Compliance guide', 'Legal templates']
  },
  {
    icon: Zap,
    title: 'Pitch Deck Creator',
    description: 'Investor-ready presentations with compelling storytelling and professional data visualization',
    stats: '80% success rate',
    benefits: ['Compelling narrative', 'Professional design', 'Data visualization', 'Investor focus']
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 px-6 relative">
      {/* Clean background that starts and ends with black - matching Contact section */}
      <div className="absolute inset-0">
        {/* Start with black from hero */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main features background - pure black like Contact */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Single dim red glowing light in background - matching Contact section */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)]" />
        
        {/* End with black for pricing transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header - Reduced text sizes to match Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-gray-300">Powerful AI Tools</span>
          </div>
          
          {/* Reduced from 6xl to 4xl to match Contact section */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              validate and launch
            </span>
          </h2>
          
          {/* Reduced from xl to lg to match Contact section */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered suite handles the complex research and planning, so you can focus on building and growing your startup.
          </p>
        </motion.div>

        {/* Features in single card container - matching Contact section style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8">
            <div className="mb-8">
              {/* Reduced from 2xl to xl to match Contact section */}
              <h3 className="text-xl font-bold text-white mb-2 text-center">AI-Powered Startup Tools</h3>
              <p className="text-gray-400 text-center">Complete suite of tools to transform your idea into a successful business.</p>
            </div>

            {/* Features grid - simplified layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="h-full bg-white/[0.05] border border-white/[0.08] rounded-xl p-6 hover:bg-white/[0.08] transition-all duration-200">
                      {/* Icon with minimal styling */}
                      <div className="relative mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                          {feature.stats}
                        </div>
                      </div>

                      {/* Content - minimal colors */}
                      <div className="mb-4">
                        <h4 className="text-base font-semibold text-white mb-2">{feature.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.description}</p>
                        
                        {/* Benefits - simplified */}
                        <div className="space-y-1">
                          {feature.benefits.slice(0, 3).map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-xs">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Simple CTA */}
                      <div className="flex items-center text-red-400 font-medium text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span>Learn more</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom section - matching Contact section style */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm">
                Join thousands of entrepreneurs building successful startups with AI
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};