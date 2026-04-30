"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/212661813344?text=Bonjour%2C%20je%20veux%20r%C3%A9server%20une%20voiture%20%C3%A0%20Tanger";

export default function MobileStickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (approx 300px)
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[40] bg-[#0A0F1A]/90 backdrop-blur-md border-t border-white/10 p-3 pb-safe transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#E30613] text-white font-bold text-[15px] py-3.5 rounded-xl shadow-[0_4px_14px_rgba(227,6,19,0.3)]"
      >
        <MessageCircle size={20} />
        Réserver maintenant
      </a>
    </div>
  );
}
