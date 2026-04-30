"use client";

/**
 * /collection – Full fleet catalogue page
 * Full 15-car grid with "Voir détails" modal per car
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Users,
  Cog,
  Fuel,
  Zap,
  Shield,
  CheckCircle2,
  ArrowLeft,
  Star,
} from "lucide-react";
import { ALL_CARS, waUrl, type CarEntry } from "@/lib/fleet";

/* ─── Category filter tabs ───────────────────────────────────────── */
const CATEGORIES = ["Tous", "Luxe", "Sport", "Économique"];

/* ─── Detail Modal ───────────────────────────────────────────────── */
function DetailModal({ car, onClose }: { car: CarEntry; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal panel */}
        <motion.div
          className="relative w-full max-w-2xl bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          {/* Image */}
          <div className="relative h-56 bg-[#080C14] overflow-hidden">
            <Image
              src={car.image}
              alt={car.name}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover object-center"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero-car.webp"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/80 via-transparent to-transparent" />

            {/* Category + NO */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span
                className="text-[10px] font-black uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border"
                style={{
                  color: car.categoryColor,
                  borderColor: car.categoryColor + "40",
                  backgroundColor: car.categoryColor + "18",
                }}
              >
                {car.category}
              </span>
              <span className="text-slate-500 text-xs">NO.{car.no}</span>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 border border-white/15 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X size={17} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[#E30613] text-[11px] font-black uppercase tracking-[0.18em] mb-1">
                  {car.brand}
                </p>
                <h2 className="text-2xl font-black text-white">{car.model}</h2>
              </div>
              <div className="text-right shrink-0">
                <p className="text-slate-500 text-[10px] uppercase tracking-widest">À partir de</p>
                <div className="flex items-baseline gap-1.5 justify-end">
                  <span className="text-3xl font-black text-[#E30613] leading-none">
                    {car.price.toLocaleString("fr-MA")}
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">MAD/j</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed">{car.description}</p>

            {/* Spec chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Users size={12} />, label: `${car.seats} places` },
                { icon: <Cog size={12} />, label: car.transmission },
                { icon: <Fuel size={12} />, label: car.fuel },
                { icon: <Zap size={12} />, label: car.power },
              ].map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 bg-white/6 border border-white/10 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg"
                >
                  {s.icon} {s.label}
                </span>
              ))}
            </div>

            {/* Features */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {car.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 size={13} className="text-[#E30613] shrink-0" />
                  {f}
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm text-[#E30613]">
                <Shield size={13} className="shrink-0" />
                Assurance tous risques incluse
              </li>
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/8">
              <motion.a
                href={waUrl(car)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-[0_4px_16px_rgba(227,6,19,0.28)]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={17} strokeWidth={2} />
                Réserver maintenant
              </motion.a>
              <button
                onClick={onClose}
                className="flex-1 border border-white/15 hover:border-white/25 text-slate-400 hover:text-white font-semibold text-sm py-3.5 rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Car Grid Card ──────────────────────────────────────────────── */
function GridCard({
  car,
  index,
  onDetail,
}: {
  car: CarEntry;
  index: number;
  onDetail: (car: CarEntry) => void;
}) {
  return (
    <motion.article
      id={car.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.45, type: "tween" }}
      className="group bg-[#0D1422] border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-[#E30613]/35 transition-colors duration-300"
    >
      {/* NO. badge */}
      <div className="relative h-48 overflow-hidden bg-[#080C14]">
        <div className="absolute top-3 left-3 z-10 bg-black/55 backdrop-blur-sm border border-white/12 rounded-lg px-2.5 py-1">
          <span className="text-[10px] font-black text-white/50 tracking-[0.15em]">NO.{car.no}</span>
        </div>
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero-car.webp"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1422]/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <span
          className="self-start text-[10px] font-black uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border"
          style={{
            color: car.categoryColor,
            borderColor: car.categoryColor + "40",
            backgroundColor: car.categoryColor + "15",
          }}
        >
          {car.category}
        </span>

        <h3 className="text-white font-bold text-base leading-tight">{car.name}</h3>

        {/* Mini specs */}
        <div className="flex gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Users size={11} /> {car.seats}p</span>
          <span className="flex items-center gap-1"><Cog size={11} /> {car.transmission.slice(0, 4)}.</span>
          <span className="flex items-center gap-1"><Fuel size={11} /> {car.fuel}</span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">À partir de</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[#E30613] font-black text-xl leading-none">
              {car.price.toLocaleString("fr-MA")}
            </span>
            <span className="text-slate-400 text-xs font-semibold">MAD / jour</span>
          </div>
        </div>

        <div className="flex gap-2 mt-1">
          <motion.a
            href={waUrl(car)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle size={13} strokeWidth={2} />
            Réserver
          </motion.a>
          <motion.button
            onClick={() => onDetail(car)}
            className="flex-1 border border-white/15 hover:border-[#E30613]/40 text-slate-400 hover:text-[#E30613] font-semibold text-sm py-3.5 rounded-xl transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir détails
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Page Component ─────────────────────────────────────────────── */
export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedCar, setSelectedCar] = useState<CarEntry | null>(null);

  const filtered =
    activeCategory === "Tous"
      ? ALL_CARS
      : ALL_CARS.filter((c) => c.category === activeCategory);

  return (
    <>
      <div className="min-h-screen bg-[#0A0F1A] pt-[72px]">

        {/* ── Hero banner ── */}
        <div className="relative bg-[#080D18] border-b border-white/6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#E30613]/4 rounded-full blur-[100px]" />
          </div>
          <div className="container-xl py-12 relative z-10">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#E30613] text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Retour à l&apos;accueil
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 bg-[#E30613]/10 border border-[#E30613]/25 text-[#E30613] text-[11px] font-black uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full mb-3">
                  Catalogue complet 2025
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-white">
                  Toute notre{" "}
                  <span style={{
                    background: "linear-gradient(135deg,#E30613,#FF3A47)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    flotte
                  </span>
                </h1>
                <p className="text-slate-400 mt-2">
                  {ALL_CARS.length} véhicules premium disponibles à Tanger
                </p>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-slate-400 text-sm">4.9/5 · +850 clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category filter tabs ── */}
        <div className="border-b border-white/6 bg-[#080D18] sticky top-[72px] z-30">
          <div className="container-xl py-3">
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-200 ${activeCategory === cat
                    ? "bg-[#E30613]/15 border-[#E30613]/40 text-[#E30613]"
                    : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                >
                  {cat}
                  {cat !== "Tous" && (
                    <span className="ml-1.5 text-[10px] opacity-60">
                      ({ALL_CARS.filter((c) => c.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="container-xl py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((car, idx) => (
                <GridCard
                  key={car.id}
                  car={car}
                  index={idx}
                  onDetail={setSelectedCar}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              Aucun véhicule dans cette catégorie.
            </div>
          )}
        </div>

        {/* ── Footer strip ── */}
        <div className="border-t border-white/6 bg-[#080D18] py-8">
          <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              Vous ne trouvez pas le véhicule idéal ? Contactez-nous.
            </p>
            <a
              href="https://wa.me/212661813344?text=Bonjour%2C%20je%20cherche%20un%20v%C3%A9hicule%20sp%C3%A9cifique%20%C3%A0%20Tanger"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              <MessageCircle size={17} />
              Demander un véhicule sur mesure
            </a>
          </div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selectedCar && (
        <DetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </>
  );
}

