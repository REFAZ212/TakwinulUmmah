"use client";
import { MessageCircle } from "lucide-react";

export default function FloatingContact() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={20} />
      <span className="hidden text-sm font-medium sm:inline">Hubungi Kami</span>
    </a>
  );
}
