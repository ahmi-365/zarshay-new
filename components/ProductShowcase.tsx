// components/ProductShowcase.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Sparkles, ArrowRight } from "lucide-react";

export function ProductShowcase() {
  const benefits = [
    {
      icon: Leaf,
      title: "Natural",
      desc: "Only the finest natural ingredients sourced responsibly",
    },
    {
      icon: Droplets,
      title: "Hydrating",
      desc: "Deep hydration that lasts all day long",
    },
    {
      icon: Sparkles,
      title: "Effective",
      desc: "Proven results you can see and feel",
    },
  ];

  return (
    <section className="py-20 bg-white" data-scroll-reveal>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="aspect-square overflow-hidden rounded-3xl shadow-primary-lg">
              <Image
                src="/images/product-flat-lay.jpg"
                alt="Minimalist skincare products"
                width={600}
                height={600}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <p className="text-teal-600 text-sm uppercase tracking-wider font-medium">
                Our Story
              </p>
              <h2 className="section-title text-left">Crafted with Care</h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Founded with a passion for pure, effective skincare, Zarshay
              crafts every product to deliver exceptional results while
              respecting your skin's natural balance and the planet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((item, index) => (
                <div key={index} className="benefit-card group">
                  <div className="icon-container">
                    <item.icon className="w-8 h-8 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/shop">
              <Button className="btn-secondary">
                Glow Up Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
