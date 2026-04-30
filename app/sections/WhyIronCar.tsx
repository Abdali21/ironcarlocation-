"use client";

import { motion } from "framer-motion";
import { Award, Clock, MapPin, Wrench, ThumbsUp, Handshake } from "lucide-react";

const REASONS = [
  {
    icon: <Award size={26} strokeWidth={1.8} />,
    title: "Flotte 100% récente",
    description:
      "Tous nos véhicules ont moins de 3 ans. Révisés, nettoyés et prêts à rouler avant chaque location.",
  },
  {
    icon: <MapPin size={26} strokeWidth={1.8} />,
    title: "Livraison où vous êtes",
    description:
      "Nous livrons votre voiture à domicile, à l'hôtel ou directement à l'aéroport Ibn Batouta de Tanger.",
  },
  {
    icon: <Clock size={26} strokeWidth={1.8} />,
    title: "Disponibilité 7j/7",
    description:
      "Notre équipe répond de 8h à 22h, tous les jours. Urgence ? On est là pour vous.",
  },
  {
    icon: <Wrench size={26} strokeWidth={1.8} />,
    title: "Assistance routière",
    description:
      "Panne, crevaison ? Notre assistance routière intervient rapidement partout au Maroc.",
  },
  {
    icon: <ThumbsUp size={26} strokeWidth={1.8} />,
    title: "Tarifs transparents",
    description:
      "Pas de frais cachés. Le prix affiché est le prix final — kilométrage illimité inclus.",
  },
  {
    icon: <Handshake size={26} strokeWidth={1.8} />,
    title: "+850 clients satisfaits",
    description:
      "Des centaines de voyageurs et familles marocaines nous font confiance chaque année.",
  },
];

export default function WhyIronCar() {
  return (
    <section
      id="why-us"
      className="bg-[#0A0F1A] py-16 sm:py-20 relative overflow-hidden"
      aria-label="Pourquoi choisir Iron Car Location"
    >
      {/* subtle glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#E30613]/4 rounded-full blur-[100px] pointer-events-none" />

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
            Pourquoi nous choisir ?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl">
            Iron Car Location, c&apos;est la promesse d&apos;une location sans stress, au meilleur prix.
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
          {REASONS.map((reason) => (
            <motion.div
              key={reason.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, type: "tween" } },
              }}
              className="bg-[#0D1422] border border-white/8 rounded-2xl p-5 sm:p-7 flex flex-col gap-4 hover:border-[#E30613]/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E30613]/10 flex items-center justify-center text-[#E30613] shrink-0">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">{reason.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
