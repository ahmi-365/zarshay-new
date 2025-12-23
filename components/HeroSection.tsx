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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderHeroStars = () => {
    const stars = [];
    // 4 Full Stars
    for (let i = 0; i < 4; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 text-white fill-white" />
      );
    }
    // 1 Half Star
    stars.push(
      <div key="half" className="relative w-4 h-4">
        <Star className="w-4 h-4 text-white" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="w-4 h-4 fill-white text-white" />
        </div>
      </div>
    );
    return stars;
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: isMobile ? "none" : `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/zrx.png')" }}
        />
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content - Pinned to Bottom in Single Line */}
      <div className="absolute bottom-0 left-0 w-full z-20 pb-8 pt-12 px-4 bg-gradient-to-t from-black/80 to-transparent">
        <div
          className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* 1. Shop Button */}
          <Link href="/shop" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 border-none px-8 py-6 text-base font-bold uppercase tracking-widest rounded-none transition-all">
              Shop Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          {/* Separator (Hidden on mobile, visible on desktop) */}
          <div className="hidden md:block w-px h-8 bg-white/30"></div>

          {/* 2. Reviews / Stars Text */}
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-1">
              {renderHeroStars()}
            </div>
            <span className="text-sm font-medium tracking-wide border-b border-white/30 pb-0.5">
              10k+ Happy Customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
