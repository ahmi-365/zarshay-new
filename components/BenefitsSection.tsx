// components/BenefitsSection.tsx
"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Crown, ShieldCheck, RefreshCcw, Star } from "lucide-react";

interface BenefitsSectionProps {
  scrollY: number;
}

// 1. Counter Component (Updated for Re-animation)
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  // Changed: Removed 'once: true' so it triggers every time
  const isInView = useInView(ref, { margin: "-20px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // Animate up when in view
      const controls = animate(count, value, {
        duration: 1.5,
        ease: "easeOut",
      });
      return controls.stop;
    } else {
      // Reset immediately when out of view
      count.set(0);
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="flex">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function BenefitsSection({ scrollY }: BenefitsSectionProps) {
  const stats = [
    {
      id: 1,
      value: 10,
      suffix: "k+",
      label: "Happy Customers",
      icon: Star,
      desc: "Trusting our quality.",
    },
    {
      id: 2,
      value: 100,
      suffix: "%",
      label: "Quality Guarantee",
      icon: Crown,
      desc: "Premium fabrics only.",
    },
    {
      id: 3,
      value: 7,
      suffix: " Days",
      label: "Easy Returns",
      icon: RefreshCcw,
      desc: "Shop with confidence.",
    },
  ];

  return (
    <section className="py-12 bg-[#050505] text-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% ${
            50 + scrollY * 0.05
          }%, #333 0%, transparent 50%)`,
        }}
      />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }} // Triggers every time
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-1.5 rounded-full mb-4">
              <ShieldCheck className="w-3 h-3 text-white/70" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
                The Zarshay Promise
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light mb-4 tracking-tight">
              Why Choose{" "}
              <span className="font-serif italic font-medium text-white/90">
                Zarshay?
              </span>
            </h2>
            <p className="text-base text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              We're committed to delivering premium ladies' fashion that fits
              perfectly. Every piece is crafted with care and designed for
              confidence.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }} // Triggers every time
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <stat.icon className="w-5 h-5" />
              </div>

              {/* Counter */}
              <div className="text-4xl font-light mb-1 tracking-tight flex items-baseline">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <h3 className="text-base font-medium text-white mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-500">{stat.desc}</p>

              {/* Decorative Gradient on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
