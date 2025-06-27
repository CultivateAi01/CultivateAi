import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle, Clock, Users, Headphones } from 'lucide-react';
import { Button } from '../ui/Button';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch for general inquiries',
    contact: 'hello@uncubed.com',
    color: 'from-blue-500 to-cyan-500',
    response: 'Usually responds within 2 hours'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our support team',
    contact: 'Available 24/7',
    color: 'from-green-500 to-emerald-500',
    response: 'Instant response'
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our team',
    contact: '+1 (555) 123-4567',
    color: 'from-purple-500 to-pink-500',
    response: 'Mon-Fri, 9AM-6PM PST'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come say hello at our office',
    contact: 'San Francisco, CA',
    color: 'from-orange-500 to-amber-500',
    response: 'By appointment only'
  }
];

const supportOptions = [
  {
    icon: Users,
    title: 'Sales Inquiries',
    description: 'Questions about pricing, plans, or enterprise solutions',
    email: 'sales@uncubed.com'
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    description: 'Help with using our platform or troubleshooting issues',
    email: 'support@uncubed.com'
  },
  {
    icon: MessageSquare,
    title: 'Partnerships',
    description: 'Interested in partnering with us or integrations',
    email: 'partnerships@uncubed.com'
  }
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      {/* Smooth color transition from about to CTA */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-orange-500/8 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-yellow-500/8" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-yellow-500/8" />
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
            <MessageSquare className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-gray-300">Get In Touch</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Let's build something
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              amazing together
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or want to explore partnership opportunities? 
            We'd love to hear from you and help bring your startup vision to life.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={method.title} className="group">
                <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 text-center group-hover:bg-white/[0.06] transition-all duration-300 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                  <div className="text-white font-medium mb-2">{method.contact}</div>
                  <div className="text-gray-500 text-xs">{method.response}</div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Send us a message</h3>
                <p className="text-gray-400">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-orange-400 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                      placeholder="Tell us about your project, questions, or how we can help..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Support Options & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Support Options */}
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Need specific help?</h3>
              
              <div className="space-y-6">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{option.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{option.description}</p>
                        <a
                          href={`mailto:${option.email}`}
                          className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
                        >
                          {option.email}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Response Times</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">General Inquiries</span>
                  <span className="text-orange-400 font-medium">{'< 2 hours'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Technical Support</span>
                  <span className="text-orange-400 font-medium">{'< 1 hour'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sales Questions</span>
                  <span className="text-orange-400 font-medium">{'< 30 minutes'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Enterprise Inquiries</span>
                  <span className="text-orange-400 font-medium">{'< 15 minutes'}</span>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
              
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-orange-400 text-sm">
                  <strong>24/7 Support:</strong> Live chat and email support available around the clock for urgent issues.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};