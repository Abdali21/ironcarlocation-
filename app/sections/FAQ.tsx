"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Quels documents sont nécessaires pour louer une voiture ?",
    answer:
      "Vous avez besoin d'un permis de conduire valide (au moins 1 an), d'une pièce d'identité nationale ou passeport, et d'un moyen de paiement. Pour les étrangers, un permis international est accepté.",
  },
  {
    question: "L'assurance est-elle incluse dans le prix ?",
    answer:
      "Oui, une assurance tous risques est systématiquement incluse dans tous nos tarifs. Vous n'avez aucun frais caché à prévoir.",
  },
  {
    question: "Livrez-vous à l'aéroport de Tanger ?",
    answer:
      "Absolument. Nous livrons votre véhicule directement à l'aéroport Ibn Batouta de Tanger, gratuitement. Précisez simplement votre heure d'arrivée lors de la réservation.",
  },
  {
    question: "Quel est le kilométrage inclus ?",
    answer:
      "Tous nos véhicules sont loués avec un kilométrage illimité. Vous pouvez parcourir le Maroc sans compteur de km.",
  },
  {
    question: "Puis-je annuler ou modifier ma réservation ?",
    answer:
      "Oui, vous pouvez annuler ou modifier votre réservation jusqu'à 24h avant la date de prise en charge, sans frais. Contactez-nous simplement via WhatsApp.",
  },
  {
    question: "Proposez-vous des tarifs à la semaine ou au mois ?",
    answer:
      "Oui, nous offrons des tarifs dégressifs pour les locations de 7 jours ou plus. Contactez-nous pour obtenir un devis personnalisé.",
  },
  {
    question: "Que faire en cas de panne ou d'accident ?",
    answer:
      "Notre assistance routière est disponible 7j/7. En cas de panne ou d'accident, appelez-nous ou envoyez un message WhatsApp — nous interviendrons rapidement.",
  },
  {
    question: "Puis-je voyager hors de Tanger avec le véhicule ?",
    answer:
      "Oui, vous pouvez circuler librement sur tout le territoire marocain. Informez-nous simplement de votre itinéraire lors de la réservation.",
  },
];

function FAQAccordion({ item, isOpen, onToggle }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
      isOpen ? "border-[#E30613]/35" : "border-white/8 hover:border-white/15"
    }`}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-4 px-5 py-4 sm:py-5 text-left transition-colors ${
          isOpen ? "bg-[#E30613]/6" : "bg-[#16202E] hover:bg-white/4"
        }`}
        style={{ minHeight: 52 }}
      >
        <span className="font-semibold text-white text-sm sm:text-base leading-snug pr-2">
          {item.question}
        </span>
        <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isOpen ? "bg-[#E30613] text-white" : "bg-white/8 text-[#E30613]"
        }`}>
          {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, type: "tween" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pt-2 text-slate-400 text-sm leading-relaxed border-t border-white/8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (idx: number) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section
      id="faq"
      className="bg-[#1C212B] py-16 sm:py-20 relative overflow-hidden"
      aria-label="Questions fréquentes"
    >
      <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-[#E30613]/4 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-xl relative z-10">
        <motion.div
          className="mb-10 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "tween" }}
        >
          <span className="inline-block w-10 h-1 bg-[#E30613] rounded-full mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
            Questions fréquentes
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Toutes les réponses avant de réserver. Une question ? Notre équipe est disponible sur WhatsApp.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto flex flex-col gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, type: "tween" } },
              }}
            >
              <FAQAccordion
                item={faq}
                isOpen={openIndex === idx}
                onToggle={() => toggle(idx)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
