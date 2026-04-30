"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const WA_URL =
  "https://wa.me/212661813344?text=Bonjour%2C%20je%20veux%20r%C3%A9server%20une%20voiture%20%C3%A0%20Tanger";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Show after 1.5s */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  /* Auto-show tooltip after 3s on mobile (no hover) */
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShowTooltip(true), 3000);
    const t2 = setTimeout(() => setShowTooltip(false), 7000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-[9999] flex flex-col items-end gap-3"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="flex items-center gap-2 bg-[#0D1422] border border-[#25D366]/30 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl max-w-[220px] text-right"
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <span className="leading-tight">Réservez via WhatsApp&nbsp;🚗</span>
                <button
                  onClick={() => setShowTooltip(false)}
                  aria-label="Fermer"
                  className="text-slate-400 hover:text-white transition-colors shrink-0 p-1"
                >
                  <X size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button — 64px for mobile touch */}
          <motion.a
            id="floating-whatsapp-btn"
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Réserver via WhatsApp – Iron Car Location"
            className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-colors hover:bg-[#1EBE5A]"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <MessageCircle size={30} strokeWidth={2} color="#fff" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
