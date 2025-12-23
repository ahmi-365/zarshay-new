// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProductCategories } from "@/components/ProductCategories";
import { ProductShowcase } from "@/components/ProductShowcase";
import { IngredientsSection } from "@/components/IngredientsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import FeaturedProducts from "@/components/FeaturedProducts";
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-scroll-reveal]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection scrollY={scrollY} isVisible={isVisible} />
      {/* <ProductCategories /> */}
      <FeaturedProducts /> 
      {/* <FeaturesSection visibleSections={visibleSections} /> */}
      {/* <ProductShowcase /> */}
      <IngredientsSection visibleSections={visibleSections} />
      <BenefitsSection scrollY={scrollY} />
      <TestimonialsSection visibleSections={visibleSections} />
      <HowItWorksSection visibleSections={visibleSections} />
      <NewsletterSection />
      <Footer />
    </div>
  );
}