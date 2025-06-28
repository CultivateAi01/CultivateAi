import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Rocket, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for exploring your first startup idea',
    monthlyPrice: 'Free',
    yearlyPrice: 'Free',
    credits: 100,
    icon: Rocket,
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
    monthlyPrice: '$29',
    yearlyPrice: '$17',
    originalMonthlyPrice: '$49',
    originalYearlyPrice: '$29',
    credits: 500,
    icon: Star,
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
    monthlyPrice: '$99',
    yearlyPrice: '$59',
    originalMonthlyPrice: '$149',
    originalYearlyPrice: '$99',
    credits: 2000,
    icon: Crown,
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

const floatingElements = [
  { icon: Star, delay: 0, duration: 4, x: '10%', y: '20%' },
  { icon: Sparkles, delay: 0.5, duration: 5, x: '80%', y: '15%' },
  { icon: Zap, delay: 1, duration: 4.5, x: '15%', y: '70%' },
  { icon: Rocket, delay: 1.5, duration: 5.5, x: '85%', y: '75%' },
];

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-32 px-6 relative">
      {/* Clean background that starts and ends with black - matching CTA section */}
      <div className="absolute inset-0">
        {/* Start with black from features */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Main pricing background - pure black like CTA */}
        <div className="absolute inset-0 bg-black" />
        
        {/* End with black for about transition */}
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
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-gray-300">Simple Pricing</span>
          </div>
          
          {/* Reduced from 6xl to 4xl to match CTA section */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Choose your
            <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              startup journey
            </span>
          </h2>
          
          {/* Reduced from xl to lg to match CTA section */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free, scale as you grow. All plans include access to our complete AI toolkit.
          </p>

          {/* Billing Toggle - simplified styling */}
          <div className="inline-flex items-center bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              {billingCycle === 'monthly' && (
                <span className="absolute -top-2 -right-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-semibold border border-white/30">
                  Save 40%
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Main Pricing Card - matching CTA section style with black theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-3xl blur opacity-20" />
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-12">
            <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            
            {/* Reduced from 3xl to 2xl to match CTA section */}
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Plan</h3>
            
            {/* Reduced from xl to lg to match CTA section */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8 text-center">
              "Select the perfect plan to accelerate your startup journey. All plans include access to our complete AI toolkit with no hidden fees."
            </p>

            {/* Plans grid - matching CTA section style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
                const originalPrice = billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice;
                
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    className={`flex flex-col p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl hover:bg-white/[0.06] transition-all duration-200 group ${
                      plan.popular ? 'ring-1 ring-white/20' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-white/20 text-white px-4 py-1 rounded-full text-xs font-semibold border border-white/30">
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{plan.name}</h4>
                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                      
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {originalPrice && (
                          <span className="text-gray-500 line-through text-lg">{originalPrice}</span>
                        )}
                        <span className="text-3xl font-bold text-white">{currentPrice}</span>
                        {currentPrice !== 'Free' && (
                          <span className="text-gray-400 text-base">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        )}
                      </div>
                      
                      <div className="text-gray-400 text-sm mb-4">
                        {plan.credits} AI credits included
                      </div>
                    </div>

                    {/* Features - simplified */}
                    <div className="space-y-2 mb-6 flex-grow">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-green-400" />
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button - minimal styling */}
                    <div className="mt-auto">
                      <Button
                        variant={plan.popular ? 'primary' : 'glass'}
                        size="md"
                        className="w-full transition-all duration-200"
                      >
                        {currentPrice === 'Free' ? 'Get Started Free' : 'Start Free Trial'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Trust indicators with enhanced design - matching CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
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
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
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
            
            {/* Bottom guarantee text */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                14-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};