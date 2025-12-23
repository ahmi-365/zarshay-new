"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  Sparkles,
  ChevronRight,
  Loader2,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

// --- INTERFACES ---
interface Product {
  id: number;
  name: string;
  image: string;
  category_id: number;
  brand_id: number;
  selling_price: number;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  unit: {
    id: number;
    name: string;
  };
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Search Logic States
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { scrollY } = useScroll();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // --- SOCIAL LINKS DATA ---
  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  ];

  // --- 1. FETCH PRODUCTS ON MOUNT ---
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.zarshay.com/api/all-products"
        );
        const data = await response.json();
        if (data.status === "success") {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // --- 2. FILTER LOGIC ---
  const filteredProducts = query.trim()
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const getImageUrl = (imageName: string) => {
    return `https://api.zarshay.com/public/assets/images/product/${imageName}`;
  };

  // --- SMART SCROLL LOGIC ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  // Handle "Enter" key redirect
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        setSearchOpen(false);
        router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Cart", href: "/cart" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ${
          searchOpen ? "shadow-none" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            {/* --- LEFT: LOGO --- */}
            <Link
              href="/"
              className={`flex items-center gap-2 group relative z-50 transition-opacity duration-300 ${
                searchOpen
                  ? "opacity-0 pointer-events-none md:opacity-100"
                  : "opacity-100"
              }`}
            >
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gray-900 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500" />
                  <Image
                    src="/images/Zrxyy.png"
                    alt="Zarshay"
                    width={140}
                    height={60}
                    className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* --- CENTER: DESKTOP MENU --- */}
            <div
              className={`hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
                searchOpen
                  ? "opacity-0 scale-90 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              {navLinks.map((link) => (
                <InteractiveLink
                  key={link.name}
                  href={link.href}
                  text={link.name}
                />
              ))}
            </div>

            {/* --- RIGHT: ICONS --- */}
            <div className="flex items-center gap-3 relative z-50">
              {/* EXPANDABLE SEARCH BAR CONTAINER */}
              <div
                className={`flex items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  searchOpen ? "w-[calc(100vw-48px)] absolute right-0" : "w-10"
                }`}
              >
                <div className="w-full relative">
                  <motion.div
                    layout
                    className={`relative flex items-center h-10 z-50 ${
                      searchOpen
                        ? "w-full bg-gray-100 rounded-full px-4"
                        : "w-10 bg-transparent"
                    }`}
                  >
                    <button
                      onClick={() => setSearchOpen(!searchOpen)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors z-10 ${
                        searchOpen
                          ? "text-black"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Search className="w-5 h-5" />
                    </button>

                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for products..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400 h-full transition-all duration-300 ${
                        searchOpen ? "flex-1 ml-2 opacity-100" : "w-0 opacity-0"
                      }`}
                    />

                    {searchOpen && (
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery(""); // Clear query on close
                        }}
                        className="p-2 text-gray-400 hover:text-black transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>

                  {/* --- LIVE SEARCH DROPDOWN RESULTS --- */}
                  <AnimatePresence>
                    {searchOpen && query.trim() && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-12 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-40"
                      >
                        {loading ? (
                          <div className="p-6 text-center text-gray-400">
                            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                            <span className="text-xs">Searching...</span>
                          </div>
                        ) : filteredProducts.length > 0 ? (
                          <div className="divide-y divide-gray-50">
                            {filteredProducts.map((product) => (
                              <Link
                                key={product.id}
                                href={`/shop?search=${encodeURIComponent(
                                  product.name
                                )}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setQuery("");
                                }}
                                className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors group"
                              >
                                <div className="w-10 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                                  <Image
                                    src={getImageUrl(product.image)}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-black transition-colors">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {product.category.name}
                                  </p>
                                </div>
                                <span className="text-xs font-bold text-gray-900">
                                  Rs. {product.selling_price}
                                </span>
                              </Link>
                            ))}
                            <Link
                              href={`/shop?search=${encodeURIComponent(query)}`}
                              onClick={() => setSearchOpen(false)}
                              className="block p-3 text-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                            >
                              View all results
                            </Link>
                          </div>
                        ) : (
                          <div className="p-6 text-center text-gray-400 text-sm">
                            No products found.
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ICONS (Hidden on Search) */}
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${
                  searchOpen
                    ? "opacity-0 translate-x-10 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <MagneticButton>
                  <Link
                    href="/cart"
                    className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors block"
                  >
                    <ShoppingBag className="w-5 h-5 text-gray-700" />
                    {/* Only show badge if items exist (optional logic) */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full ring-2 ring-white" />
                  </Link>
                </MagneticButton>

                <div className="md:hidden">
                  <MagneticButton>
                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Menu className="w-6 h-6 text-gray-900" />
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white text-black flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-serif italic tracking-tight">
                Zarshay.
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-4xl font-light tracking-tight hover:pl-4 transition-all duration-300 group"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SUB-COMPONENT: INTERACTIVE LINK ---
function InteractiveLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="group relative overflow-hidden h-5 block">
      <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[20px]">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 h-[20px] flex items-center">
          {text}
        </span>
        <span className="text-sm font-serif italic font-medium text-black h-[20px] flex items-center">
          {text}
        </span>
      </div>
    </Link>
  );
}

// --- SUB-COMPONENT: MAGNETIC BUTTON ---
function MagneticButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
