// components/HowItWorksSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MousePointerClick,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface HowItWorksSectionProps {
  visibleSections?: { [key: string]: boolean };
}

const steps = [
  {
    id: 1,
    title: "Discover",
    desc: "Explore our curated collection.",
    icon: Search,
    link: "/shop",
    linkText: "Browse Collection",
  },
  {
    id: 2,
    title: "Select",
    desc: "Choose your perfect size & fit.",
    icon: MousePointerClick,
    link: "/shop",
    linkText: "Find Your Fit",
  },
  {
    id: 3,
    title: "Order",
    desc: "Seamless & secure checkout.",
    icon: ShoppingBag,
    link: "/cart",
    linkText: "View Cart",
  },
  {
    id: 4,
    title: "Elevate",
    desc: "Wear with absolute confidence.",
    icon: Sparkles,
    link: "/shop",
    linkText: "New Arrivals",
  },
];

export function HowItWorksSection({ visibleSections }: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
            <ArrowRight className="w-3 h-3 text-gray-900" />
            <span>The Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Your Journey to{" "}
            <span className="font-serif italic font-medium">Elegance.</span>
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* DESKTOP: Connecting Line Background (Gray) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10" />

          {/* DESKTOP: Interactive Progress Line (Black) */}
          <motion.div
            className="hidden lg:block absolute top-10 left-[10%] h-0.5 bg-gray-900 -z-10 origin-left"
            initial={{ width: "0%" }}
            animate={{ width: `${(Math.max(0, activeStep - 1) / 3) * 80}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.id * 0.1 }}
                onMouseEnter={() => setActiveStep(item.id)}
                onMouseLeave={() => setActiveStep(0)}
                className={`relative flex flex-col items-center text-center p-6 rounded-3xl transition-all duration-300 ${
                  activeStep === item.id
                    ? "bg-white shadow-xl shadow-gray-200/50 scale-105"
                    : "hover:bg-white/50"
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 border-2 relative z-10 ${
                    activeStep >= item.id
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-white border-gray-100 text-gray-400"
                  }`}
                >
                  <item.icon className="w-8 h-8" />

                  {/* Small badge for completed steps in hover sequence */}
                  {activeStep > item.id && (
                    <div className="absolute -right-1 -top-1 bg-emerald-500 rounded-full p-1 border-2 border-white">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Step 0{item.id}
                  </span>
                  <h3
                    className={`text-lg font-medium transition-colors ${
                      activeStep >= item.id ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed px-2">
                    {item.desc}
                  </p>
                </div>

                {/* Interactive Link (Appears on Hover) */}
                <div
                  className={`mt-6 overflow-hidden transition-all duration-300 ${
                    activeStep === item.id
                      ? "h-10 opacity-100"
                      : "h-0 opacity-0"
                  }`}
                >
                  <Link
                    href={item.link}
                    className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
                  >
                    {item.linkText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Connector (Vertical Line) */}
        <div className="lg:hidden absolute left-1/2 top-[300px] bottom-[100px] w-px bg-gray-200 -z-10 -translate-x-1/2" />
      </div>
    </section>
  );
}
