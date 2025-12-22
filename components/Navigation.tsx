// components/Navigation.tsx
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { Icon } from "@iconify/react";
import Image from "next/image";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-teal-100 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Bloomix.png"
              alt="Bloomix"
              width={250}
              height={100}
              className="h-20 w-auto scale-150 transform origin-left"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm text-gray-600">
            <Link
              href="/shop"
              className="hover:text-teal-500 transition-colors duration-300 relative group"
            >
              PRODUCT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/cart"
              className="hover:text-teal-500 transition-colors duration-300 relative group"
            >
              CART
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/contact"
              className="hover:text-teal-500 transition-colors duration-300 relative group"
            >
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right section (Search + Cart + Mobile Menu Button) */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="hidden sm:block">
              <SearchBar />
            </div>

            <Link
              href="/cart"
              className="flex items-center gap-1 hover:text-teal-500 transition-colors duration-300 relative"
            >
              <Icon icon="tabler:shopping-bag" width="20" height="20" />
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            </Link>

            <button
              className="md:hidden text-gray-600 hover:text-teal-500 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-teal-100 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4 text-sm text-gray-600">
              <Link
                href="/shop"
                className="hover:text-teal-500 transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                PRODUCT
              </Link>
              <Link
                href="/cart"
                className="hover:text-teal-500 transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                CART
              </Link>
              <Link
                href="/contact"
                className="hover:text-teal-500 transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
              <div className="py-2">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}