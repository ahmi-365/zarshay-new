"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Mail,
  MapPin,
  Phone,
  Package,
  Sparkles,
  Heart,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

// Cart Item Interface
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
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [emailNews, setEmailNews] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [note, setNote] = useState("");

  // Promo code state
  const [validatedPromoCode, setValidatedPromoCode] = useState<PromoCodeData | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate discount
  const discountAmount = validatedPromoCode ? 
    validatedPromoCode.discount_type === "percentage" 
      ? (subtotal * parseFloat(validatedPromoCode.discount_value)) / 100
      : parseFloat(validatedPromoCode.discount_value)
    : 0;

  const total = Math.max(0, subtotal - discountAmount);

  // Validate promo code
  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setIsValidatingPromo(true);
    setPromoError(null);

    try {
      const response = await fetch(`https://bloomix.majesticsofts.com/api/promo-code/discount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promo_code: promoCode.trim()
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to validate promo code");
      }

      const result: PromoCodeResponse = await response.json();

      if (result.status === "success") {
        const promoData = result.data;
        
        // Check if promo code is active
        const now = new Date();
        const startDate = new Date(promoData.start_date);
        const endDate = new Date(promoData.end_date);

        if (now < startDate) {
          setPromoError("This promo code is not yet active");
          return;
        }

        if (now > endDate) {
          setPromoError("This promo code has expired");
          return;
        }

        if (promoData.used_count >= promoData.usage_limit) {
          setPromoError("This promo code has reached its usage limit");
          return;
        }

        setValidatedPromoCode(promoData);
        setPromoError(null);
      } else {
        setPromoError("Invalid promo code");
      }
    } catch (err) {
      setPromoError("Invalid promo code");
    } finally {
      setIsValidatingPromo(false);
    }
  };

  // Remove promo code
  const removePromoCode = () => {
    setValidatedPromoCode(null);
    setPromoCode("");
    setPromoError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Transform cart items to products array
    const products = items.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }));

    // Prepare order data matching API payload
    const orderData: OrderData = {
      customer_name: firstName,
      customer_last_name: lastName,
      email: email,
      customer_phone: phone,
      customer_address: address,
      apartment: apartment || undefined,
      city: city,
      postal_code: postalCode || undefined,
      status: "pending",
      products: products,
      promo_code: validatedPromoCode?.code || undefined,
      note: note || undefined,
    };

    try {
      const response = await fetch("https://bloomix.majesticsofts.com/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order. Please try again.");
      }

      const result = await response.json();
      
      console.log("🎉 Order Placed Successfully!", result);

      localStorage.removeItem("cart");
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-auto transform animate-scale-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-light text-gray-800 mb-4">
            Order Confirmed!
          </h3>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6 border border-green-200">
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-medium text-green-600">Thank you, {firstName}!</p>
              <p>Your order has been successfully placed.</p>
{validatedPromoCode && (
  <div className="flex justify-between text-green-600 text-sm">
    <span>
      Discount ({validatedPromoCode.code})
      {validatedPromoCode.discount_type === "percentage" && 
        ` - ${validatedPromoCode.discount_value}%`
      }
    </span>
    <span>
      -Rs {discountAmount.toFixed(2)}
    </span>
  </div>
)}
              <p className="text-lg font-medium text-gray-800 mt-3">
                Total: <span className="text-teal-600">Rs {total.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600">Cash on Delivery</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <p>📧 Order confirmation sent to: {email}</p>
            <p>📦 Delivery to: {address}, {city}</p>
            <p>📞 Contact: {phone}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowSuccess(false)}
              className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-all duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.location.href = "/"}
              className="flex-1 border border-teal-600 text-teal-600 py-3 rounded-xl font-medium hover:bg-teal-50 transition-all duration-300"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation/>

      {/* Success Modal */}
      {showSuccess && <SuccessModal />}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-300/40 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            className={`max-w-3xl mx-auto text-center space-y-6 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <a href="/cart" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </a>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800">Checkout</h1>
            <p className="text-lg text-gray-600">Complete your order - Cash on Delivery</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-800">Contact Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNews}
                      onChange={(e) => setEmailNews(e.target.checked)}
                      className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">Email me with news and offers</span>
                  </label>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-800">Delivery</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">First name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Last name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street address"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apartment, suite, etc."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Postal code (optional)</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Postal code"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Phone</label>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                        <span className="text-lg">🇵🇰</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 3XX XXXXXXX"
                        required
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">Save this information for next time</span>
                  </label>
                </div>
              </div>

              {/* Payment Method - Cash on Delivery */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-800">Payment Method</h2>
                </div>

                <div className="p-6 rounded-xl border-2 border-teal-500 bg-teal-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong className="text-teal-700">Note:</strong> Please keep exact change ready. Our delivery partner will collect Rs {total.toFixed(2)} at the time of delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Notes */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-800">Delivery Notes</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Special instructions (optional)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="E.g., Please deliver between 5 PM to 8 PM"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Add any special delivery instructions or preferred delivery time
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-800">Promo Code</h2>
                </div>

                <div className="space-y-4">
{validatedPromoCode ? (
  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-800">
            Promo code applied: {validatedPromoCode.code}
          </span>
        </div>
        <p className="text-sm text-green-700">
          {validatedPromoCode.discount_type === "percentage" 
            ? `${validatedPromoCode.discount_value}% off` 
            : `Rs ${validatedPromoCode.discount_value} off`
          }
        </p>
      </div>
      <button
        type="button"
        onClick={removePromoCode}
        className="text-red-600 hover:text-red-700 text-sm font-medium"
      >
        Remove
      </button>
    </div>
  </div>
) : (
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="Enter promo code"
                          className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all uppercase"
                          disabled={isValidatingPromo}
                        />
                        <button
                          type="button"
                          onClick={validatePromoCode}
                          disabled={isValidatingPromo || !promoCode.trim()}
                          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isValidatingPromo ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                      {promoError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <p className="text-red-700 text-sm">{promoError}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Place Order Button */}
              <button 
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-medium text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </div>
                ) : (
                  `Place Order - Rs ${total.toFixed(2)}`
                )}
              </button>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 sticky top-32 shadow-lg">
                <h2 className="text-xl font-medium text-gray-800 mb-6">Order Summary</h2>

                {/* Product Items */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 text-sm">Your cart is empty</p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <span className="absolute -top-2 -right-2 w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600">{item.unit}</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            Rs {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toFixed(2)}</span>
                  </div>
                  
                  {validatedPromoCode && (
                    <div className="flex justify-between text-green-600 text-sm">
                      <span>Discount ({validatedPromoCode.code})</span>
                      <span>
                        -Rs {discountAmount.toFixed(2)}
                        {validatedPromoCode.discount_type === "percentage" && 
                          ` (${validatedPromoCode.discount_value}%)`
                        }
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">Total</span>
                  <span className="text-2xl font-medium text-teal-600">
                    Rs {total.toFixed(2)}
                  </span>
                </div>

                {validatedPromoCode && (
  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
    <p className="text-xs text-green-700 text-center">
      🎉 You saved Rs {discountAmount.toFixed(2)} 
      {validatedPromoCode.discount_type === "percentage" && 
        ` (${validatedPromoCode.discount_value}% off)`
      }!
    </p>
  </div>
)}
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer/>
    </div>
  );
}