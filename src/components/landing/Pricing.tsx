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
    <section id="pricing" className="py-32 px-6 relative">
      {/* Smooth color transition from features to about */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-500/8 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-green-500/8" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-green-500/8" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header - Reduced text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Simple, Transparent Pricing</span>
          </div>
          
          {/* Reduced from 6xl to 4xl */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Choose your
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              startup journey
            </span>
          </h2>
          
          {/* Reduced from xl to lg */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free, scale as you grow. All plans include access to our complete AI toolkit.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-white/[0.12] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                billingCycle === 'yearly'
                  ? 'bg-white/[0.12] text-white'
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                
                <div className="relative h-full">
                  {/* Gradient border */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${plan.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`} />
                  
                  <div className="relative h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Reduced from 2xl to xl */}
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                      
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {plan.originalPrice && (
                          <span className="text-gray-500 line-through text-lg">{plan.originalPrice}</span>
                        )}
                        {/* Reduced from 4xl to 3xl */}
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        {plan.price !== 'Free' && (
                          <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        )}
                      </div>
                      
                      <div className="text-yellow-400 font-medium">
                        {plan.credits} AI credits included
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-center gap-3 opacity-60">
                          <div className="w-5 h-5 border border-gray-500 rounded flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{limitation}</span>
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
      </div>
    </section>
  );
};