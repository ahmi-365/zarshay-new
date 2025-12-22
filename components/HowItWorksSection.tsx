// components/HowItWorksSection.tsx
"use client";

interface HowItWorksSectionProps {
  visibleSections: { [key: string]: boolean };
}

export function HowItWorksSection({ visibleSections }: HowItWorksSectionProps) {
  const steps = [
    { step: "01", title: "Cleanse", desc: "Start with our gentle cleansers" },
    { step: "02", title: "Treat", desc: "Apply targeted treatments" },
    { step: "03", title: "Hydrate", desc: "Moisturize with our serums" },
    { step: "04", title: "Protect", desc: "Finish with SPF protection" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50" data-scroll-reveal>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple steps to beautiful, healthy skin</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`text-center space-y-4 transform transition-all duration-700 ${
                visibleSections["about"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl font-light text-teal-500">{item.step}</div>
              <h3 className="text-xl font-medium text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}