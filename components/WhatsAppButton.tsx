"use client";

import { MessageCircle } from "lucide-react";

// Add this import to your app/page.tsx:
// import { WhatsAppButton } from "@/components/WhatsAppButton";
// Then add <WhatsAppButton /> inside your return statement

export function WhatsAppButton() {
  const phoneNumber = "923192225322";
  const message = "Hi! I'm interested in your products.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-medium hidden group-hover:inline-block transition-all duration-300">
        Chat with us
      </span>
    </button>
  );
}