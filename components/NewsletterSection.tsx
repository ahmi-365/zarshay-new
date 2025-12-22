// components/NewsletterSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterSection() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500" data-scroll-reveal>
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Stay in the glow</h2>
          <p className="text-white/90 text-lg">
            Subscribe to our newsletter for skincare tips, exclusive offers, and new product
            launches.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <Button onClick={handleSubscribe} className="newsletter-button">
              Subscribe
            </Button>
          </div>

          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-6 inline-block bg-white/20 backdrop-blur-md text-white font-medium px-6 py-3 rounded-lg shadow-lg"
              >
                You're all set! Welcome to the glow community
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}