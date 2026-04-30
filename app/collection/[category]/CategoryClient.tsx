"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { waUrl, type CarEntry } from "@/lib/fleet";

export default function CategoryClient({ cars }: { cars: CarEntry[] }) {
    const [selectedCar, setSelectedCar] = useState<CarEntry | null>(null);

    return (
        <>
            <div className="container-xl py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {cars.map((car) => (
                        <article
                            key={car.id}
                            className="group bg-[#0D1422] border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-[#E30613]/40 transition-colors duration-300"
                        >
                            <div className="relative h-48 overflow-hidden bg-[#080C14]">
                                <Image
                                    src={car.image}
                                    alt={car.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1422]/80 via-transparent to-transparent" />
                            </div>

                            <div className="flex flex-col flex-1 p-4 gap-3">
                                <span className="self-start text-[10px] font-black uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border border-[#E30613]/35 bg-[#E30613]/10 text-[#E30613]">
                                    {car.category}
                                </span>
                                <h3 className="text-white font-bold text-base leading-tight">{car.name}</h3>

                                <div className="flex gap-3 text-slate-500 text-[11px]">
                                    <span>{car.seats} places</span>
                                    <span>·</span>
                                    <span>{car.transmission}</span>
                                    <span>·</span>
                                    <span>{car.fuel}</span>
                                </div>

                                <div className="mt-auto">
                                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">À partir de</p>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-[#E30613] font-black text-2xl leading-none">
                                            {car.price.toLocaleString("fr-MA")}
                                        </span>
                                        <span className="text-slate-400 text-xs font-semibold">MAD / jour</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-1">
                                    <a
                                        href={waUrl(car)}
                                        target="_blank"
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
                                    >
                                        <MessageCircle size={15} strokeWidth={2} />
                                        Réserver
                                    </a>

                                    <button
                                        onClick={() => setSelectedCar(car)}
                                        className="flex-1 border border-white/15 hover:border-[#E30613]/40 text-slate-400 hover:text-[#E30613] font-semibold text-sm py-3.5 rounded-xl transition-colors"
                                    >
                                        Voir détails
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {selectedCar && (
                <AnimatePresence>
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-black/85 backdrop-blur-md"
                            onClick={() => setSelectedCar(null)}
                        />

                        <motion.div
                            className="relative w-full max-w-2xl bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
                            initial={{ opacity: 0, y: 32, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.97 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative h-56 bg-[#080C14] overflow-hidden">
                                <Image
                                    src={selectedCar.image}
                                    alt={selectedCar.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/80 via-transparent to-transparent" />

                                <button
                                    onClick={() => setSelectedCar(null)}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 border border-white/15 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            <div className="p-6 flex flex-col gap-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[#E30613] text-[11px] font-black uppercase tracking-[0.18em] mb-1">
                                            {selectedCar.brand}
                                        </p>
                                        <h2 className="text-2xl font-black text-white">{selectedCar.model}</h2>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-slate-500 text-[10px] uppercase tracking-widest">À partir de</p>
                                        <div className="flex items-baseline gap-1.5 justify-end">
                                            <span className="text-3xl font-black text-[#E30613] leading-none">
                                                {selectedCar.price.toLocaleString("fr-MA")}
                                            </span>
                                            <span className="text-slate-400 text-xs font-semibold">MAD/j</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed">{selectedCar.description}</p>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/8">
                                    <a
                                        href={waUrl(selectedCar)}
                                        target="_blank"
                                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
                                    >
                                        <MessageCircle size={17} /> Réserver maintenant
                                    </a>
                                    <button
                                        onClick={() => setSelectedCar(null)}
                                        className="flex-1 border border-white/15 hover:border-white/25 text-slate-400 hover:text-white font-semibold text-sm py-3.5 rounded-xl transition-colors"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}