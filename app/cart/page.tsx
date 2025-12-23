"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  Tag,
  Gift,
  Check,
} from "lucide-react";
import { useState, useRef } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  // Free Shipping Logic
  const FREE_SHIPPING_THRESHOLD = 5000;
  const progressPercent = Math.min(
    (total / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );
  const remaining = FREE_SHIPPING_THRESHOLD - total;
  const isFreeShipping = remaining <= 0;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-20 container mx-auto px-6 lg:px-12">
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-[0.9]">
              Your{" "}
              <span className="font-serif italic font-medium">Selection.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-right hidden md:block"
          >
            <p className="text-lg font-medium">{items.length} items</p>
            <NumberTicker
              value={total}
              className="text-sm text-gray-400"
              prefix="Total: Rs. "
            />
          </motion.div>
        </div>

        {items.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 relative">
            {/* --- LEFT COLUMN: ITEMS --- */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              {/* INTERACTIVE SHIPPING BAR */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-2xl p-6 border transition-colors duration-500 ${
                  isFreeShipping
                    ? "bg-black text-white border-black"
                    : "bg-gray-50 text-gray-900 border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        isFreeShipping ? "bg-white/20" : "bg-white"
                      }`}
                    >
                      {isFreeShipping ? (
                        <Gift className="w-5 h-5 animate-bounce" />
                      ) : (
                        <Truck className="w-5 h-5" />
                      )}
                    </div>
                    <p className="text-sm font-medium">
                      {isFreeShipping ? (
                        <span>
                          Congratulations! You've unlocked{" "}
                          <strong>Free Express Shipping</strong>
                        </span>
                      ) : (
                        <span>
                          Add{" "}
                          <strong className="text-black">
                            Rs. {remaining.toFixed(0)}
                          </strong>{" "}
                          to unlock Free Shipping
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-xs font-bold">
                    {progressPercent.toFixed(0)}%
                  </span>
                </div>

                <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className={`h-full rounded-full relative ${
                      isFreeShipping ? "bg-white" : "bg-black"
                    }`}
                  >
                    {/* Shimmer Effect */}
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* ITEMS LIST */}
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      index={index}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* --- RIGHT COLUMN: SUMMARY (Sticky) --- */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-32 space-y-6">
                <OrderSummary total={total} />

                {/* Promo Code Accordion */}

                {/* Trust Badges */}
                <div className="flex justify-center gap-6 opacity-50 grayscale transition-opacity hover:opacity-100">
                  <Badge icon={ShieldCheck} text="Secure" />
                  <Badge icon={Truck} text="Fast" />
                  <Badge icon={CreditCard} text="Encrypted" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// --- SUB-COMPONENT: Parallax Cart Item ---
function CartItem({ item, index, updateQuantity, removeFromCart }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set((mouseX - width / 2) / 20);
      y.set((mouseY - height / 2) / 20);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group flex gap-6 p-4 bg-white rounded-[1.5rem] border border-gray-100 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 items-start md:items-center relative overflow-hidden"
    >
      {/* 3D Parallax Image Container */}
      <div
        ref={ref}
        className="w-24 h-32 md:w-32 md:h-40 shrink-0 bg-gray-100 rounded-xl overflow-hidden relative perspective-500"
      >
        <motion.div style={{ x, y }} className="w-full h-full relative">
          <Link href={`/shop/${item.id}`}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover scale-110"
            />
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href={`/shop/${item.id}`}>
            <h3 className="text-lg font-medium text-gray-900 leading-tight hover:text-gray-600 transition-colors">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500">Unit Price: Rs. {item.price}</p>
        </div>

        <div className="flex items-center justify-between md:gap-8 w-full md:w-auto">
          {/* Interactive Quantity */}
          <div className="flex items-center bg-gray-50 rounded-full h-10 px-1 border border-gray-200 group-hover:border-black/20 transition-colors">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-30 transition-colors active:scale-90"
            >
              <Minus className="w-3 h-3" />
            </button>

            {/* Number Slide Animation */}
            <div className="w-6 h-6 overflow-hidden relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={item.quantity}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-sm font-bold"
                >
                  {item.quantity}
                </motion.span>
              </AnimatePresence>
            </div>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors active:scale-90"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right min-w-[80px]">
            <NumberTicker
              value={item.price * item.quantity}
              className="font-bold text-gray-900"
              prefix="Rs. "
            />
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// --- SUB-COMPONENT: Order Summary ---
function OrderSummary({ total }: { total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[#050505] text-white p-8 rounded-[2rem] shadow-2xl shadow-gray-200 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <h2 className="text-2xl font-light mb-8 relative z-10">Order Summary</h2>

      <div className="space-y-4 mb-8 text-sm relative z-10">
        <div className="flex justify-between text-gray-400">
          <span>Subtotal</span>
          <NumberTicker value={total} className="text-white" prefix="Rs. " />
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Shipping</span>
          <span className="text-white">Calculated next</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Tax</span>
          <span className="text-white">Included</span>
        </div>
      </div>

      <div className="border-t border-white/20 pt-6 mb-8 relative z-10">
        <div className="flex justify-between items-end">
          <span className="text-lg font-light">Total</span>
          <NumberTicker
            value={total}
            className="text-3xl font-medium tracking-tight"
            prefix="Rs. "
          />
        </div>
      </div>

      <Link href="/checkout" className="block relative z-10">
        <MagneticButton className="w-full bg-white text-black h-16 rounded-xl text-lg hover:bg-gray-200 transition-all flex items-center justify-between px-6 group">
          <span className="font-medium">Proceed to Checkout</span>
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </MagneticButton>
      </Link>
    </motion.div>
  );
}


// --- SUB-COMPONENT: Magnetic Button ---
function MagneticButton({ children, className }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.1);
      y.set((e.clientY - centerY) * 0.1);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- SUB-COMPONENT: Number Ticker (Animates numbers up/down) ---
function NumberTicker({
  value,
  className,
  prefix = "",
}: {
  value: number;
  className?: string;
  prefix?: string;
}) {
  return (
    <span className={className}>
      {prefix}
      {value.toFixed(2)}
    </span>
  );
}

// --- SUB-COMPONENT: Trust Badge ---
function Badge({ icon: Icon, text }: any) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Icon className="w-5 h-5" />
      <span className="text-[10px] uppercase tracking-wider">{text}</span>
    </div>
  );
}

// --- SUB-COMPONENT: Empty State ---
function EmptyCartState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative"
      >
        <div className="absolute inset-0 bg-gray-100 rounded-full animate-ping opacity-20" />
        <ShoppingBag className="w-12 h-12 text-gray-300" />
      </motion.div>
      <h2 className="text-3xl font-light text-gray-900 mb-4">
        Your bag is empty
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
        Your wardrobe is waiting for an upgrade. Explore our latest collection
        of premium fabrics and cuts.
      </p>
      <Link href="/shop">
        <Button className="bg-black text-white px-10 py-6 rounded-full hover:bg-gray-800 transition-all text-base shadow-xl hover:shadow-2xl">
          Explore Collection
        </Button>
      </Link>
    </motion.div>
  );
}
