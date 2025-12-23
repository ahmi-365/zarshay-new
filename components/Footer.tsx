"use client";

import Link from "next/link";
import {
  Sparkles,
  Instagram,
  Heart,
  ArrowUp,
  Facebook,
  Send,
  Twitter,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "Return Policy", href: "/return-policy" },
      { name: "Shipping Guide", href: "/shipping" },
      { name: "Track Order", href: "/track" },
      { name: "Size Charts", href: "/size-charts" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-white text-gray-900 pt-16 pb-8 relative overflow-hidden border-t border-gray-100">
      {/* Background Watermark (Subtle Gray) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none opacity-[0.02]">
        <h1 className="text-[20vw] font-bold text-center leading-none tracking-tighter text-black select-none">
          ZARSHAY
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Grid */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          {/* Brand Column (Wider) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white group-hover:rotate-180 transition-transform duration-700 ease-out shadow-lg shadow-gray-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif italic tracking-tight font-medium">
                Zarshay.
              </span>
            </Link>

            <p className="text-gray-500 leading-relaxed max-w-sm text-base font-light">
              Redefining modest fashion with premium cuts and fabrics. Designed
              in Pakistan for the modern, confident woman.
            </p>

            <div className="flex gap-2.5 pt-2">
              <SocialIcon
                icon={Instagram}
                href="https://instagram.com"
                label="Instagram"
              />
              <SocialIcon
                icon={Facebook}
                href="https://facebook.com"
                label="Facebook"
              />
              <SocialIcon
                icon={Send}
                href="https://tiktok.com"
                label="TikTok"
              />
              <SocialIcon
                icon={Twitter}
                href="https://twitter.com"
                label="Twitter"
              />
            </div>
          </div>

          {/* Spacer Column */}
          <div className="hidden md:block md:col-span-1" />

          {/* Links Columns (Rebalanced) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <FooterLink
                  key={link.name}
                  href={link.href}
                  label={link.name}
                />
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 text-gray-400">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <FooterLink
                  key={link.name}
                  href={link.href}
                  label={link.name}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs flex items-center gap-1.5">
            © 2025 Zarshay. Made with{" "}
            <Heart className="w-3.5 h-3.5 text-gray-900 fill-gray-900 animate-pulse" />{" "}
            in Pakistan.
          </p>

          <button
            onClick={scrollToTop}
            // Added md:mr-6 to shift it left on desktop screens
            className="group flex items-center gap-2 text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors px-5 py-2.5 rounded-full hover:bg-gray-50 md:mr-24"
          >
            Back to Top
            <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center group-hover:-translate-y-1 group-hover:bg-gray-900 group-hover:border-gray-900 group-hover:text-white transition-all duration-300">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

// --- Sub Components ---

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-fit"
      >
        <span className="relative overflow-hidden">
          {label}
          <span className="absolute left-0 bottom-0 w-full h-px bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
        </span>
      </Link>
    </li>
  );
}

function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 overflow-hidden transition-all duration-300 hover:border-gray-900"
    >
      <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <Icon className="w-4 h-4 relative z-10 group-hover:text-white transition-colors duration-300" />
    </a>
  );
}
