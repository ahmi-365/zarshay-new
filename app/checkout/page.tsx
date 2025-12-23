"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Truck,
  CreditCard,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Interfaces ---
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  brand: string;
  unit: string;
}

interface OrderData {
  customer_name: string;
  customer_last_name: string;
  email: string;
  customer_phone: string;
  customer_address: string;
  apartment?: string;
  city: string;
  postal_code?: string;
  status: string;
  products: { product_id: number; quantity: number }[];
  promo_code?: string;
  note?: string;
}

interface PromoCodeData {
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: string;
  usage_limit: number;
  used_count: number;
  start_date: string;
  end_date: string;
}

interface PromoCodeResponse {
  status: string;
  data: PromoCodeData;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [emailNews, setEmailNews] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [note, setNote] = useState("");

  // Promo Code State
  const [validatedPromoCode, setValidatedPromoCode] =
    useState<PromoCodeData | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = validatedPromoCode
    ? validatedPromoCode.discount_type === "percentage"
      ? (subtotal * parseFloat(validatedPromoCode.discount_value)) / 100
      : parseFloat(validatedPromoCode.discount_value)
    : 0;

  const total = Math.max(0, subtotal - discountAmount);

  // --- Handlers ---

  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError("Enter a code");
      return;
    }
    setIsValidatingPromo(true);
    setPromoError(null);

    try {
      const response = await fetch(
        `https://api.zarshay.com/api/promo-code/discount`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ promo_code: promoCode.trim() }),
        }
      );

      if (!response.ok) throw new Error("Invalid code");
      const result: PromoCodeResponse = await response.json();

      if (result.status === "success") {
        setValidatedPromoCode(result.data);
      } else {
        setPromoError("Invalid code");
      }
    } catch (err) {
      setPromoError("Invalid code");
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const products = items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData: OrderData = {
      customer_name: firstName,
      customer_last_name: lastName,
      email,
      customer_phone: phone,
      customer_address: address,
      apartment: apartment || undefined,
      city,
      postal_code: postalCode || undefined,
      status: "pending",
      products,
      promo_code: validatedPromoCode?.code,
      note: note || undefined,
    };

    try {
      const response = await fetch("https://api.zarshay.com/api/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to place order.");

      localStorage.removeItem("cart");
      setShowSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error placing order");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Components ---

  const OrderSummaryContent = () => (
    <div className="space-y-4">
      {/* Items List */}
      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center group">
            <div className="relative w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-white/5 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-0 right-0 bg-gray-500/80 backdrop-blur text-white text-[10px] px-1.5 py-0.5 rounded-bl-lg font-medium">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors truncate">
                {item.name}
              </p>
              <p className="text-xs text-white/50">{item.brand}</p>
            </div>
            <p className="text-sm font-medium text-white whitespace-nowrap">
              Rs {Math.round(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="h-px bg-white/10 w-full" />

      {/* Promo Code Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="Discount code or gift card"
          disabled={!!validatedPromoCode}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors uppercase"
        />
        <button
          onClick={
            validatedPromoCode
              ? () => {
                  setValidatedPromoCode(null);
                  setPromoCode("");
                }
              : validatePromoCode
          }
          disabled={!promoCode || isValidatingPromo}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            validatedPromoCode
              ? "bg-red-500/20 text-red-200 hover:bg-red-500/30 border border-red-500/20"
              : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
          }`}
        >
          {validatedPromoCode ? "Remove" : isValidatingPromo ? "..." : "Apply"}
        </button>
      </div>
      {promoError && <p className="text-xs text-red-400 mt-1">{promoError}</p>}
      {validatedPromoCode && (
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 p-2 rounded-lg border border-emerald-400/20">
          <CheckCircle2 className="w-3 h-3" />
          Code <b>{validatedPromoCode.code}</b> applied
        </div>
      )}

      <div className="h-px bg-white/10 w-full" />

      {/* Totals */}
      <div className="space-y-2 text-sm text-white/70">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-white">Rs {subtotal.toLocaleString()}</span>
        </div>
        {validatedPromoCode && (
          <div className="flex justify-between text-emerald-400">
            <span>Discount</span>
            <span>- Rs {discountAmount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/80">
            Calculated next step
          </span>
        </div>
      </div>

      <div className="h-px bg-white/10 w-full" />

      <div className="flex justify-between items-baseline">
        <span className="text-lg font-medium text-white">Total</span>
        <div className="text-right">
          <span className="text-xs text-white/50 mr-2">PKR</span>
          <span className="text-2xl font-semibold text-white tracking-tight">
            {total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );

  const InputField = ({
    label,
    value,
    onChange,
    type = "text",
    required = false,
    placeholder = "",
    className = "",
  }: any) => (
    <div className={`relative group ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full bg-white border border-gray-200 rounded-lg px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
      />
      <label className="absolute left-4 top-1.5 text-[10px] text-gray-500 font-medium uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-gray-800 peer-focus:font-bold pointer-events-none">
        {label}
      </label>
    </div>
  );

  // --- Render ---

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Order Confirmed
            </h1>
            <p className="text-gray-500">
              Thank you, {firstName}. We've sent the receipt to {email}.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-medium text-gray-900">
                Rs {total.toLocaleString()} (COD)
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping To</span>
              <span className="font-medium text-gray-900 text-right max-w-[200px] truncate">
                {address}, {city}
              </span>
            </div>
          </div>
          <Link
            href="/shop"
            className="block w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-black transition-all"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white overflow-x-hidden">
      {/* 1. Mobile Order Summary Toggle (Visible only on mobile) */}
      <div className="lg:hidden bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-serif italic font-bold text-white tracking-tighter"
          >
            Zarshay.
          </Link>
          <button
            onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
            className="flex items-center gap-2 text-sm text-emerald-400 font-medium"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isMobileSummaryOpen ? "Hide" : "Show"} Order Summary</span>
            {isMobileSummaryOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <span className="text-white ml-1">Rs {total.toLocaleString()}</span>
          </button>
        </div>

        <AnimatePresence>
          {isMobileSummaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#0a0a0a] border-t border-white/10 overflow-hidden"
            >
              <div className="p-6">
                <OrderSummaryContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Left Column: Desktop Order Summary (Sticky & Full Height) */}
      {/* h-screen + sticky top-0 ensures it stays locked to the viewport */}
      <aside className="hidden lg:flex flex-col w-[45%] bg-[#0a0a0a] border-r border-white/5 h-screen sticky top-0 z-10">
        <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-hidden">
          {/* Branding */}
          <div className="mb-4 flex-shrink-0">
            <Link
              href="/"
              className="text-3xl font-serif italic font-bold text-white tracking-tighter hover:text-gray-300 transition-colors"
            >
              Zarshay.
            </Link>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-hidden pr-4">
            <OrderSummaryContent />
          </div>

          {/* Trust Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 flex gap-4 text-xs text-white/40 flex-shrink-0">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Secure Checkout
            </span>
            <span>Returns Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </aside>

      {/* 3. Right Column: Forms & Data Entry */}
      <main className="flex-1 w-full bg-white overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 md:p-12 lg:p-20 lg:pt-24">
          {/* Desktop Breadcrumb */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link
                href="/cart"
                className="hover:text-gray-900 transition-colors"
              >
                Cart
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact Section */}
            <section>
              <div className="mb-4">
                <h2 className="text-xl font-medium text-gray-900">Contact</h2>
                {/* "Have an account?" text removed as requested */}
              </div>

              <div className="space-y-4">
                <InputField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  required
                />
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                      emailNews
                        ? "bg-black border-black"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {emailNews && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNews}
                    onChange={(e) => setEmailNews(e.target.checked)}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                    Email me with news and offers
                  </span>
                </label>
              </div>
            </section>

            {/* Shipping Section */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Delivery
              </h2>
              <div className="space-y-4">
                {/* Country Mock */}
                <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-500 text-sm flex justify-between cursor-not-allowed">
                  <span>Pakistan</span>
                  <span className="text-xs font-medium bg-gray-200 px-2 py-0.5 rounded">
                    International shipping coming soon
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    value={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                    required
                  />
                  <InputField
                    label="Last Name"
                    value={lastName}
                    onChange={(e: any) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <InputField
                  label="Address"
                  value={address}
                  onChange={(e: any) => setAddress(e.target.value)}
                  required
                />
                <InputField
                  label="Apartment, suite, etc. (optional)"
                  value={apartment}
                  onChange={(e: any) => setApartment(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="City"
                    value={city}
                    onChange={(e: any) => setCity(e.target.value)}
                    required
                  />
                  <InputField
                    label="Postal Code (optional)"
                    value={postalCode}
                    onChange={(e: any) => setPostalCode(e.target.value)}
                  />
                </div>

                <InputField
                  label="Phone"
                  type="tel"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  required
                  placeholder="+92 3XX..."
                />

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                      saveInfo
                        ? "bg-black border-black"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {saveInfo && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                    Save this information for next time
                  </span>
                </label>
              </div>
            </section>

            {/* Payment Section */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Payment
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div className="rounded-xl border border-gray-200 overflow-hidden">
                {/* Selected Option: COD */}
                <div className="bg-gray-50/50 p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-[5px] border-black bg-white"></div>
                    <span className="font-medium text-gray-900 text-sm">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                  <Truck className="w-5 h-5 text-gray-900" />
                </div>
                {/* COD Content */}
                <div className="bg-gray-50 p-6 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm mb-2">
                    <ShoppingBag className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 max-w-xs mx-auto">
                    You will pay <b>Rs {total.toLocaleString()}</b> in cash when
                    the courier delivers your order.
                  </p>
                </div>

                {/* Disabled Option: Card */}
                <div className="opacity-50 p-4 flex items-center justify-between bg-white cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                    <span className="font-medium text-gray-900 text-sm">
                      Credit Card (Coming Soon)
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Note */}
            <section>
              <InputField
                label="Delivery Instructions (Optional)"
                value={note}
                onChange={(e: any) => setNote(e.target.value)}
              />
            </section>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer / Submit */}
            <div className="pt-6 flex flex-col-reverse md:flex-row md:items-center justify-between gap-6">
              <Link
                href="/cart"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors justify-center md:justify-start"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to cart
              </Link>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="bg-black text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Complete Order <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>

            <div className="lg:hidden pt-8 border-t border-gray-100 text-center text-xs text-gray-400 pb-12">
              All rights reserved Zarshay © 2024
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
