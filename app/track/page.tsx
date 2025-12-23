"use client";

import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Package,
  MapPin,
  ArrowRight,
  Loader2,
  ExternalLink,
  X,
  Search,
  ScanLine,
} from "lucide-react";

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Background Parallax
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setLoading(true);

    // Simulate "Connecting" delay for effect
    setTimeout(() => {
      const postExUrl = `https://postex.pk/tracking?cn=${trackingNumber.trim()}`;
      window.open(postExUrl, "_blank");
      setLoading(false);
    }, 1500);
  };

  const clearInput = () => {
    setTrackingNumber("");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white flex flex-col overflow-hidden">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 flex-1 flex flex-col justify-center items-center">
        {/* Animated Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gray-50/30 -z-20" />
        <motion.div
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gray-100 rounded-full blur-[100px] -z-10"
        />
        <motion.div
          style={{ y: y2 }}
          animate={{
            x: [-20, 20, -20],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gray-200 rounded-full blur-[120px] -z-10"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 shadow-sm cursor-default"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span>Partner: PostEx</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-[0.9]">
              Track Your{" "}
              <span className="font-serif italic font-medium relative inline-block">
                Order.
                {/* Underline Decoration */}
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-1 left-0 h-1 bg-black/10 rounded-full"
                />
              </span>
            </h1>

            <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed font-light mb-12">
              Enter your tracking number below to establish a secure connection
              with our logistics partner.
            </p>

            {/* --- INTERACTIVE FORM --- */}
            <motion.form
              onSubmit={handleTrack}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`group bg-white p-2 rounded-[2rem] border transition-all duration-500 max-w-xl mx-auto flex flex-col sm:flex-row gap-2 relative z-20 ${
                isFocused
                  ? "shadow-2xl shadow-gray-200 border-gray-300 ring-4 ring-gray-50"
                  : "shadow-xl shadow-gray-100 border-gray-100"
              }`}
            >
              <div className="flex-1 flex items-center px-6 h-16 relative">
                {/* Icon changes color on focus */}
                <div
                  className={`mr-4 transition-colors duration-300 ${
                    isFocused || trackingNumber ? "text-black" : "text-gray-300"
                  }`}
                >
                  {loading ? (
                    <ScanLine className="w-6 h-6 animate-pulse" />
                  ) : (
                    <Package className="w-6 h-6" />
                  )}
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tracking Number (e.g. 2842...)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full h-full bg-transparent outline-none text-gray-900 placeholder:text-gray-300 font-medium text-lg tracking-wide"
                  autoFocus
                />

                {/* Clear Button */}
                <AnimatePresence>
                  {trackingNumber && !loading && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      type="button"
                      onClick={clearInput}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || !trackingNumber}
                className="h-16 px-10 bg-black text-white rounded-[1.5rem] font-medium hover:bg-gray-900 transition-all disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-3 sm:w-auto w-full relative overflow-hidden"
              >
                {/* Button Content */}
                <div className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <span>Track</span>
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </div>

                {/* Scanning Animation Effect inside Button */}
                {loading && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
                  />
                )}
              </motion.button>
            </motion.form>

            {/* Helper Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-2"
            >
              <Search className="w-3 h-3" />
              Find your Tracking ID in your shipping confirmation email/SMS.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
