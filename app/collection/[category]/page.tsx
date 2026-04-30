import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ALL_CARS, type CarEntry } from "@/lib/fleet";
import CategoryClient from "./CategoryClient";

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  luxe: {
    label: "Luxe",
    description: "Nos véhicules de prestige pour une expérience inoubliable à Tanger.",
  },
  sport: {
    label: "Sport",
    description: "Des modèles sportifs pour les amateurs de sensations fortes.",
  },
  economique: {
    label: "Économique",
    description: "Les meilleures offres pour voyager à petit budget.",
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryParam } = await params;
  const slug = categoryParam.toLowerCase();
  const meta = CATEGORY_META[slug];

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🚗</div>
        <h1 className="text-3xl font-black text-white mb-3">Catégorie introuvable</h1>
        <p className="text-slate-400 mb-8 max-w-sm">
          La catégorie « {categoryParam} » n'existe pas dans notre catalogue.
        </p>
        <Link href="/collection" className="inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold px-6 py-3 rounded-xl transition-colors">
          <ArrowLeft size={18} /> Voir toutes les catégories
        </Link>
      </div>
    );
  }

  const cars = ALL_CARS.filter(
    (c) => c.category.toLowerCase() === meta.label.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <div className="bg-[#0A0F1A] border-b border-white/8 pt-[72px]">
        <div className="container-xl py-12">
          <nav className="flex items-center gap-2 text-slate-500 text-sm mb-8">
            <Link href="/" className="hover:text-[#E30613]">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/collection" className="hover:text-[#E30613]">Collection</Link>
            <ChevronRight size={14} />
            <span className="text-[#E30613] font-semibold">{meta.label}</span>
          </nav>

          <span className="inline-flex items-center gap-2 bg-[#E30613]/10 border border-[#E30613]/25 text-[#E30613] text-[11px] font-black uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full mb-4">
            {cars.length} véhicule{cars.length !== 1 ? "s" : ""}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">{meta.label}</h1>
          <p className="text-slate-400 text-base max-w-xl">{meta.description}</p>
        </div>
      </div>

      <CategoryClient cars={cars} />

      <div className="border-t border-white/8 bg-[#080D18] py-8">
        <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">Vous ne trouvez pas le véhicule idéal ?</p>
          <a href="https://wa.me/212661813344?text=Bonjour%2C%20je%20cherche%20un%20v%C3%A9hicule%20sp%C3%A9cifique%20%C3%A0%20Tanger" target="_blank" className="inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#CC0511] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
            Demander sur mesure
          </a>
        </div>
      </div>
    </div>
  );
}