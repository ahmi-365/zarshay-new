// components/TestimonialsSection.tsx
"use client";

import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  visibleSections: { [key: string]: boolean };
}

export function TestimonialsSection({ visibleSections }: TestimonialsSectionProps) {
  const testimonials = [
    {
      name: "Ayesha Khan",
      role: "Skincare Enthusiast",
      text: "Bloomix has completely transformed my skincare routine. My skin feels softer, healthier, and naturally radiant every day.",
      rating: 5,
    },
    {
      name: "Fatima Zahra",
      role: "Beauty Blogger",
      text: "I'm obsessed with Bloomix! The natural ingredients feel luxurious and deliver visible results — it's my new go-to skincare brand.",
      rating: 5,
    },
    {
      name: "Layla Ahmed",
      role: "Hair Oil Expert & Enthusiast",
      text: "Exceptional quality and beautifully packaged. My order arrived quickly, and the products made my skin glow within days!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white" data-scroll-reveal>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Join thousands of satisfied customers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform ${
                visibleSections["about"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="font-medium text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}