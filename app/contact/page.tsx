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
  MessageCircle,
  Instagram,
  Sparkles,
  CheckCircle2,
  XCircle,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  try {
    // Transform the data to match API expectations
    const apiPayload = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    // API call to submit contact form
    const response = await fetch("https://bloomix.majesticsofts.com/api/contact-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send message. Please try again.");
    }

    // Log success to console with beautiful formatting
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
      estimatedResponse: "within 24 hours"
    });

    // Show success state
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);

  } catch (err) {
    setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full mx-auto"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-light text-gray-800 mb-4">
            Message Sent!
          </h3>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6 border border-green-200">
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-medium text-green-600">Thank you, {formData.name}!</p>
              <p>Your message has been successfully delivered to our team.</p>
              <div className="mt-3 space-y-1 text-xs">
                <p>📧 We'll respond to: <strong>{formData.email}</strong></p>
                <p>⏰ Typically within 24 hours</p>
                {/* <p>📋 Subject: <strong>{formData.subject}</strong></p> */}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-all duration-300"
            >
              Send Another Message
            </button>
            <button
              onClick={() => window.location.href = "/"}
              className="flex-1 border border-teal-600 text-teal-600 py-3 rounded-xl font-medium hover:bg-teal-50 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && <SuccessModal />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/40 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-teal-600 text-sm uppercase tracking-wider font-medium mb-4">
                Get in Touch
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-6">
                We'd Love to
                <br />
                <span className="text-teal-500 relative">
                  Hear From You
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M0 6C50 2 100 10 150 6C200 2 250 10 300 6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Have questions about our products or need skincare advice? Our team is here to help
                you achieve your most radiant skin.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Mail,
                title: "Email Us",
                desc: "Our team responds within 24 hours",
                contact: "support@bloomix.com",
                link: "mailto:support@bloomix.com",
              },
              {
                icon: Phone,
                title: "Call Us",
                desc: "Mon-Fri from 9am to 6pm",
                contact: "+92 319 2225322",
                link: "tel:+923192225322",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                desc: "Come say hello at our store",
                contact: "Okara, Punjab, Pakistan",
                link: "#",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                <a
                  href={item.link}
                  className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-300"
                >
                  {item.contact}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Info Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-100 rounded-full blur-2xl opacity-30"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-light text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                    >
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-800 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-status">Order Status</option>
                      <option value="skincare-advice">Skincare Advice</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-medium text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Inline Success Message */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <p className="text-teal-800 text-sm">
                        Thank you for reaching out! We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-8 h-8 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-4">Business Hours</h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex justify-between">
                        <span className="font-medium">Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Saturday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Sunday:</span>
                        <span>Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Sparkles className="w-8 h-8 text-teal-500" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-xl font-medium text-gray-800 mb-4">Connect With Us</h3>
                    <p className="text-gray-600 mb-6">
                      Follow us on social media for skincare tips, product launches, and exclusive
                      offers.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="https://www.instagram.com/bloomixpk?igsh=MTFlejFpbnJhOGNlNA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 group"
                      >
                        <Instagram className="w-5 h-5 text-teal-500 group-hover:text-white" />
                      </a>
                      {/* Facebook */}
    <a
      href="https://www.facebook.com/Bloomixpk/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 group shadow-sm border border-teal-200 hover:shadow-md hover:-translate-y-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-teal-500 group-hover:text-white group-hover:scale-110 transition-all duration-300"
      >
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"/>
      </svg>
    </a>
                      <a
                        href="https://www.tiktok.com/@bloomixpk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-5 h-5 text-teal-500 group-hover:text-white"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}