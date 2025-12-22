// components/IngredientsSection.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Sparkles, Shield, Heart, ArrowRight } from "lucide-react";

interface IngredientsSectionProps {
  visibleSections: { [key: string]: boolean };
}

export function IngredientsSection({ visibleSections }: IngredientsSectionProps) {
  const ingredients = [
    {
      icon: Leaf,
      title: "NO NASTIES",
      desc: "Enriched with botanical extracts, organic aloe vera, and natural vitamin E. Free from harsh chemicals, parabens, and sulfates.",
    },
    {
      icon: Sparkles,
      title: "POWERFUL ACTIVES",
      desc: "A carefully curated selection of active ingredients that deliver real results for your skin.",
    },
    {
      icon: Shield,
      title: "CLINICALLY TESTED & PROVEN",
      desc: "Dermatologically tested and clinically proven to deliver visible results in just 4 weeks.",
    },
    {
      icon: Heart,
      title: "SUSTAINABLY SOURCED",
      desc: "Ethically sourced ingredients that are kind to your skin and the environment.",
    },
  ];

  return (
<section
  id="about"
  className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50"
  data-scroll-reveal
>
      <div className="container mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="section-title">Powerful Natural Ingredients</h2>
          <p className="section-subtitle">
            Every ingredient is carefully selected for its proven benefits and sustainable sourcing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className={`ingredient-card group transform transition-all duration-700 ${
                visibleSections["about"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="icon-container-lg">
                <item.icon className="w-8 h-8 md:w-10 md:h-10 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="ingredient-title">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <Link href="/shop">
          <Button className="btn-secondary">
            SHOP NOW
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </section>
  );
}