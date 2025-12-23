"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Truck,
  Globe,
  Clock,
  MapPin,
  Package,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ShippingGuide() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gray-50/50 -z-10" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-[15%] w-[500px] h-[500px] bg-gray-100 rounded-full blur-[120px] -z-10 opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 shadow-sm">
              <Truck className="w-3 h-3" />
              <span>Worldwide Delivery</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-[0.9]">
              Shipping &{" "}
              <span className="font-serif italic font-medium">Delivery.</span>
            </h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              From our studio to your doorstep. We ensure your Zarshay pieces
              arrive safely, timely, and beautifully packaged.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- VISUAL PROCESS TIMELINE --- */}
      <section className="py-16 border-y border-gray-100 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              The Journey
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gray-200 -z-10" />

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Order Placed",
                  desc: "Confirmation email sent immediately.",
                  icon: CheckCircle2,
                },
                {
                  step: "02",
                  title: "Processing",
                  desc: "1-2 business days for preparation.",
                  icon: Package,
                },
                {
                  step: "03",
                  title: "Shipped",
                  desc: "Handed to courier with tracking.",
                  icon: Truck,
                },
                {
                  step: "04",
                  title: "Delivered",
                  desc: "Arrives at your doorstep.",
                  icon: MapPin,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-gray-900 group-hover:shadow-lg transition-all duration-500">
                    <item.icon className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SHIPPING OPTIONS --- */}
      <section className="py-24 bg-gray-50/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Shipping Methods
              </h2>
              <p className="text-gray-500 font-light">
                Choose the speed that suits your needs. We partner with reliable
                couriers to ensure the safety of your garments.
              </p>
            </div>
            {/* Visual decoration */}
            <div className="hidden md:block w-32 h-px bg-gray-200 mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Card */}
            <ShippingCard
              title="Standard Delivery"
              price="Free"
              time="3-5 Business Days"
              desc="Perfect for non-urgent orders. Available nationwide across Pakistan."
              features={[
                "Free on orders over Rs. 5000",
                "Full Tracking",
                "SMS Notifications",
              ]}
              icon={Truck}
              recommended
            />

            {/* Express Card */}
            <ShippingCard
              title="Express Delivery"
              price="Rs. 250"
              time="1-2 Business Days"
              desc="For when you need your look ready for the weekend."
              features={[
                "Priority Processing",
                "Next Day Dispatch",
                "Premium Handling",
              ]}
              icon={Clock}
            />
          </div>
        </div>
      </section>

      {/* --- FAQ / ADDITIONAL INFO --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* International Shipping */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">
                  International Shipping
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Yes, we ship globally! International shipping rates are
                  calculated at checkout based on your location and the weight
                  of your order.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• USA & Canada: 7-10 Business Days</li>
                  <li>• UK & Europe: 6-8 Business Days</li>
                  <li>• Middle East: 4-6 Business Days</li>
                </ul>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Tracking */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">Order Tracking</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Once your order is dispatched, you will receive an email and
                  SMS containing your tracking number and a link to trace your
                  package in real-time.
                </p>
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all"
                >
                  Track Your Order <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100" />

            {/* Delays */}
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">Potential Delays</h3>
                <p className="text-gray-600 leading-relaxed">
                  During sale periods, holidays, or unforeseen weather
                  conditions, dispatch may take an extra 1-2 business days. We
                  appreciate your patience and promise it will be worth the
                  wait.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENT: Shipping Card ---
function ShippingCard({
  title,
  price,
  time,
  desc,
  features,
  icon: Icon,
  recommended,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-8 md:p-10 rounded-[2rem] border transition-all duration-500 group ${
        recommended
          ? "bg-black text-white border-black shadow-2xl shadow-gray-200"
          : "bg-white text-gray-900 border-gray-100 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100"
      }`}
    >
      {recommended && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
          Recommended
        </div>
      )}

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
          recommended ? "bg-white/10 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-2xl font-medium mb-2">{title}</h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-light">{price}</span>
      </div>

      <div
        className={`inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-6 ${
          recommended ? "bg-white text-black" : "bg-gray-100 text-gray-900"
        }`}
      >
        {time}
      </div>

      <p
        className={`mb-8 leading-relaxed ${
          recommended ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {desc}
      </p>

      <ul className="space-y-3">
        {features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <CheckCircle2
              className={`w-4 h-4 ${recommended ? "text-white" : "text-black"}`}
            />
            <span className={recommended ? "text-gray-300" : "text-gray-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
