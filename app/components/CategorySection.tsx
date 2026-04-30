"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { type CarEntry, waUrl } from "@/lib/fleet";

interface Props {
  title: string;
  category: string;
  cars: CarEntry[];
  /** Alternating background for visual rhythm */
  bg?: "dark" | "darker";
}

function CarCard({ car, index }: { car: CarEntry; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07, duration: 0.45, type: "tween" }}
      className="relative group bg-[#0D1422] border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-[#E30613]/40 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-[#080C14]">
        <Image
          src={car.image}
          alt={`${car.name} – location voiture Tanger`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1422]/80 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="relative flex flex-col flex-1 p-4 gap-3">
        {/* Category badge — always red */}
        <span className="self-start text-[10px] font-black uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-[#E30613]/35 bg-[#E30613]/10 text-[#E30613]">
          {car.category}
        </span>

        <h3 className="text-white font-bold text-base leading-tight">{car.name}</h3>

        {/* Price */}
        <div className="mt-auto">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">À partir de</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[#E30613] font-black text-2xl leading-none">
              {car.price.toLocaleString("fr-MA")}
            </span>
            <span className="text-slate-400 text-xs font-semibold">MAD / jour</span>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={waUrl(car)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-[0_4px_14px_rgba(227,6,19,0.25)] mt-1"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle size={15} strokeWidth={2} />
          Réserver
        </motion.a>
      </div>
    </motion.article>
  );
}

export default function CategorySection({ title, category, cars, bg = "dark" }: Props) {
  const slug = category.toLowerCase().replace(/[éè]/g, "e").replace(/\s+/g, "-");
  const sectionBg = bg === "dark" ? "bg-[#0A0F1A]" : "bg-[#1C212B]";
  const preview = cars.slice(0, 4);

  if (preview.length === 0) return null;

  return (
    <section
      id={`category-${slug}`}
      aria-label={`${title} – Iron Car Location Tanger`}
      className={`${sectionBg} py-14 sm:py-16 relative overflow-hidden`}
    >
      {/* Subtle red glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#E30613]/4 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <div>
            <span className="inline-block w-8 h-1 bg-[#E30613] rounded-full mb-3" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">{title}</h2>
            <p className="text-slate-500 text-sm mt-1">
              {cars.length} véhicule{cars.length > 1 ? "s" : ""} disponible{cars.length > 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href={`/collection/${slug}`}
            className="inline-flex items-center gap-2 text-[#E30613] hover:text-white border border-[#E30613]/30 hover:bg-[#E30613] font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shrink-0"
          >
            Voir plus
            <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* 4-car grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {preview.map((car, idx) => (
            <CarCard key={car.id} car={car} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
