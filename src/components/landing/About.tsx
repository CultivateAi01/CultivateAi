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
      {/* Clean background that starts and ends with black */}
      <div className="absolute inset-0">
        {/* Start with black from pricing */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main about background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
        
        {/* End with black for contact transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header - Reduced text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-300">Our Story</span>
          </div>
          
          {/* Reduced from 6xl to 4xl */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Empowering the next
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              generation of builders
            </span>
          </h2>
          
          {/* Reduced from xl to lg */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe every entrepreneur deserves access to world-class tools and insights. 
            That's why we built UnCubed - to democratize startup success through AI.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                {/* Reduced from 4xl to 3xl */}
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl blur opacity-20" />
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-12 text-center">
            <Rocket className="w-16 h-16 text-green-400 mx-auto mb-6" />
            {/* Reduced from 3xl to 2xl */}
            <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
            {/* Reduced from xl to lg */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              "To empower every entrepreneur with AI-driven insights and tools that were once only available 
              to well-funded startups and Fortune 500 companies. We're leveling the playing field and making 
              startup success accessible to all."
            </p>
            <div className="mt-8 text-gray-400">
              — Ankit Kumar, CEO & Co-founder
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            {/* Reduced from 4xl to 3xl */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8 h-full group-hover:bg-white/[0.06] transition-all duration-200">
                    <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Reduced from xl to lg */}
                    <h4 className="text-lg font-semibold text-white mb-4">{value.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};