import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Rocket, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for exploring your first startup idea',
    price: 'Free',
    originalPrice: null,
    credits: 100,
    icon: Rocket,
    color: 'from-gray-500 to-gray-600',
    popular: false,
    features: [
      '100 AI credits included',
      'Access to all AI tools',
      'Basic market research',
      'Simple business plan',
      'Email support',
      'Export to PDF/Markdown'
    ],
    limitations: [
      'Limited to 2 projects',
      'Basic templates only'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For serious entrepreneurs ready to launch',
    price: '$29',
    originalPrice: '$49',
    credits: 500,
    icon: Star,
    color: 'from-blue-500 to-purple-600',
    popular: true,
    features: [
      '500 AI credits included',
      'Unlimited projects',
      'Advanced market analysis',
      'Investor-ready pitch decks',
      'Financial projections',
      'Priority support',
      'Custom branding',
      'Team collaboration',
      'Advanced export options'
    ],
    limitations: []
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For teams and agencies scaling multiple ventures',
    price: '$99',
    originalPrice: '$149',
    credits: 2000,
    icon: Crown,
    color: 'from-purple-500 to-pink-500',
    popular: false,
    features: [
      '2000 AI credits included',
      'Unlimited everything',
      'White-label solutions',
      'Custom AI training',
      'Dedicated account manager',
      'API access',
      'Advanced analytics',
      'Custom integrations',
      'SLA guarantee',
      'Phone support'
    ],
    limitations: []
  }
];

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      {/* Beautiful single gradient background */}
      <div className="absolute inset-0">
        {/* Start with black from features */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main pricing background with stunning purple gradient */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/15 to-indigo-600/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15),transparent_70%)]" />
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/25 to-purple-500/25 rounded-full blur-3xl"
        />
        
        {/* End with black for about transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-purple-500/30 rounded-full px-6 py-3 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="text-sm font-medium text-purple-300">Choose Your Journey</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="text-white">Pricing</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free, scale as you grow. All plans include access to our complete AI toolkit 
            with no hidden fees or surprises.
          </p>

          {/* Enhanced Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-white/[0.08] backdrop-blur-md border border-purple-500/20 rounded-2xl p-2"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold"
              >
                Save 40%
              </motion.span>
            </button>
          </motion.div>
        </motion.div>

        {/* Enhanced Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group ${plan.popular ? 'scale-105 z-10' : ''}`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Most Popular
                    </div>
                  </motion.div>
                )}
                
                <div className="relative h-full">
                  {/* Enhanced gradient border */}
                  <motion.div
                    className={`absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500' 
                        : 'bg-gradient-to-r from-purple-400 to-pink-400'
                    }`}
                    animate={plan.popular ? {
                      scale: [1, 1.02, 1],
                    } : {}}
                    transition={plan.popular ? {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : {}}
                  />
                  
                  <div className={`relative h-full backdrop-blur-md rounded-3xl overflow-hidden ${
                    plan.popular 
                      ? 'bg-white/[0.08] border-2 border-purple-500/30' 
                      : 'bg-white/[0.05] border border-white/[0.08]'
                  }`}>
                    {/* Animated background for popular plan */}
                    {plan.popular && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-indigo-500/10"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                    
                    <div className="relative p-8">
                      {/* Plan Header */}
                      <div className="text-center mb-8">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-20 h-20 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3">{plan.name}</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>
                        
                        <div className="flex items-center justify-center gap-2 mb-3">
                          {plan.originalPrice && (
                            <span className="text-gray-500 line-through text-xl">{plan.originalPrice}</span>
                          )}
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                          {plan.price !== 'Free' && (
                            <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">
                            {plan.credits} AI credits included
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Features */}
                      <div className="space-y-4 mb-8">
                        {plan.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                          </motion.div>
                        ))}
                        
                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-center gap-3 opacity-60">
                            <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex-shrink-0" />
                            <span className="text-gray-400 text-sm">{limitation}</span>
                          </div>
                        ))}
                      </div>

                      {/* Enhanced CTA Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={plan.popular ? 'primary' : 'glass'}
                          size="lg"
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl shadow-purple-500/25' 
                              : 'border-purple-500/30 hover:border-purple-500/50'
                          }`}
                        >
                          {plan.price === 'Free' ? 'Get Started Free' : 'Start Free Trial'}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/[0.03] backdrop-blur-md border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Trusted by entrepreneurs worldwide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '10,000+', label: 'Active entrepreneurs', icon: '👥' },
                { number: '50,000+', label: 'Ideas validated', icon: '💡' },
                { number: '$2M+', label: 'Funding raised by users', icon: '💰' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                ✨ All plans include a 14-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};