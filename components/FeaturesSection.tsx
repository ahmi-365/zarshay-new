// components/FeaturesSection.tsx
"use client";

import { Shield, Leaf, Droplets, Clock, Sparkles, Heart } from "lucide-react";

interface FeaturesSectionProps {
  visibleSections: { [key: string]: boolean };
}

export function FeaturesSection({ visibleSections }: FeaturesSectionProps) {
  const features = [
    { icon: Shield, title: "NO NASTY\nCHEMICALS", delay: "0ms" },
    { icon: Leaf, title: "VEGAN\nINGREDIENTS", delay: "100ms" },
    { icon: Droplets, title: "CRUELTY\nFREE", delay: "200ms" },
    { icon: Clock, title: "FAST\nDELIVERY", delay: "300ms" },
    { icon: Sparkles, title: "CLINICALLY\nTESTED", delay: "400ms" },
    { icon: Heart, title: "MADE WITH\nLOVE", delay: "500ms" },
  ];

  return (
    <section id="about" className="py-20 bg-white relative" data-scroll-reveal>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">Natural skincare with scientifically proven results</h2>
          <p className="section-subtitle">
            Experience the purity of nature and the power of science with Bloomix — skincare
            designed to bring out your natural glow.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group transform transition-all duration-700 ${
                visibleSections["about"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: feature.delay }}
            >
              <div className="icon-container">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="feature-text">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}