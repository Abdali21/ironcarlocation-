"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight, ChevronRight } from "lucide-react";

interface Car {
  id: string;
  badge: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  image: string;
}

const FLEET: Car[] = [
  {
    id: "porsche-macan",
    badge: "PORSCHE MACAN",
    brand: "Porsche",
    model: "Macan",
    price: 1850,
    description: "Le SUV sport de Porsche — performance et luxe pour une expérience de conduite inoubliable à Tanger.",
    image: "/images/cars/porsche-macan.jpg",   // ← Your uploaded image
  },
  {
    id: "vw-touareg",
    badge: "VOLKSWAGEN TOUAREG",
    brand: "Volkswagen",
    model: "Touareg",
    price: 1350,
    description: "Le SUV premium de Volkswagen — spacieux et puissant pour explorer le Maroc.",
    image: "/images/cars/vw-touareg.jpg",   // ← Your uploaded image
  },
  {
    id: "range-rover-evoque",
    badge: "RANGE ROVER EVOQUE",
    brand: "Range Rover",
    model: "Evoque",
    price: 1450,
    description: "Élégance britannique et technologie de pointe. L'Evoque redéfinit le luxe urbain.",
    image: "/images/cars/range-rover-evoque.jpg",   // ← Your uploaded image
  },
  {
    id: "mercedes-amg",
    badge: "MERCEDES C AMG",
    brand: "Mercedes",
    model: "C AMG",
    price: 1250,
    description: "La berline sport par excellence — puissance brute et sophistication absolue.",
    image: "/images/cars/mercedes-amg.jpg",   // ← Your uploaded image
  },
  {
    id: "audi-a5",
    badge: "AUDI A5",
    brand: "Audi",
    model: "A5 Sportback",
    price: 1100,
    description: "Design épuré, finition premium et cockpit virtuel — le coupé sportback d'Audi.",
    image: "/images/cars/audi-a5.jpg",   // ← Your uploaded image
  },
  {
    id: "cupra-formentor",
    badge: "CUPRA FORMENTOR",
    brand: "Cupra",
    model: "Formentor",
    price: 950,
    description: "Sensations pures et look audacieux — la surprise sportive de la flotte.",
    image: "/images/cars/cupra-formentor.jpg",   // ← Your uploaded image
  },
  {
    id: "hyundai-tucson",
    badge: "HYUNDAI TUCSON",
    brand: "Hyundai",
    model: "Tucson",
    price: 650,
    description: "Le SUV moderne et polyvalent — confort et sécurité à un tarif accessible.",
    image: "/images/cars/hyundai-tucson.jpg",   // ← Your uploaded image
  },
  {
    id: "vw-golf-8",
    badge: "VOLKSWAGEN GOLF 8",
    brand: "Volkswagen",
    model: "Golf 8",
    price: 550,
    description: "La référence des compactes — maniable, économique et parfaite pour Tanger.",
    image: "/images/cars/vw-golf-8.jpg",   // ← Your uploaded image
  },
];

const waUrl = (car: Car) =>
  `https://wa.me/212661813344?text=${encodeURIComponent(
    `Bonjour, je veux réserver la ${car.brand} ${car.model} à Tanger`
  )}`;

export default function FeaturedFleet() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const car = FLEET[activeIdx];

  const goToCar = (idx: number) => {
    setActiveIdx(idx);
  };

  const nextCar = () => {
    const next = (activeIdx + 1) % FLEET.length;
    goToCar(next);
  };

  // Auto-switch every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      nextCar();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIdx, isPaused]);

  return (
    <section
      id="fleet"
      className="relative bg-[#0A0F1A] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative z-10 container-xl">
        <div className="flex flex-col lg:flex-row items-center gap-0 min-h-[420px] lg:min-h-[460px]">

          {/* LEFT: Car Image */}
          <div className="relative w-full lg:w-[52%] flex items-center justify-center py-8 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[520px] aspect-[16/9] cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50 || velocity.x < -500) {
                    nextCar();
                  } else if (swipe > 50 || velocity.x > 500) {
                    const prev = (activeIdx - 1 + FLEET.length) % FLEET.length;
                    goToCar(prev);
                  }
                }}
              >
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover rounded-3xl"
                  priority={activeIdx === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Text Panel */}
          <div className="w-full lg:w-[48%] flex flex-col justify-center pb-10 lg:py-12 lg:pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-5"
              >
                <span className="self-start text-[11px] font-black uppercase tracking-[0.18em] border border-[#E30613] text-[#E30613] bg-[#E30613]/10 px-3.5 py-1.5 rounded-full">
                  {car.badge}
                </span>

                <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight">
                  {car.brand} <span className="text-white/60 font-bold">{car.model}</span>
                </h2>

                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">À partir de</p>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-white font-black text-4xl sm:text-5xl leading-none tracking-tight">
                      {car.price.toLocaleString("fr-MA").replace(",", ".")}
                    </span>
                    <span className="text-white font-black text-2xl sm:text-3xl leading-none">MAD</span>
                    <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">/ JOUR</span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm">
                  {car.description}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
                  <motion.a
                    href={waUrl(car)}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-black text-sm px-7 py-3.5 rounded-full transition-colors shadow-[0_4px_20px_rgba(227,6,19,0.35)]"
                    whileHover={{ scale: 1.04 }}
                  >
                    <MessageCircle size={16} /> Réserver <ArrowRight size={15} />
                  </motion.a>

                  <motion.button
                    onClick={nextCar}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-semibold transition-colors group"
                    whileHover={{ x: 3 }}
                  >
                    Voiture suivante <ChevronRight size={16} className="group-hover:translate-x-0.5 transition" />
                  </motion.button>
                </div>

                <div className="mt-2">
                  <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      key={activeIdx}
                      className="h-full bg-[#E30613] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 text-center">Changement automatique dans 5 secondes</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM PILLS */}
        <div className="border-t border-white/8 py-4">
          <div
            ref={pillsRef}
            className="flex gap-2.5 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {FLEET.map((c, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={c.id}
                  onClick={() => goToCar(idx)}
                  className={`relative shrink-0 text-[11px] font-black uppercase tracking-[0.12em] px-5 py-2.5 rounded-full border transition-all duration-200 ${isActive
                    ? "border-[#E30613] text-[#E30613] bg-[#E30613]/10 shadow-[0_0_14px_rgba(227,6,19,0.4)]"
                    : "border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                    }`}
                >
                  {c.badge}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-underline"
                      className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] w-8 bg-[#E30613] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}