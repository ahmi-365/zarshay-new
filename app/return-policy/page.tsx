"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Mail,
  Phone,
  Shield,
  Heart,
  Sparkles,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function ReturnPolicy() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation/>
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            className={`max-w-3xl mx-auto text-center space-y-6 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
              <RefreshCw className="w-10 h-10 text-teal-500" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800">
              Return Policy
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your satisfaction is our priority. We've made returns simple and
              hassle-free.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                title: "15-Day Returns",
                desc: "Return within 15 days of delivery",
              },
              {
                icon: Package,
                title: "Easy Process",
                desc: "Simple steps to initiate your return",
              },
              {
                icon: CheckCircle,
                title: "Full Refund",
                desc: "Get your money back or exchange",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md">
                  <item.icon className="w-8 h-8 text-teal-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-20 bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Return Window */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
                    Return Window
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You have 15 days from the date of delivery to return your
                    Bloomix products. Items must be unused, unopened, and in
                    their original packaging to qualify for a full refund.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    For hygiene and safety reasons, we cannot accept returns on
                    opened skincare products. If you receive a damaged or
                    defective product, please contact us within 48 hours of
                    delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligible Items */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6">
                    Eligible for Return
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "Unopened products in original packaging",
                      "Products with factory seal intact",
                      "Items received damaged or defective",
                      "Wrong items shipped to you",
                      "Products within 15-day return window",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Eligible Items */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6">
                    Not Eligible for Return
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "Opened or used skincare products",
                      "Products without original packaging",
                      "Items purchased on sale or clearance",
                      "Products returned after 15 days",
                      "Gift sets with broken seals",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Return Process */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">
                    How to Return
                  </h2>
                  <p className="text-gray-600">
                    Follow these simple steps to process your return
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Contact Us",
                    desc: "Reach out via email or phone",
                  },
                  {
                    step: "02",
                    title: "Get Approval",
                    desc: "Receive return authorization",
                  },
                  {
                    step: "03",
                    title: "Ship Back",
                    desc: "Pack and send the items",
                  },
                  {
                    step: "04",
                    title: "Get Refund",
                    desc: "Receive your money back",
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="text-4xl font-light text-teal-500">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Information */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">
                    Refund Processing
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Once we receive your returned items, our team will inspect
                    them within 3-5 business days. If approved, your refund will
                    be processed to your original payment method.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Please allow 7-10 business days for the refund to appear in
                    your account, depending on your bank or card issuer.
                  </p>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 mt-6">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong className="text-teal-700">Note:</strong> Shipping
                      costs are non-refundable unless the return is due to our
                      error (wrong item, damaged product, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-light">
              Need Help with Your Return?
            </h2>
            <p className="text-lg text-white/90">
              Our customer support team is here to assist you with any questions
              about returns or exchanges.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Link href="/contact">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <Mail className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-medium mb-2">Email Us</h3>
                  <p className="text-white/80 text-sm">
                    Get a response within 24 hours
                  </p>
                </div>
              </Link>

              <Link href="/contact">
             
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <Phone className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-medium mb-2">Call Us</h3>
                  <p className="text-white/80 text-sm">Mon-Fri, 9am-6pm PKT</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

     <Footer/>
    </div>
  );
}