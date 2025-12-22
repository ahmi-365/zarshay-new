"use client";

import Link from "next/link";
import { Sparkles, Instagram, Heart, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-20 relative overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/40 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/40 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Contact Cards Section */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-white to-teal-50/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group border border-teal-100/50 hover:border-teal-200 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Mail className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Email Us</h3>
            <p className="text-sm text-gray-600 mb-4">Our team responds within 24 hours</p>
            <a
              href="mailto:hello@bloomix.com"
              className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-300 inline-flex items-center gap-1 group-hover:gap-2"
            >
              hello@bloomix.com
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </a>
          </div>

          <div className="bg-gradient-to-br from-white to-cyan-50/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group border border-cyan-100/50 hover:border-cyan-200 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <Phone className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Call Us</h3>
            <p className="text-sm text-gray-600 mb-4">Mon-Fri from 9am to 6pm</p>
            <a
              href="tel:+923001234567"
              className="text-teal-600 font-medium hover:text-teal-700 transition-colors duration-300 inline-flex items-center gap-1 group-hover:gap-2"
            >
              +92 300 1234567
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </a>
          </div>

          <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group border border-emerald-100/50 hover:border-emerald-200 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <MapPin className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Visit Us</h3>
            <p className="text-sm text-gray-600 mb-4">Come say hello at our store</p>
            <span className="text-teal-600 font-medium">Okara, Punjab, Pakistan</span>
          </div>
        </div> */}

        {/* Footer Content Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12 pt-12 border-t border-teal-200/50">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-3xl font-light text-gray-800 hover:text-teal-600 transition-colors duration-300 flex items-center gap-2 group"
            >
              <Sparkles className="w-6 h-6 text-teal-500 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative">
                Bloomix
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  viewBox="0 0 300 8"
                  fill="none"
                >
                  <path
                    d="M0 4C50 2 100 6 150 4C200 2 250 6 300 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-teal-500"
                  />
                </svg>
              </span>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed">
              Premium skincare with pure botanicals, designed to nourish and unveil your skin's radiant glow.
            </p>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-gray-800 relative inline-block">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
             <Link
              href="/return-policy"
              className="text-gray-600 hover:text-teal-600 transition-colors duration-300 relative group text-sm block w-fit"
            >
Return Policy              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed hover:text-gray-700 transition-colors duration-300">
              Discover the passion and vision behind Bloomix, where nature meets innovation for radiant skin.
            </p>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-gray-800 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </h3>
           <Link
              href="/contact"
              className="text-gray-600 hover:text-teal-600 transition-colors duration-300 relative group text-sm block w-fit"
            >
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed hover:text-gray-700 transition-colors duration-300">
              Reach out to our team for personalized assistance and skincare guidance.
            </p>
          </div>

         {/* Social Media Section */}
<div className="space-y-4">
  <h3 className="font-medium text-lg text-gray-800 relative inline-block">
    Connect With Us
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
  </h3>

  <p className="text-gray-600 text-sm leading-relaxed hover:text-gray-700 transition-colors duration-300">
    Follow us on social media for skincare tips and exclusive offers.
  </p>

  <div className="flex gap-4">
    {/* Instagram */}
    <a
      href="https://www.instagram.com/bloomixpk?igsh=MTFlejFpbnJhOGNlNA=="
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 group shadow-sm border border-teal-200 hover:shadow-md hover:-translate-y-1"
    >
      <Instagram className="w-5 h-5 text-teal-500 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
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
    {/* TikTok */}
    <a
      href="https://www.tiktok.com/@bloomixpk"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-teal-500 hover:text-white transition-all duration-300 group shadow-sm border border-teal-200 hover:shadow-md hover:-translate-y-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="w-5 h-5 text-teal-500 group-hover:text-white group-hover:scale-110 transition-all duration-300"
        viewBox="0 0 16 16"
      >
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
      </svg>
    </a>

   
  </div>
</div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-teal-200/50">
          <p className="text-gray-600 text-sm text-center flex items-center justify-center gap-2 flex-wrap">
            © 2025 Bloomix. All rights reserved. Made with
            <Heart className="w-4 h-4 text-teal-500 animate-pulse" /> in Pakistan.
          </p>
        </div>
      </div>
    </footer>
  );
}