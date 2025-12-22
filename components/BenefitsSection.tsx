// components/BenefitsSection.tsx
"use client";

interface BenefitsSectionProps {
  scrollY: number;
}

export function BenefitsSection({ scrollY }: BenefitsSectionProps) {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "100%", label: "Natural Ingredients" },
    { number: "4 Weeks", label: "Visible Results" },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white relative overflow-hidden"
      data-scroll-reveal
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-light">Why Choose Bloomix?</h2>
          <p className="text-lg text-white/90">
            We're committed to delivering premium skincare that works. Every product is formulated
            with care and backed by science.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-light">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}