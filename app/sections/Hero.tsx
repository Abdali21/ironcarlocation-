"use client";

/**
 * Hero Section – Iron Car Location
 * ─────────────────────────────────
 * - Full viewport height, Iron Navy background
 * - Split 50/50 desktop layout (text left | car image right)
 * - Mobile: stacked (text top, car image below)
 * - Framer Motion entrance animations + image hover scale
 * - Bottom trust strip (3 items)
 */

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Star, ArrowRight } from "lucide-react";

/* ── Constants ── */
const WA_URL =
  "https://wa.me/212661813344?text=Bonjour%2C%20je%20veux%20r%C3%A9server%20une%20voiture%20%C3%A0%20Tanger";

/* ── Animation Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: "tween" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "tween" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col bg-[#0F172A] pt-[72px] overflow-hidden"
      aria-label="Hero – Iron Car Location Tanger"
    >
      {/* ── Background mesh glows ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full bg-[#E30613]/6 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.6) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent via-transparent to-[#0F172A]/60 z-10" />
      </div>

      {/* ── Main split layout ── */}
      <div className="container-xl relative z-10 flex flex-col lg:flex-row items-center flex-1 py-12 lg:py-0 gap-10 lg:gap-0">

        {/* ════════ LEFT — Text content ════════ */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-10"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Red badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 bg-[#E30613]/12 border border-[#E30613]/30 text-[#E30613] text-xs font-bold uppercase tracking-[0.1em] px-4 py-2 rounded-full">
              <Star size={11} strokeWidth={3} className="fill-[#E30613]" />
              N°1 Location Voiture Premium – Tanger
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.07] tracking-tight mb-5"
          >
            Location De Voitures{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg,#E30613,#FF3A47,#E30613)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              De Luxe
            </span>
            <br />à Tanger
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
          >
            <span className="text-slate-200 font-medium">Porsche Macan · Mercedes AMG · Range Rover Evoque</span>
            <br />
            · Assistance 24/7 sur WhatsApp
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 w-full sm:w-auto">
            {/* WhatsApp — primary (green) */}
            <motion.a
              id="hero-whatsapp-btn"
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold text-base w-full sm:w-auto px-7 py-4 rounded-xl shadow-[0_6px_24px_rgba(37,211,102,0.38)] transition-all duration-200"
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 10px 32px rgba(37,211,102,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={21} strokeWidth={2} />
              Réserver sur WhatsApp
            </motion.a>

            {/* Fleet — Solid Red Button (like your reference) */}
            <motion.a
              id="hero-fleet-btn"
              href="#fleet"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2.5 bg-[#E30613] hover:bg-[#C40410] text-white font-bold text-base w-full sm:w-auto px-7 py-4 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(227,6,19,0.4)]"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Voir toutes les véhicules
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>

          {/* Social proof pill */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {["AK", "FM", "NB", "YR"].map((init) => (
                <div
                  key={init}
                  className="w-9 h-9 rounded-full bg-[#1E293B] border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-[#E30613]"
                >
                  {init}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={13} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                <span className="font-semibold text-slate-200">850+</span> clients satisfaits à Tanger
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ════════ RIGHT — Car image ════════ */}
        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <motion.div
            className="relative w-full max-w-[640px] aspect-[16/10] rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.4, type: "tween" }}
          >
            <div className="absolute inset-0 rounded-2xl ring-1 ring-[#E30613]/20 z-10 pointer-events-none" />

            <Image
              src="/images/hero-car.webp"
              alt="Voiture premium Iron Car Location – Porsche Macan à Tanger"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A] to-transparent z-10" />

            <motion.div
              className="absolute bottom-4 left-4 z-20 bg-[#0F172A]/90 backdrop-blur-md border border-[#E30613]/25 rounded-xl px-4 py-2.5 flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, type: "tween" }}
            >
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
              <div>
                <p className="text-white text-xs font-bold">Disponible maintenant</p>
                <p className="text-slate-400 text-[11px]">Livraison sous 60 min à Tanger</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}