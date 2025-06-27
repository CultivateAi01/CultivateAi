import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Lightbulb, Rocket, Globe, TrendingUp } from 'lucide-react';

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    bio: 'Former VP of Product at Stripe. Built and scaled products used by millions.',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-founder',
    bio: 'Ex-Google AI researcher. PhD in Machine Learning from Stanford.',
    image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#'
  },
  {
    name: 'Emily Watson',
    role: 'Head of AI',
    bio: 'Former OpenAI researcher. Expert in natural language processing and business intelligence.',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#'
  },
  {
    name: 'David Kim',
    role: 'Head of Design',
    bio: 'Previously at Airbnb and Figma. Passionate about creating intuitive user experiences.',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin: '#'
  }
];

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

const milestones = [
  {
    year: '2022',
    title: 'Founded',
    description: 'Started with a vision to democratize startup success'
  },
  {
    year: '2023',
    title: 'AI Launch',
    description: 'Released our first AI-powered business planning tools'
  },
  {
    year: '2024',
    title: '10K Users',
    description: 'Reached 10,000 entrepreneurs using our platform'
  },
  {
    year: '2024',
    title: '$50M Raised',
    description: 'Our users have collectively raised over $50M in funding'
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
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
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
            <Globe className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-300">Our Story</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Empowering the next
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              generation of builders
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We believe every entrepreneur deserves access to world-class tools and insights. 
            That's why we built UnCubed - to democratize startup success through AI.
          </p>
        </motion.div>

        {/* Stats */}
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
              <div key={stat.label} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Mission Statement */}
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
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              "To empower every entrepreneur with AI-driven insights and tools that were once only available 
              to well-funded startups and Fortune 500 companies. We're leveling the playing field and making 
              startup success accessible to all."
            </p>
            <div className="mt-8 text-gray-400">
              — Sarah Chen, CEO & Co-founder
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h3>
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8 h-full group-hover:bg-white/[0.06] transition-all duration-300">
                    <div className={`w-14 h-14 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-4">{value.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From a simple idea to empowering thousands of entrepreneurs worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-xl p-6">
                      <div className="text-green-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h4 className="text-white font-semibold text-xl mb-2">{milestone.title}</h4>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-6 h-6 bg-green-500 rounded-full border-4 border-black" />
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passionate builders, researchers, and entrepreneurs dedicated to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 text-center group-hover:bg-white/[0.06] transition-all duration-300">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-white mb-1">{member.name}</h4>
                  <div className="text-green-400 text-sm font-medium mb-3">{member.role}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};