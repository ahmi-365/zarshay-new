// components/TestimonialsSection.tsx
"use client";

import { Star, Quote, CheckCircle2 } from "lucide-react";
import { easeOut, motion } from "framer-motion";

interface TestimonialsSectionProps {
  visibleSections?: { [key: string]: boolean };
}

const testimonials = [
  {
    name: "Zainab Rizvi",
    role: "Interior Designer",
    text: "Zarshay has completely transformed my wardrobe. The trousers fit perfectly tailored, and the shirts drape beautifully. I feel confident every day.",
    rating: 5,
    initials: "ZR",
  },
  {
    name: "Mahnoor Ali",
    role: "Marketing Exec",
    text: "I'm obsessed with the attention to detail. The fabric quality is breathable yet substantial—it's rare to find this level of craftsmanship online.",
    rating: 5,
    initials: "MA",
  },
  {
    name: "Saba Karim",
    role: "Verified Buyer",
    text: "Exceptional packaging and even better products. The silhouette of the trousers is unmatched. Finally, a brand that understands fit.",
    rating: 5,
    initials: "SK",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function TestimonialsSection({ visibleSections }: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-gray-50/50 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-200/40 rounded-full blur-3xl -z-10 pointer-events-none opacity-50" />

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
            <Star className="w-3 h-3 text-gray-900 fill-gray-900" />
            <span>Customer Love</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Voices of <span className="font-serif italic font-medium">Confidence.</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Join thousands of women who have found their perfect fit.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative group transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200"
            >
              {/* Background Quote Icon Decoration */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-50 group-hover:text-gray-100 transition-colors duration-500 fill-gray-50 group-hover:fill-gray-100" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-gray-900 fill-gray-900"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-8 leading-relaxed font-serif text-lg italic relative z-10">
                "{t.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium text-sm">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {t.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Verified Customer</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}