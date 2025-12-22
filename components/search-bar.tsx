"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  image: string
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
  }
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
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

  // Construct image URL
  const getImageUrl = (imageName: string) => {
    return `https://bloomix.majesticsofts.com/public/assets/images/product/${imageName}`
  }

  // Filter products based on search query
  const filteredProducts = query.trim()
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.name.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
        <Search className="w-4 h-4 text-gray-600" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="bg-transparent outline-none text-sm flex-1 min-w-[150px]"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto min-w-[300px]">
          {loading ? (
            <div className="p-4 text-center text-gray-600 text-sm">
              <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Searching...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="divide-y">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href="/shop"
                  onClick={() => {
                    setQuery("")
                    setIsOpen(false)
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-600 mb-1">{product.category.name}</p>
                    <p className="text-xs font-medium text-teal-600">Rs. {product.selling_price}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-600 text-sm">No products found</div>
          )}
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}