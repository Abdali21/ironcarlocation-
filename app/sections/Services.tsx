"use client";

import { motion } from "framer-motion";
import { Plane, Building2, Map, Users, Briefcase, Heart } from "lucide-react";

const SERVICES = [
  {
    icon: <Plane size={26} strokeWidth={1.8} />,
    title: "Transfert Aéroport",
    description:
      "Livraison et reprise directement à l'aéroport Ibn Batouta de Tanger. Votre voiture vous attend à la sortie.",
    highlight: true,
  },
  {
    icon: <Building2 size={26} strokeWidth={1.8} />,
    title: "Livraison Hôtel",
    description:
      "On livre votre véhicule à votre hôtel ou riad à Tanger, sans frais supplémentaires.",
    highlight: false,
  },
  {
    icon: <Map size={26} strokeWidth={1.8} />,
    title: "Road Trip Maroc",
    description:
      "Louez un véhicule 4x4 ou confortable pour explorer le Maroc : Chefchaouen, Fès, Marrakech…",
    highlight: false,
  },
  {
    icon: <Users size={26} strokeWidth={1.8} />,
    title: "Groupes & Familles",
    description:
      "Besoin de plusieurs voitures ou d'un minibus ? On s'adapte à tous les groupes.",
    highlight: false,
  },
  {
    icon: <Briefcase size={26} strokeWidth={1.8} />,
    title: "Usage Professionnel",
    description:
      "Abonnements mensuels et tarifs entreprise disponibles. Facturation avec TVA.",
    highlight: false,
  },
  {
    icon: <Heart size={26} strokeWidth={1.8} />,
    title: "Location Longue Durée",
    description:
      "Tarifs dégressifs à la semaine et au mois. Idéal pour les séjours prolongés à Tanger.",
    highlight: true,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#0A0F1A] py-16 sm:py-20 relative overflow-hidden"
      aria-label="Nos services de location"
    >
      <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-[#E30613]/4 rounded-full blur-[110px] pointer-events-none" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "tween" }}
        >
          <span className="inline-block w-10 h-1 bg-[#E30613] rounded-full mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
            Nos Services
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl">
            Plus qu&apos;une simple location — un service complet adapté à chaque situation.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, type: "tween" } },
              }}
              className={`rounded-2xl p-5 sm:p-7 flex flex-col gap-4 border transition-all duration-300 hover:-translate-y-1 ${
                service.highlight
                  ? "bg-[#E30613]/8 border-[#E30613]/30 hover:border-[#E30613]/50"
                  : "bg-[#0D1422] border-white/8 hover:border-[#E30613]/25"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                service.highlight ? "bg-[#E30613]/20 text-[#E30613]" : "bg-[#E30613]/10 text-[#E30613]"
              }`}>
                {service.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </div>
              {service.highlight && (
                <span className="self-start text-[10px] font-black uppercase tracking-[0.14em] text-[#E30613] border border-[#E30613]/30 bg-[#E30613]/10 px-2.5 py-1 rounded-full">
                  Service phare
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
