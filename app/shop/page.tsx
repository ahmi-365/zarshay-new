"use client";

import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Star,
  X,
  Plus,
  Minus,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useCart } from "@/lib/cart-context";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// --- Interfaces ---
interface ProductImage {
  id: number;
  product_id: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  sale?: number;
  note?: string;
  category_id: number;
  brand_id: number;
  selling_price: number;
  category: { id: number; name: string };
  brand: { id: number; name: string };
  unit: { id: number; name: string } | null;
  images: ProductImage[];
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Search & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );
  const [isSortOpen, setIsSortOpen] = useState(false);

  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Fetch Data
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://api.zarshay.com/api/all-products"
        );
        const data = await response.json();
        if (data.status === "success") setProducts(data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Derived Data
  const categories = ["All", ...new Set(products.map((p) => p.category.name))];

  // Helper: Price Calculation
  const getPrice = (p: Product) => {
    if (!p.sale || p.sale === 0) return p.selling_price;
    return p.selling_price - (p.selling_price * p.sale) / 100;
  };

  const getImageUrl = (img: string) =>
    `https://api.zarshay.com/public/assets/images/product/${img}`;

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((p) => {
      const matchCat =
        selectedCategory === "All" || p.category.name === selectedCategory;
      const matchSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return getPrice(a) - getPrice(b);
      if (sortBy === "price-desc") return getPrice(b) - getPrice(a);
      return 0;
    });

  // Modal Actions
  const openModal = (p: Product) => {
    setSelectedProduct(p);
    setSelectedImage(getImageUrl(p.image));
    setQuantity(1);
  };
  const closeModal = () => setSelectedProduct(null);

  // Cart Actions
  const handleAddToCart = (
    p: Product,
    qty: number = 1,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    addToCart({
      id: p.id,
      name: p.name,
      price: getPrice(p),
      quantity: qty,
      image: getImageUrl(p.image),
      category: p.category.name,
      brand: p.brand.name,
      unit: p.unit?.name || "N/A",
    });
    setShowSuccess(true);
    if (selectedProduct) closeModal();
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              New Season 2025
            </span>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-6">
              Modern <span className="font-serif italic">Luxury.</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
              Curated essentials designed for the contemporary lifestyle.
              Discover quality that speaks for itself.
            </p>
          </motion.div>
        </div>

        {/* Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-100 to-gray-50 rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
      </section>

      {/* --- MARQUEE --- */}
      <div className="border-y border-gray-100 py-3 overflow-hidden bg-white mb-8">
        <motion.div
          className="flex whitespace-nowrap gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400"
            >
              <span>Free Shipping on Orders Over Rs 5000</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span>New Arrivals Daily</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
              <span>Premium Quality Guaranteed</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- FLOATING CONTROL BAR (Filters & Search) --- */}
      <div className="z-30 px-6 mb-12 relative">
        <div className="container mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 shadow-xl shadow-gray-200/20 flex flex-col lg:flex-row gap-4 justify-between items-center transition-all">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white shadow-lg"
                      : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative group flex-1 lg:flex-none">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-64 bg-gray-50 border border-transparent focus:border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all focus:bg-white"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-gray-900 transition-colors" />
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="h-10 w-10 lg:w-auto lg:px-4 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 text-gray-700" />
                  <span className="hidden lg:inline text-sm font-medium text-gray-700">
                    Sort
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-gray-400 hidden lg:block transition-transform ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden p-1 z-50"
                    >
                      {[
                        { label: "Default", val: "default" },
                        { label: "Price: Low to High", val: "price-asc" },
                        { label: "Price: High to Low", val: "price-desc" },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => {
                            setSortBy(opt.val as any);
                            setIsSortOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm rounded-lg hover:bg-gray-50 flex items-center justify-between group"
                        >
                          <span
                            className={
                              sortBy === opt.val
                                ? "font-semibold text-gray-900"
                                : "text-gray-500"
                            }
                          >
                            {opt.label}
                          </span>
                          {sortBy === opt.val && (
                            <Check className="w-3.5 h-3.5 text-gray-900" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <section className="container mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-gray-100 border-t-gray-900 rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm">Curating collection...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-6 text-sm font-semibold underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-y-16"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => openModal(product)}
                  onQuickAdd={(e: any) => handleAddToCart(product, 1, e)}
                  getImageUrl={getImageUrl}
                  getPrice={getPrice}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Footer />

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-1/2 bg-gray-50 p-8 flex flex-col gap-4 overflow-y-auto">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm relative">
                  <img
                    src={selectedImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.sale && selectedProduct.sale > 0 && (
                    <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{selectedProduct.sale}%
                    </span>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[
                    selectedProduct.image,
                    ...(selectedProduct.images?.map((i) => i.image) || []),
                  ].map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(getImageUrl(img))}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                        selectedImage === getImageUrl(img)
                          ? "border-gray-900"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={getImageUrl(img)}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                <button
                  onClick={closeModal}
                  className="self-end p-2 hover:bg-gray-100 rounded-full mb-4"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-auto">
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    {selectedProduct.category.name}
                  </span>
                  <h2 className="text-3xl font-light text-gray-900 mt-2 mb-4">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl font-semibold">
                      Rs. {getPrice(selectedProduct).toFixed(2)}
                    </span>
                    {selectedProduct.sale && selectedProduct.sale > 0 && (
                      <span className="text-gray-400 line-through">
                        Rs. {selectedProduct.selling_price}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {selectedProduct.note ||
                      "Designed for modern living. Crafted with premium materials for durability and style."}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-full h-12">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-full hover:bg-gray-50 rounded-l-full flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-full hover:bg-gray-50 rounded-r-full flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(selectedProduct, quantity)}
                      className="flex-1 h-12 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                      <span>Add to Cart</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
              <div className="bg-emerald-500 rounded-full p-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium">Added to your bag</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB COMPONENTS ---

const ProductCard = ({
  product,
  onClick,
  onQuickAdd,
  getImageUrl,
  getPrice,
}: any) => {
  const [currentImage, setCurrentImage] = useState(getImageUrl(product.image));
  const [isHovered, setIsHovered] = useState(false);

  // Combine main image with additional images
  const allImages = [
    getImageUrl(product.image),
    ...(product.images?.map((img: any) => getImageUrl(img.image)) || []),
  ];

  // Logic to change image on hover
  useEffect(() => {
    if (isHovered && allImages.length > 1) {
      // Pick a random index that isn't the first one (main image)
      const randomIndex =
        Math.floor(Math.random() * (allImages.length - 1)) + 1;
      setCurrentImage(allImages[randomIndex]);
    } else {
      // Reset to main image when not hovered
      setCurrentImage(allImages[0]);
    }
  }, [isHovered]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group cursor-pointer flex flex-col gap-3"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 isolate">
        {/* Animated Image Transition */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage} // Key change triggers animation
            src={currentImage}
            alt={product.name}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
        </AnimatePresence>

        {/* Sale Badge */}
        {product.sale && product.sale > 0 && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm z-10">
            -{product.sale}%
          </span>
        )}

        {/* Quick Add Button - Slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button
            onClick={onQuickAdd}
            className="w-full bg-white/95 backdrop-blur text-gray-900 py-3 rounded-xl font-medium text-sm shadow-lg hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add
          </button>
        </div>

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
      </div>

      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-gray-900 truncate pr-4">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="font-semibold text-sm">
              Rs {getPrice(product).toFixed(0)}
            </span>
            {product.sale && product.sale > 0 && (
              <span className="text-[10px] text-gray-400 line-through">
                Rs {product.selling_price}
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category.name}
        </p>
      </div>
    </motion.div>
  );
};
