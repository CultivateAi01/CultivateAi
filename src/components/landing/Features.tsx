import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, FileText, Target, Scale, Zap, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Market Research',
    description: 'Deep market analysis, competitor insights, and industry trends powered by advanced AI algorithms',
    color: 'from-blue-500 to-cyan-400',
    stats: '95% accuracy'
  },
  {
    icon: Rocket,
    title: 'MVP Builder',
    description: 'Technical architecture and development roadmap for your minimum viable product with cost estimates',
    color: 'from-purple-500 to-pink-400',
    stats: '3x faster'
  },
  {
    icon: FileText,
    title: 'Business Plan Generator',
    description: 'Comprehensive business strategy with financial projections and detailed execution plans',
    color: 'from-emerald-500 to-teal-400',
    stats: 'Investor-ready'
  },
  {
    icon: Target,
    title: 'Marketing Strategy',
    description: 'Customer acquisition tactics, brand positioning, and growth marketing plans tailored to your market',
    color: 'from-orange-500 to-amber-400',
    stats: '10x ROI avg'
  },
  {
    icon: Scale,
    title: 'Legal Advisor',
    description: 'Entity structure guidance, intellectual property protection, and compliance recommendations',
    color: 'from-slate-500 to-gray-400',
    stats: 'Compliant'
  },
  {
    icon: Zap,
    title: 'Pitch Deck Creator',
    description: 'Investor-ready presentations with compelling storytelling and professional data visualization',
    color: 'from-indigo-500 to-blue-400',
    stats: '80% success rate'
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 px-6 relative">
      {/* Background without grid (grid is now global) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Powerful AI Tools</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              validate and launch
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered suite handles the complex research and planning, so you can focus on building and growing your startup.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-px bg-gradient-to-r from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative h-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 group-hover:bg-white/[0.06] transition-all duration-300">
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                        <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                          {feature.stats}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};