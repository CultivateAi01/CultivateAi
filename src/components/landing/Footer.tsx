import React from 'react';
import { Box, Twitter, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerSections = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#api' },
      { label: 'Integrations', href: '#integrations' }
    ],
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press', href: '#press' }
    ],
    Resources: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Status', href: '#status' }
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Security', href: '#security' },
      { label: 'Cookies', href: '#cookies' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="relative border-t border-white/10 py-20 px-6">
      {/* Background without grid (grid is now global) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Box className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                UnCubed
              </span>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              Transform your startup ideas into reality with AI-powered tools and insights. 
              Join thousands of successful entrepreneurs.
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerSections).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-white font-semibold mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 UnCubed. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};