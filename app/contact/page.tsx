// app/support/contact/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Instagram,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  contactId?: string;
  timestamp?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiPayload = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch(
        "https://api.zarshay.com/api/contact-message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiPayload),
        }
      );

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to send message. Please try again."
        );
      }

      console.log("🎉 Contact Form Submitted Successfully!", {
        contactId: result.contactId || "CONTACT-" + Date.now(),
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: "received",
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Modal
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl border border-gray-100"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-200">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Message Received
          </h3>
          <p className="text-gray-500 mb-6">
            Thanks {formData.name}, we'll be in touch shortly.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
          >
            Close Window
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navigation />
      <AnimatePresence>{isSubmitted && <SuccessModal />}</AnimatePresence>

      <div className="pt-32 pb-20 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN: Content & Info (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
            {/* Header Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-600 mb-6">
                <span className="w-2 h-2 rounded-full bg-gray-900 animate-pulse"></span>
                Support & Inquiries
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6 tracking-tight">
                Let's start a <br />
                <span className="font-semibold italic font-serif">
                  conversation.
                </span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed border-l-2 border-gray-200 pl-6">
                Whether you have a question about our products, need style
                advice, or just want to say hello, we're here to help.
              </p>
            </motion.div>

            {/* Contact Details List (Replaced Cards) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all duration-300">
                  <div className="p-3 bg-gray-100 text-gray-900 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Chat to us
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">
                      Our friendly team is here to help.
                    </p>
                    <a
                      href="mailto:support@zarshay.com"
                      className="text-sm font-semibold text-gray-900 hover:underline"
                    >
                      support@zarshay.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all duration-300">
                  <div className="p-3 bg-gray-100 text-gray-900 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Visit us</h4>
                    <p className="text-sm text-gray-500 mb-1">
                      Come say hello at our office HQ.
                    </p>
                    <a
                      href="#"
                      className="text-sm font-semibold text-gray-900 hover:underline"
                    >
                      Okara, Punjab, Pakistan
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all duration-300">
                  <div className="p-3 bg-gray-100 text-gray-900 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Call us</h4>
                    <p className="text-sm text-gray-500 mb-1">
                      Mon-Fri from 9am to 6pm.
                    </p>
                    <a
                      href="tel:+923192225322"
                      className="text-sm font-semibold text-gray-900 hover:underline"
                    >
                      +92 319 2225322
                    </a>
                  </div>
                </div>
              </div>

              {/* Socials & Hours Mini Section */}
              <div className="pt-8 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/bloomixpk?igsh=MTFlejFpbnJhOGNlNA=="
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/Bloomixpk/"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@bloomixpk"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="w-4 h-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="mb-10">
                  <h2 className="text-2xl font-light text-gray-900">
                    Send a message
                  </h2>
                  <div className="h-1 w-12 bg-gray-900 mt-4 rounded-full"></div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3"
                    >
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-800 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 group-focus-within:text-gray-900 transition-colors"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pb-3 border-b border-gray-200 bg-transparent focus:border-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 text-gray-900 text-lg"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 group-focus-within:text-gray-900 transition-colors"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pb-3 border-b border-gray-200 bg-transparent focus:border-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 text-gray-900 text-lg"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 group-focus-within:text-gray-900 transition-colors"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pb-3 border-b border-gray-200 bg-transparent focus:border-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 text-gray-900 text-lg"
                        placeholder="+92 300..."
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="subject"
                        className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 group-focus-within:text-gray-900 transition-colors"
                      >
                        Topic
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pb-3 border-b border-gray-200 bg-transparent focus:border-gray-900 outline-none transition-all duration-300 text-gray-900 text-lg cursor-pointer"
                      >
                        <option value="" className="text-gray-400">
                          Select a subject...
                        </option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="order-status">Order Status</option>
                        <option value="fashion-advice">Fashion Advice</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 group-focus-within:text-gray-900 transition-colors"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-gray-300 focus:ring-0 outline-none transition-all duration-300 resize-none text-gray-900 leading-relaxed"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gray-900 text-white px-10 py-6 rounded-full font-medium text-base hover:bg-black transition-all duration-300 hover:shadow-xl hover:shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
