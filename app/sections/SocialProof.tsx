"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Fatima Z.",
    city: "Casablanca",
    rating: 5,
    text: "Service impeccable ! La voiture était propre, récente et livrée directement à mon hôtel à Tanger. Je recommande vivement Iron Car.",
    initials: "FZ",
  },
  {
    id: 2,
    name: "Karim B.",
    city: "Paris, France",
    rating: 5,
    text: "J'étais en vacances à Tanger et j'avais besoin d'un véhicule rapidement. En moins d'une heure, tout était réglé via WhatsApp. Parfait !",
    initials: "KB",
  },
  {
    id: 3,
    name: "Nadia M.",
    city: "Tanger",
    rating: 5,
    text: "Prix honnêtes, pas de mauvaises surprises à la restitution. Le Duster était en parfait état pour notre road trip. Merci Iron Car !",
    initials: "NM",
  },
  {
    id: 4,
    name: "Ahmed S.",
    city: "Bruxelles, Belgique",
    rating: 5,
    text: "Réservation facile, équipe disponible et professionnelle. La livraison à l'aéroport s'est faite sans attente. Je reviendrai !",
    initials: "AS",
  },
  {
    id: 5,
    name: "Leila C.",
    city: "Rabat",
    rating: 5,
    text: "Vraiment la meilleure expérience de location de voiture au Maroc. Transparent sur les prix et super réactif. 10/10 !",
    initials: "LC",
  },
  {
    id: 6,
    name: "Youssef R.",
    city: "Tanger",
    rating: 5,
    text: "J'utilise Iron Car pour toutes mes locations professionnelles. Fiable, ponctuel et prix compétitifs. Aucune déception depuis 2 ans.",
    initials: "YR",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note: ${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-slate-600"}
        />
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section
      id="reviews"
      className="bg-[#1C212B] py-16 sm:py-20 relative overflow-hidden"
      aria-label="Avis clients"
    >
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[250px] bg-[#E30613]/4 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "tween" }}
        >
          <span className="inline-block w-10 h-1 bg-[#E30613] rounded-full mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
            Ce que disent nos clients
          </h2>
          <div className="flex items-center justify-center gap-2 mb-1">
            <StarRating rating={5} />
            <span className="text-slate-400 text-sm font-semibold">4.9/5 sur plus de 200 avis</span>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {REVIEWS.map((review) => (
            <motion.article
              key={review.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, type: "tween" } },
              }}
              className="bg-[#0D1422] border border-white/8 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 hover:border-[#D4AF37]/25 transition-colors duration-300"
              aria-label={`Avis de ${review.name}`}
            >
              <Quote size={22} className="text-[#E30613]/40 shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                <div className="w-10 h-10 rounded-full bg-[#E30613]/15 border border-[#E30613]/25 flex items-center justify-center text-[#E30613] text-xs font-black shrink-0">
                  {review.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">{review.name}</p>
                  <p className="text-xs text-slate-500 truncate">{review.city}</p>
                </div>
                <div className="shrink-0">
                  <StarRating rating={review.rating} />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
