"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Star, X, Plus, Minus, Sparkles } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { useCart } from "@/lib/cart-context"
import { Footer } from "@/components/Footer"

interface ProductImage {
  id: number
  product_id: number
  image: string
}

interface Product {
  id: number
  name: string
  image: string
    sale?: number  // Add this line
  note?: string
  category_id: number
  brand_id: number
  selling_price: number
  category: {
    id: number
    name: string
  }
  brand: {
    id: number
    name: string
  }
  unit: {
    id: number
    name: string
  } | null
  images: ProductImage[]
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState<string>("")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://bloomix.majesticsofts.com/api/all-products')
        const data = await response.json()
        if (data.status === 'success') {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = ["All", ...new Set(products.map((p) => p.category.name))]
  
  const filteredProducts =
    selectedCategory === "All" 
      ? products 
      : products.filter((p) => p.category.name === selectedCategory)

  const getImageUrl = (imageName: string) => {
    return `https://bloomix.majesticsofts.com/public/assets/images/product/${imageName}`
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setSelectedImage(getImageUrl(product.image))
    setQuantity(1)
  }
const calculateDiscountedPrice = (sellingPrice: number, salePercentage?: number) => {
  if (!salePercentage || salePercentage === 0) return sellingPrice
  const discountAmount = (sellingPrice * salePercentage) / 100
  const discountedPrice = sellingPrice - discountAmount
  return discountedPrice > 0 ? discountedPrice : 0
}
// Generate hardcoded rating between 4.0 and 5.0 based on product ID
const getProductRating = (productId: number) => {
  // Use product ID to generate consistent rating
  const ratings = [4.2, 4.5, 4.7, 4.8, 4.9, 5.0]
  return ratings[productId % ratings.length]
}
// Render stars based on rating
const renderStars = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className="w-3 h-3 fill-teal-400 text-teal-400" />
    )
  }
  
  // Half star
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative w-3 h-3">
        <Star className="w-3 h-3 text-teal-400" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="w-3 h-3 fill-teal-400 text-teal-400" />
        </div>
      </div>
    )
  }
  
  // Empty stars
  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="w-3 h-3 text-teal-400" />
    )
  }
  
  return stars
}
// Render larger stars for modal
const renderModalStars = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className="w-4 h-4 fill-teal-400 text-teal-400" />
    )
  }
  
  // Half star
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative w-4 h-4">
        <Star className="w-4 h-4 text-teal-400" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="w-4 h-4 fill-teal-400 text-teal-400" />
        </div>
      </div>
    )
  }
  
  // Empty stars
  const emptyStars = 5 - Math.ceil(rating)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="w-4 h-4 text-teal-400" />
    )
  }
  
  return stars
}
  const closeModal = () => {
    setSelectedProduct(null)
    setSelectedImage("")
    setQuantity(1)
  }

const handleAddToCart = () => {
  if (selectedProduct) {
    const finalPrice = selectedProduct.sale && selectedProduct.sale > 0
      ? calculateDiscountedPrice(selectedProduct.selling_price, selectedProduct.sale)
      : selectedProduct.selling_price
      
    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: finalPrice,
      quantity: quantity,
      image: getImageUrl(selectedProduct.image),
      category: selectedProduct.category.name,
      brand: selectedProduct.brand.name,
      unit: selectedProduct.unit ? selectedProduct.unit.name : 'N/A'
    }
    addToCart(cartItem)
    setShowSuccess(true)
    closeModal()
    setTimeout(() => setShowSuccess(false), 3000)
  }
}

 const handleQuickAddToCart = (e: React.MouseEvent, product: Product) => {
  e.stopPropagation()
  const finalPrice = product.sale && product.sale > 0
    ? calculateDiscountedPrice(product.selling_price, product.sale)
    : product.selling_price
    
  const cartItem = {
    id: product.id,
    name: product.name,
    price: finalPrice,
    quantity: 1,
    image: getImageUrl(product.image),
    category: product.category.name,
    brand: product.brand.name,
    unit: product.unit ? product.unit.name : 'N/A'
  }
  addToCart(cartItem)
  setShowSuccess(true)
  setTimeout(() => setShowSuccess(false), 3000)
}

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ENHANCED HERO SECTION - Same as Featured */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg">
            {/* <Sparkles className="w-5 h-5 text-teal-500" /> */}
            <span className="text-sm font-medium text-gray-700">Premium Collection</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-6 tracking-tight">
            Our <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Collection</span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Indulge in high-performance skincare infused with luxury botanical extracts, designed to transform your beauty routine.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">{products.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Products</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-600">{categories.length - 1}</p>
              <p className="text-sm text-gray-600 mt-1">Categories</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-lg font-medium text-gray-800 mb-6">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found in this category.</p>
            </div>
          )}

          {/* ENHANCED PRODUCT GRID WITH ZOOM EFFECT - Same as Featured */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => openProductModal(product)}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square bg-gray-50">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      product.images && product.images.length > 0 
                        ? 'group-hover:opacity-0 group-hover:scale-105' 
                        : 'group-hover:scale-105'
                    }`}
                  />
                  {product.images && product.images.length > 0 && (
                    <img
                      src={getImageUrl(product.images[0].image)}
                      alt={`${product.name} alternate`}
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 absolute inset-0 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.category.name}</p>
              <div className="flex items-center gap-2 mb-2">
  {renderStars(getProductRating(product.id))}
  <span className="text-xs text-gray-500">({getProductRating(product.id)})</span>
</div>
           <div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    {product.sale && product.sale > 0 ? (
      <>
        <p className="text-sm text-gray-400 line-through">
          Rs. {product.selling_price}
        </p>
        <p className="text-lg font-medium text-teal-600">
          Rs. {calculateDiscountedPrice(product.selling_price, product.sale).toFixed(2)}
        </p>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {product.sale}% OFF
        </span>
      </>
    ) : (
      <p className="text-lg font-medium text-gray-800">
        Rs. {product.selling_price}
      </p>
    )}
  </div>
  <button
    onClick={(e) => handleQuickAddToCart(e, product)}
    className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-colors shadow-lg hover:shadow-xl"
  >
    <ShoppingCart className="w-4 h-4" />
  </button>
</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp relative">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                  <img
                    src={selectedImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {selectedProduct.images && selectedProduct.images.length > 0 && (
                  <div className="grid grid-cols-6 gap-2">
                    <button
                      onClick={() => setSelectedImage(getImageUrl(selectedProduct.image))}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === getImageUrl(selectedProduct.image)
                          ? 'border-teal-500 ring-2 ring-teal-200'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <img
                        src={getImageUrl(selectedProduct.image)}
                        alt="Main"
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {selectedProduct.images.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedImage(getImageUrl(img.image))}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === getImageUrl(img.image)
                            ? 'border-teal-500 ring-2 ring-teal-200'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <img
                          src={getImageUrl(img.image)}
                          alt={`View ${img.id}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-4 py-1 rounded-full text-sm bg-teal-50 text-teal-700 mb-3">
                      {selectedProduct.category.name}
                    </span>
                    <h2 className="text-3xl font-light text-gray-800 mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-sm text-gray-500">by {selectedProduct.brand.name}</p>
                  </div>

<div className="flex items-center gap-2 mb-6">
  {renderModalStars(getProductRating(selectedProduct.id))}
  <span className="text-sm text-gray-600">({getProductRating(selectedProduct.id)} / 5)</span>
</div>
                 <p className="text-gray-600 mb-6 leading-relaxed">
  {selectedProduct.note || `Premium ${selectedProduct.category.name.toLowerCase()} product designed to enhance your natural beauty. Formulated with high-quality ingredients for optimal results.`}
</p>

                  <div className="space-y-3 mb-8 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Brand:</span>
                      <span className="font-medium text-gray-800">{selectedProduct.brand.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-800">{selectedProduct.category.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unit:</span>
                      <span className="font-medium text-gray-800">
                        {selectedProduct.unit ? selectedProduct.unit.name : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
<div className="flex items-center justify-between mb-6">
  <div>
    <p className="text-sm text-gray-600 mb-1">Price</p>
    {selectedProduct.sale && selectedProduct.sale > 0 ? (
      <div className="flex items-center gap-3">
        <p className="text-2xl text-gray-400 line-through">
          Rs. {selectedProduct.selling_price}
        </p>
        <p className="text-3xl font-medium text-teal-600">
          Rs. {calculateDiscountedPrice(selectedProduct.selling_price, selectedProduct.sale).toFixed(2)}
        </p>
        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
          {selectedProduct.sale}% OFF
        </span>
      </div>
    ) : (
      <p className="text-3xl font-medium text-gray-800">
        Rs. {selectedProduct.selling_price}
      </p>
    )}
  </div>

  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2">
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
    >
      <Minus className="w-4 h-4 text-gray-700" />
    </button>
    <span className="text-lg font-medium text-gray-800 min-w-[2rem] text-center">
      {quantity}
    </span>
    <button
      onClick={() => setQuantity(quantity + 1)}
      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
    >
      <Plus className="w-4 h-4 text-gray-700" />
    </button>
  </div>
</div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-teal-500 text-white py-4 rounded-full font-medium hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-24 right-6 z-[60] animate-slideInRight">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-100 p-6 flex items-start gap-4 max-w-md">
            <div className="flex-shrink-0 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center animate-scaleIn">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">Added to Cart!</h3>
              <p className="text-sm text-gray-600">Your item has been successfully added to the cart.</p>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  )
}