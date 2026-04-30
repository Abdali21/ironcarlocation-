"use client";

import { motion } from "framer-motion";
import { MessageCircle, CalendarCheck, Key, Smile } from "lucide-react";

interface HowItWorksProps {
  title?: string;
}

const STEPS = [
  {
    number: 1,
    icon: <MessageCircle size={28} strokeWidth={1.8} />,
    title: "Contactez-nous",
    description:
      "Envoyez-nous un message WhatsApp ou appelez-nous. Dites-nous vos dates, votre destination et vos préférences.",
  },
  {
    number: 2,
    icon: <CalendarCheck size={28} strokeWidth={1.8} />,
    title: "Confirmez la réservation",
    description:
      "Nous vous proposons le véhicule le plus adapté. Vous confirmez avec un acompte simple — 100% sécurisé.",
  },
  {
    number: 3,
    icon: <Key size={28} strokeWidth={1.8} />,
    title: "Récupérez les clés",
    description:
      "On vous livre le véhicule où vous voulez à Tanger : chez vous, à l'hôtel ou à l'aéroport Ibn Batouta.",
  },
  {
    number: 4,
    icon: <Smile size={28} strokeWidth={1.8} />,
    title: "Roulez serein",
    description:
      "Profitez de votre séjour. Notre équipe est disponible 7j/7 par WhatsApp pour toute question.",
  },
];

const WA_URL = `https://wa.me/212661813344?text=${encodeURIComponent(
  "Bonjour, je veux réserver une voiture à Tanger"
)}`;

export default function HowItWorks({ title }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="bg-[#0A0F1A] py-16 sm:py-20 relative overflow-hidden"
      aria-label="Comment ça marche"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E30613]/6 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-xl relative z-10">
        <motion.div
          className="mb-10 sm:mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "tween" }}
        >
          <span className="inline-block w-10 h-1 bg-[#E30613] rounded-full mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
            {title ?? "Réserver en 4 étapes"}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto">
            Un processus simple, rapide et entièrement en ligne.
          </p>
        </motion.div>

        <motion.ol
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
        >
          {STEPS.map((step) => (
            <motion.li
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center text-[#E30613]">
                  {step.icon}
                </div>
                <span className="text-5xl font-black text-white/10 leading-none select-none">
                  0{step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            id="how-it-works-cta"
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
          >
            <MessageCircle size={20} />
            Je réserve maintenant
          </a>
        </motion.div>
      </div>
    </section>
  );
}
