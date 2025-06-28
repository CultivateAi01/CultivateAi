import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Lightbulb, Rocket, Globe, TrendingUp, Star, Sparkles, Zap } from 'lucide-react';

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

const floatingElements = [
  { icon: Star, delay: 0, duration: 6, x: '10%', y: '20%' },
  { icon: Sparkles, delay: 1, duration: 8, x: '80%', y: '15%' },
  { icon: Zap, delay: 2, duration: 7, x: '15%', y: '70%' },
  { icon: Rocket, delay: 3, duration: 9, x: '85%', y: '75%' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 relative">
      {/* Clean background that starts and ends with black - matching CTA section */}
      <div className="absolute inset-0">
        {/* Start with black from pricing */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main about background - pure black like CTA */}
        <div className="absolute inset-0 bg-black" />
        
        {/* End with black for contact transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Floating animated elements - matching CTA section */}
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
        {/* Header - Reduced text sizes to match CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-gray-300">Our Story</span>
          </div>
          
          {/* Reduced from 6xl to 4xl to match CTA section */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Empowering the next
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              generation of builders
            </span>
          </h2>
          
          {/* Reduced from xl to lg to match CTA section */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe every entrepreneur deserves access to world-class tools and insights. 
            That's why we built UnCubed - to democratize startup success through AI.
          </p>
        </motion.div>

        {/* Stats - matching CTA section style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                {/* Reduced from 4xl to 3xl to match CTA section */}
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission Statement - matching CTA section style with black theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-3xl blur opacity-20" />
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-12 text-center">
            <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
            {/* Reduced from 3xl to 2xl to match CTA section */}
            <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
            {/* Reduced from xl to lg to match CTA section */}
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

        {/* Values - matching CTA section style with black theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-3xl blur opacity-20" />
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-12">
            <div className="text-center mb-16">
              {/* Reduced from 4xl to 3xl to match CTA section */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Values</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make.
              </p>
            </div>

            {/* Values grid - matching CTA section style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-4 p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl hover:bg-white/[0.06] transition-all duration-300 group text-center"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Reduced from xl to lg to match CTA section */}
                    <h4 className="text-lg font-semibold text-white">{value.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Trust indicators with enhanced design - matching CTA section */}
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
                  <div className="text-2xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
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