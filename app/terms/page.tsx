"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Scale,
  FileCheck,
  ShoppingBag,
  CreditCard,
  Copyright,
  AlertTriangle,
  Gavel,
  RefreshCcw,
  Globe,
} from "lucide-react";

export default function TermsOfService() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gray-50/30 -z-10" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-gray-100 rounded-full blur-[100px] -z-10 opacity-60"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-10 right-[10%] w-[400px] h-[400px] bg-gray-200 rounded-full blur-[120px] -z-10 opacity-40"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 shadow-sm">
              <Scale className="w-3 h-3" />
              <span>Legal Agreement</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-[0.9]">
              Terms of{" "}
              <span className="font-serif italic font-medium">Service.</span>
            </h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light mb-8">
              Please read these terms carefully before accessing or using our
              website. By accessing or using any part of the site, you agree to
              be bound by these Terms of Service.
            </p>

            <div className="inline-block text-xs font-medium text-gray-400 border-b border-gray-200 pb-1">
              Last Updated: December 23, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID CONTENT --- */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 1. Overview (Full Width on Mobile, Span 2 on Desktop) */}
            <TermCard
              className="md:col-span-2"
              icon={FileCheck}
              title="1. Overview"
              delay={0.1}
            >
              <p className="text-gray-600 leading-relaxed">
                This website is operated by <strong>Zarshay</strong>. Throughout
                the site, the terms "we", "us" and "our" refer to Zarshay. We
                offer this website, including all information, tools, and
                services available from this site to you, the user, conditioned
                upon your acceptance of all terms, conditions, policies, and
                notices stated here.
              </p>
            </TermCard>

            {/* 2. Products */}
            <TermCard
              icon={ShoppingBag}
              title="2. Products & Services"
              delay={0.2}
            >
              <p className="text-sm text-gray-600 leading-relaxed">
                We have made every effort to display as accurately as possible
                the colors and images of our products. We cannot guarantee that
                your computer monitor's display of any color will be accurate.
                We reserve the right to limit the sales of our products to any
                person or region.
              </p>
            </TermCard>

            {/* 3. Accuracy of Billing */}
            <TermCard icon={CreditCard} title="3. Billing Accuracy" delay={0.3}>
              <p className="text-sm text-gray-600 leading-relaxed">
                We reserve the right to refuse any order you place with us. In
                the event that we make a change to or cancel an order, we may
                attempt to notify you by contacting the e-mail and/or billing
                address/phone number provided at the time the order was made.
              </p>
            </TermCard>

            {/* 4. Intellectual Property (Span 2) */}
            <TermCard
              className="md:col-span-2"
              icon={Copyright}
              title="4. Intellectual Property"
              delay={0.4}
            >
              <p className="text-gray-600 leading-relaxed mb-4">
                All content included on this site, such as text, graphics,
                logos, button icons, images, audio clips, digital downloads,
                data compilations, and software, is the property of{" "}
                <strong>Zarshay</strong> or its content suppliers and protected
                by international copyright laws.
              </p>
              <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-500 font-medium">
                You may not reproduce, duplicate, copy, sell, resell or exploit
                any portion of the Service without express written permission by
                us.
              </div>
            </TermCard>

            {/* 5. Limitation of Liability */}
            <TermCard
              icon={AlertTriangle}
              title="5. Limitation of Liability"
              delay={0.5}
            >
              <p className="text-sm text-gray-600 leading-relaxed">
                In no case shall Zarshay, our directors, officers, employees,
                affiliates, agents, contractors, or interns be liable for any
                injury, loss, claim, or any direct, indirect, incidental,
                punitive, or consequential damages of any kind.
              </p>
            </TermCard>

            {/* 6. Governing Law */}
            <TermCard icon={Gavel} title="6. Governing Law" delay={0.6}>
              <p className="text-sm text-gray-600 leading-relaxed">
                These Terms of Service and any separate agreements whereby we
                provide you Services shall be governed by and construed in
                accordance with the laws of <strong>Pakistan</strong>.
              </p>
            </TermCard>

            {/* 7. Changes to Terms (Span 2) */}
            <TermCard
              className="md:col-span-2"
              icon={RefreshCcw}
              title="7. Changes to Terms"
              delay={0.7}
            >
              <p className="text-gray-600 leading-relaxed">
                You can review the most current version of the Terms of Service
                at any time at this page. We reserve the right, at our sole
                discretion, to update, change or replace any part of these Terms
                of Service by posting updates and changes to our website. It is
                your responsibility to check our website periodically for
                changes.
              </p>
            </TermCard>
          </div>
        </div>
      </section>

      {/* --- AGREEMENT BANNER --- */}
      <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light">
              Questions regarding the Terms?
            </h2>
            <p className="text-gray-400 font-light text-lg">
              We are happy to clarify any points regarding our service
              agreement.
            </p>

            <div className="flex justify-center pt-4">
              <a
                href="/contact"
                className="inline-block border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all"
              >
                Contact Legal Team
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENT: Term Card ---
function TermCard({ icon: Icon, title, children, className, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-gray-50/50 rounded-[2rem] p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-500 group ${className}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-500">
          <Icon className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
      </div>

      <div className="text-gray-600">{children}</div>
    </motion.div>
  );
}
