import React from 'react';
import { Navigation } from '../components/landing/Navigation';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { CTA } from '../components/landing/CTA';
import { Footer } from '../components/landing/Footer';

export const Landing: React.FC = () => {
  return (
    <div className="relative">
      {/* Content - grid background is now handled globally in App.tsx */}
      <Navigation />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}