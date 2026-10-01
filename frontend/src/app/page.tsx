import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TopToolsSection from '@/components/home/TopToolsSection';
import CategoryExplorerSection from '@/components/home/CategoryExplorerSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import SubscribeSection from '@/components/home/SubscribeSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with dynamic search and glowing orange highlights */}
      <HeroSection />

      {/* 2. Top & Featured Tools with instant Category Tabs & Filter */}
      <TopToolsSection />

      {/* 3. Category Explorer Matrix */}
      <CategoryExplorerSection />

      {/* 4. Benefits & Capabilities */}
      <BenefitsSection />

      {/* 5. Interactive How It Works Steps */}
      <HowItWorksSection />

      {/* 6. Testimonials & Social Proof */}
      <TestimonialsSection />

      {/* 7. Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* 8. Newsletter Subscribe with Celebration Effect */}
      <SubscribeSection />
    </div>
  );
}
