/**
 * Iron Car Location – Home Page
 *
 * Section render order:
 * 0. Navbar (fixed, always visible)
 * 1. Hero
 * 2. FeaturedFleet (interactive showcase)
 * 3. CategorySection × 3 (Luxe, Sport, Économique)
 * 4. HowItWorks
 * 5. WhyIronCar
 * 6. SocialProof
 * 7. Services
 * 8. FAQ
 * 9. FinalCTA + footer
 *
 * Server Component — all animated children are "use client".
 */

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import FeaturedFleet from "./sections/FeaturedFleet";
import CategorySection from "./components/CategorySection";
import HowItWorks from "./sections/HowItWorks";
import WhyIronCar from "./sections/WhyIronCar";
import SocialProof from "./sections/SocialProof";
import Services from "./sections/Services";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import { ALL_CARS } from "@/lib/fleet";

/* Pull cars per category */
const carsByCategory = (cat: string) =>
  ALL_CARS.filter((c) => c.category === cat);

export default function HomePage() {
  return (
    <>
      {/* Fixed navigation bar */}
      <Navbar />

      <main id="main-content">
        {/* 1 – Full-screen hero with car image */}
        <Hero />

        {/* 2 – Car fleet interactive showcase */}
        <FeaturedFleet />

        {/* 3 – Category sections (alternating dark backgrounds) */}
        <CategorySection
          title="Voitures de Luxe"
          category="Luxe"
          cars={carsByCategory("Luxe")}
          bg="darker"
        />
        <CategorySection
          title="Voitures Sport"
          category="Sport"
          cars={carsByCategory("Sport")}
          bg="dark"
        />
        <CategorySection
          title="Économique"
          category="Économique"
          cars={carsByCategory("Économique")}
          bg="darker"
        />

        {/* 4 – How to book (4 steps) */}
        <HowItWorks />

        {/* 5 – Why Iron Car */}
        <WhyIronCar />

        {/* 6 – Customer reviews */}
        <SocialProof />

        {/* 7 – Services list */}
        <Services />

        {/* 8 – FAQ accordion */}
        <FAQ />

        {/* 9 – Final CTA + footer */}
        <FinalCTA />
      </main>
    </>
  );
}
