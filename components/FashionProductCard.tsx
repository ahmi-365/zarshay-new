// components/FashionProductCard.tsx
"use client";

import { ShoppingBag } from "lucide-react";

interface FashionProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    images?: string[];
    category: {
      name: string;
    };
  };
  onClick: () => void;
  getImageUrl: (imageName: string) => string;
}

export function FashionProductCard({
  product,
  onClick,
  getImageUrl,
}: FashionProductCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      {/* Portrait Image - 3:4 Fashion Aspect Ratio */}
      <div className="relative overflow-hidden mb-4 aspect-[3/4] bg-gray-50">
        {/* Primary Image */}
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            product.images && product.images.length > 0
              ? "group-hover:opacity-0"
              : ""
          }`}
        />

        {/* Hover Image */}
        {product.images && product.images.length > 0 && (
          <img
            src={getImageUrl(product.images[0])}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Hover: Add to Cart Button - Minimal Black Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" />
            <span>Quick Add</span>
          </div>
        </div>
      </div>

      {/* Product Info - Minimal & Centered */}
      <div className="text-center space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {product.category.name}
        </p>
        <h3 className="text-sm font-light text-black uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm text-black font-light">
          PKR {parseFloat(product.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
