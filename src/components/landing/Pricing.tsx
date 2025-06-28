import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Rocket, ArrowRight } from 'lucide-react';
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
      {/* Clean minimalistic background */}
      <div className="absolute inset-0">
        {/* Start with black from features */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Simple single gradient background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
        
        {/* End with black for about transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Simple Pricing</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Choose your
            <br />
            <span className="text-gray-300">
              startup journey
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free, scale as you grow. All plans include access to our complete AI toolkit.
          </p>

          {/* Simple Billing Toggle */}
          <div className="inline-flex items-center bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-xl p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-white/[0.1] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly'
                  ? 'bg-white/[0.1] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 40%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Clean Pricing Cards */}
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
                className={`relative group ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className={`glass-card rounded-2xl overflow-hidden h-full ${
                  plan.popular 
                    ? 'border-blue-500/50 ring-1 ring-blue-500/30' 
                    : ''
                }`}>
                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                      
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {plan.originalPrice && (
                          <span className="text-gray-500 line-through text-lg">{plan.originalPrice}</span>
                        )}
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        {plan.price !== 'Free' && (
                          <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        )}
                      </div>
                      
                      <div className="text-gray-400 text-sm">
                        {plan.credits} AI credits included
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={plan.popular ? 'primary' : 'glass'}
                      size="lg"
                      className="w-full"
                    >
                      {plan.price === 'Free' ? 'Get Started Free' : 'Start Free Trial'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Simple Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { number: '10,000+', label: 'Active users' },
                { number: '50,000+', label: 'Ideas validated' },
                { number: '$2M+', label: 'Funding raised' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/[0.05]">
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