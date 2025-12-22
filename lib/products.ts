export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Hydrating Face Serum",
    price: 45.99,
    image: "/images/hero-products.jpg",
    category: "Face Care",
    description: "Deep hydrating serum with Australian botanicals",
  },
  {
    id: "2",
    name: "Gentle Facial Cleanser",
    price: 32.99,
    image: "/images/product-flat-lay.jpg",
    category: "Cleansers",
    description: "Soft cleansing formula for all skin types",
  },
  {
    id: "3",
    name: "Luxury Moisturizer",
    price: 58.99,
    image: "/images/luxury-collection.jpg",
    category: "Face Care",
    description: "Premium moisturizer with natural ingredients",
  },
  {
    id: "4",
    name: "Body Lotion",
    price: 38.99,
    image: "/images/pink-collection.jpg",
    category: "Body Care",
    description: "Nourishing body lotion for soft skin",
  },
  {
    id: "5",
    name: "Skincare Essentials Kit",
    price: 89.99,
    image: "/images/modern-skincare.jpg",
    category: "Face Care",
    description: "Complete skincare routine in one kit",
  },
  {
    id: "6",
    name: "Eye Contour Cream",
    price: 52.99,
    image: "/images/hero-products.jpg",
    category: "Face Care",
    description: "Delicate eye area treatment",
  },
  {
    id: "7",
    name: "Exfoliating Scrub",
    price: 35.99,
    image: "/images/product-flat-lay.jpg",
    category: "Cleansers",
    description: "Gentle exfoliation with natural particles",
  },
  {
    id: "8",
    name: "Night Recovery Mask",
    price: 48.99,
    image: "/images/luxury-collection.jpg",
    category: "Face Care",
    description: "Intensive overnight treatment mask",
  },
]
