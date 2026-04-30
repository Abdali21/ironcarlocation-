"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, MapPin, ArrowRight } from "lucide-react";

interface FinalCTAProps {
  title?: string;
}

const WA_URL = `https://wa.me/212661813344?text=${encodeURIComponent(
  "Bonjour, je veux réserver une voiture à Tanger"
)}`;

export default function FinalCTA({ title }: FinalCTAProps) {
  return (
    <section
      id="contact"
      className="bg-[#0A0F1A] py-16 sm:py-24 relative overflow-hidden"
      aria-label="Réserver maintenant – Iron Car Location"
    >
      {/* Decorative glows */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#E30613]/6 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-[#E30613]/4 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-[#E30613]/10 border border-[#E30613]/30 text-[#E30613] text-xs font-semibold uppercase tracking-[0.08em] px-4 py-1.5 rounded-full mb-6">
              🚗 Disponible maintenant à Tanger
            </span>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              {title ?? (
                <>
                  Prêt à prendre{" "}
                  <span style={{
                    background: "linear-gradient(135deg,#E30613,#FF3A47)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>la route ?</span>
                </>
              )}
            </h2>

            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Réservez votre voiture en quelques minutes via WhatsApp. Notre équipe vous répond immédiatement — 7j/7, de 8h à 22h.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14">
              {/* WhatsApp Button */}
              <a
                id="final-cta-whatsapp"
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-8 w-full sm:w-auto"
                style={{ minHeight: 52 }}
              >
                <MessageCircle size={20} />
                Réserver via WhatsApp
                <ArrowRight size={18} />
              </a>

              {/* Call Button — SOLID RED (fixed) */}
              <a
                id="final-cta-call"
                href="tel:+212661813344"
                className="inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-base px-8 rounded-xl transition-all duration-200 w-full sm:w-auto shadow-[0_4px_20px_rgba(227,6,19,0.35)]"
                style={{ minHeight: 52 }}
              >
                <Phone size={18} />
                Nous appeler
              </a>
            </div>

            {/* Info strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-[#E30613]" />
                Tanger, Maroc
              </span>
              <span className="flex items-center gap-2">
                <Phone size={15} className="text-[#E30613]" />
                +212 661 813 344
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle size={15} className="text-[#25D366]" />
                WhatsApp 7j/7
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer bottom strip */}
        <motion.div
          className="mt-20 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>© {new Date().getFullYear()} Iron Car Location – Tanger, Maroc. Tous droits réservés.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#E30613] transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-[#E30613] transition-colors">Conditions générales</a>
            <a href="#" className="hover:text-[#E30613] transition-colors">Contact</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}