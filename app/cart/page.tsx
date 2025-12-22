"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ArrowLeft, Trash2, Menu, X, ShoppingCart } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function CartPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Cart Header */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800">
            Shopping Cart
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-light text-gray-800 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start shopping to add items to your cart
              </p>
              <Link href="/shop">
                <Button className="btn-primary">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-6 border-b border-gray-200 pb-6 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-300"
                    >
                      <Link href={`/shop/${item.id}`}>
                        <div className="relative w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform"
                          />
                        </div>
                      </Link>

                      <div className="flex-1">
                        <Link href={`/shop/${item.id}`}>
                          <h3 className="font-medium text-gray-800 hover:text-teal-600 transition-colors mb-2">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-4">
                          Rs. {item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-gray-800 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-medium text-gray-800">
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={clearCart}
                  className="mt-8 text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 sticky top-32">
                  <h2 className="text-xl font-medium text-gray-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="text-lg font-medium text-gray-800">
                      Total
                    </span>
                    <span className="text-2xl font-medium text-teal-600">
                      {total.toFixed(2)}
                    </span>
                  </div>

                  <Link href="/checkout">
                    <Button className="btn-secondary w-full mb-4">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button className="btn-secondary w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}