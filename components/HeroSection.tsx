// components/HeroSection.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  scrollY: number;
  isVisible: boolean;
}

export function HeroSection({ scrollY, isVisible }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device to disable parallax for smoother performance
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ⭐ Half-filled star logic
  const renderHeroStars = () => {
    const stars = [];

    // 4 Full Stars
    for (let i = 0; i < 4; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 text-teal-300 fill-teal-300"
        />
      );
    }

    // 1 Half Star
    stars.push(
      <div key="half" className="relative w-4 h-4">
        {/* Outline star */}
        <Star className="w-4 h-4 text-teal-300" />
        {/* Left half filled */}
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="w-4 h-4 fill-teal-300 text-teal-300" />
        </div>
      </div>
    );

    return stars;
  };

  return (
    // FIX 1: Use 100dvh (dynamic viewport height) for better mobile browser support
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 will-change-transform" // FIX 2: will-change for performance
        style={{
          // FIX 3: Disable parallax calculation on mobile to prevent jitter
          transform: isMobile ? "none" : `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/watermarkremove.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-cyan-900/60 to-emerald-900/70"></div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/40 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="space-y-6">
              <p className="text-teal-300 text-sm uppercase tracking-wider font-medium">
                Bloomix Skincare
              </p>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
                Embrace
                <br />
                <span className="text-teal-300 relative inline-block">
                  Natural Radiance
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M0 6C50 2 100 10 150 6C200 2 250 10 300 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="animate-draw"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
              Discover Bloomix — where nature meets innovation. Our skincare
              range is crafted to nourish, hydrate, and reveal your most radiant
              self.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/shop">
                <Button className="btn-secondary bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-base w-full sm:w-auto">
                  SHOP COLLECTION
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            {/* ⭐ Updated Rating Stars */}
            <div className="flex items-center justify-center space-x-6 pt-6">
              <div className="flex items-center space-x-1">
                {renderHeroStars()}
              </div>
              <p className="text-sm text-gray-200">
                Loved by 10,000+ happy customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}