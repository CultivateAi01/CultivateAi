import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Rocket, ArrowRight } from 'lucide-react';
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

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-32 px-6 relative">
      {/* Premium black background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-0 bg-black" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Simple Pricing</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Choose your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              startup journey
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free, scale as you grow. All plans include access to our complete AI toolkit.
          </p>

          {/* Billing Toggle */}
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
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  Save 40%
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const originalPrice = billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`relative h-full bg-white/[0.03] backdrop-blur-md border rounded-2xl overflow-hidden ${
                  plan.popular 
                    ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20' 
                    : 'border-white/[0.08] hover:border-white/[0.15]'
                } transition-all duration-300 group hover:bg-white/[0.05]`}>
                  
                  {/* Gradient accent line for popular plan */}
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
                  )}
                  
                  <div className="p-8 h-full flex flex-col">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>
                      
                      <div className="flex items-center justify-center gap-2 mb-3">
                        {originalPrice && (
                          <span className="text-gray-500 line-through text-xl">{originalPrice}</span>
                        )}
                        <span className="text-4xl font-bold text-white">{currentPrice}</span>
                        {currentPrice !== 'Free' && (
                          <span className="text-gray-400 text-lg">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        )}
                      </div>
                      
                      <div className="text-gray-400 text-sm">
                        {plan.credits} AI credits included
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-start gap-3 opacity-60">
                          <div className="w-5 h-5 border border-gray-500 rounded-full flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500 text-sm leading-relaxed">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Button
                        variant={plan.popular ? 'primary' : 'glass'}
                        size="lg"
                        className={`w-full h-14 text-base font-semibold ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                            : 'border-white/20 hover:border-white/30 hover:bg-white/[0.08]'
                        } transition-all duration-300`}
                      >
                        {currentPrice === 'Free' ? 'Get Started Free' : 'Start Free Trial'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              {[
                { number: '10,000+', label: 'Active users' },
                { number: '50,000+', label: 'Ideas validated' },
                { number: '$2M+', label: 'Funding raised' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-white/[0.08]">
              <p className="text-gray-400">
                14-day money-back guarantee • No setup fees • Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};