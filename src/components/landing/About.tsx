import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Lightbulb, Rocket, Globe, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We believe every great company starts with a bold idea. Our mission is to help turn those ideas into reality.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Users,
    title: 'Democratizing Entrepreneurship',
    description: 'Making world-class business tools accessible to everyone, regardless of background or resources.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Every feature we build is designed to help you make better decisions and achieve real business outcomes.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Heart,
    title: 'Community-Focused',
    description: 'Building a supportive ecosystem where entrepreneurs can learn, grow, and succeed together.',
    color: 'from-pink-500 to-rose-500'
  }
];

const stats = [
  { number: '10,000+', label: 'Entrepreneurs Served', icon: Users },
  { number: '50,000+', label: 'Ideas Validated', icon: Lightbulb },
  { number: '$50M+', label: 'Funding Raised', icon: TrendingUp },
  { number: '95%', label: 'Success Rate', icon: Award }
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 relative">
      {/* Clean background that starts and ends with black - matching other sections */}
      <div className="absolute inset-0">
        {/* Start with black from pricing */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main about background - pure black like other sections */}
        <div className="absolute inset-0 bg-black" />
        
        {/* End with black for contact transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header - Matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-gray-300">Our Story</span>
          </div>
          
          {/* Matching text sizes with other sections */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Empowering the next
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              generation of builders
            </span>
          </h2>
          
          {/* Matching text sizes with other sections */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe every entrepreneur deserves access to world-class tools and insights. 
            That's why we built UnCubed - to democratize startup success through AI.
          </p>
        </motion.div>

        {/* Main About Card - matching other sections style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-3xl blur opacity-20" />
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-12">
            <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
            
            {/* Matching text sizes with other sections */}
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Mission</h3>
            
            {/* Matching text sizes with other sections */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8 text-center">
              "To empower every entrepreneur with AI-driven insights and tools that were once only available 
              to well-funded startups and Fortune 500 companies. We're leveling the playing field and making 
              startup success accessible to all."
            </p>

            {/* Stats grid - matching other sections style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="text-center group"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {/* Matching text sizes with other sections */}
                    <div className="text-2xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Values grid - simplified to match other sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl p-6 h-full group-hover:bg-white/[0.06] transition-all duration-200">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {/* Matching text sizes with other sections */}
                      <h4 className="text-base font-semibold text-white mb-3">{value.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Bottom section - matching other sections style */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm">
                — Ankit Kumar, CEO & Co-founder
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};