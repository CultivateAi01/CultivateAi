import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, FileText, Target, Scale, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Market Research',
    description: 'Deep market analysis, competitor insights, and industry trends powered by advanced AI algorithms',
    color: 'from-blue-500 to-cyan-400',
    stats: '95% accuracy',
    benefits: ['Market size analysis', 'Competitor mapping', 'Industry trends', 'Customer insights']
  },
  {
    icon: Rocket,
    title: 'MVP Builder',
    description: 'Technical architecture and development roadmap for your minimum viable product with cost estimates',
    color: 'from-purple-500 to-pink-400',
    stats: '3x faster',
    benefits: ['Feature prioritization', 'Tech stack selection', 'Development timeline', 'Cost estimation']
  },
  {
    icon: FileText,
    title: 'Business Plan Generator',
    description: 'Comprehensive business strategy with financial projections and detailed execution plans',
    color: 'from-emerald-500 to-teal-400',
    stats: 'Investor-ready',
    benefits: ['Executive summary', 'Financial projections', 'Market analysis', 'Risk assessment']
  },
  {
    icon: Target,
    title: 'Marketing Strategy',
    description: 'Customer acquisition tactics, brand positioning, and growth marketing plans tailored to your market',
    color: 'from-orange-500 to-amber-400',
    stats: '10x ROI avg',
    benefits: ['Brand positioning', 'Customer acquisition', 'Growth tactics', 'Channel strategy']
  },
  {
    icon: Scale,
    title: 'Legal Advisor',
    description: 'Entity structure guidance, intellectual property protection, and compliance recommendations',
    color: 'from-slate-500 to-gray-400',
    stats: 'Compliant',
    benefits: ['Entity structure', 'IP protection', 'Compliance guide', 'Legal templates']
  },
  {
    icon: Zap,
    title: 'Pitch Deck Creator',
    description: 'Investor-ready presentations with compelling storytelling and professional data visualization',
    color: 'from-indigo-500 to-blue-400',
    stats: '80% success rate',
    benefits: ['Compelling narrative', 'Professional design', 'Data visualization', 'Investor focus']
  }
];

const stats = [
  { number: '10,000+', label: 'Startups Launched' },
  { number: '95%', label: 'Success Rate' },
  { number: '$50M+', label: 'Funding Raised' },
  { number: '24/7', label: 'AI Support' }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 px-6 relative">
      {/* Seamless background that starts exactly where hero ends */}
      <div className="absolute inset-0">
        {/* Start with exact hero end color */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500/5" />
        
        {/* Main features background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-blue-500/3 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
        
        {/* End with exact pricing start color */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500/5" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header - Reduced text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Powerful AI Tools</span>
          </div>
          
          {/* Reduced from 6xl to 4xl */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              validate and launch
            </span>
          </h2>
          
          {/* Reduced from xl to lg */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered suite handles the complex research and planning, so you can focus on building and growing your startup.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
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
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {feature.stats}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                      
                      {/* Benefits */}
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
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