'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientShopPage({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Added product ${id} (x${quantity}) to cart!`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/shop" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Shop
      </Link>

      <div className="border rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-2">Product ID: {id}</h1>

        <Image
          src="/placeholder.png"
          alt={`Product ${id}`}
          width={400}
          height={300}
          className="rounded-md mb-4"
        />

        <p className="text-gray-600 mb-4">
          This is a sample description for product {id}. You can replace this with real API data.
        </p>

        <div className="flex items-center gap-3 mb-4">
          <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
        </div>

        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}
