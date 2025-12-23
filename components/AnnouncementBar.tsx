// components/AnnouncementBar.tsx
"use client";

import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-black text-white py-2 px-4 text-center text-xs uppercase tracking-wider">
      <div className="flex items-center justify-center gap-2">
        <Truck className="w-3 h-3" />
        <span>Free Shipping on Orders Over PKR 5,000</span>
      </div>
    </div>
  );
}
