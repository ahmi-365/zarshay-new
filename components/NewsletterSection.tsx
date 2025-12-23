// components/NewsletterSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, CheckCircle2, Loader2, XCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      // ---------------------------------------------------------
      // REPLACE THIS URL WITH YOUR ACTUAL NEWSLETTER API ENDPOINT
      // ---------------------------------------------------------
      // const response = await fetch("https://bloomix.majesticsofts.com/api/newsletter", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      // Simulating API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // if (!response.ok) throw new Error("Subscription failed");

      setStatus("success");
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-6 border border-white/10">
              <Mail className="w-5 h-5 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
              Unlock Exclusive{" "}
              <span className="font-serif italic font-medium">Access.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Be the first to know about new collections, behind-the-scenes
              content, and exclusive offers reserved for our community.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onSubmit={handleSubscribe}
            className="relative max-w-md mx-auto"
          >
            <div
              className={`relative flex items-center bg-white/5 border rounded-full p-1.5 transition-colors duration-300 ${
                status === "error"
                  ? "border-red-500/50"
                  : "border-white/10 focus-within:border-white/30"
              }`}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email address"
                disabled={status === "loading" || status === "success"}
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-500 px-6 py-3 text-sm focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={
                  status === "loading" || status === "success" || !email
                }
                className="bg-white text-black h-10 px-6 rounded-full font-medium text-sm hover:bg-gray-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <>
                    Subscribe <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            <div className="absolute top-full left-0 w-full mt-4 h-6 flex justify-center">
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-emerald-400 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Welcome to the Zarshay family!</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-400 text-sm font-medium"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
