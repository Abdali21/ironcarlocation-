"use client";

/**
 * Navbar – Iron Car Location
 * - Fixed, 72px, Iron Navy
 * - Scroll-aware shadow
 * - Desktop: hash links (smooth scroll) + /collection page link
 * - Mobile: animated slide-down menu
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, LayoutGrid } from "lucide-react";

/* ── Constants ── */
const WA_URL =
  "https://wa.me/212661813344?text=Bonjour%2C%20je%20veux%20r%C3%A9server%20une%20voiture%20%C3%A0%20Tanger";

/* Hash links — only work on the home page */
const HASH_LINKS = [
  { label: "Accueil",      href: "#hero" },
  { label: "Nos véhicules", href: "#fleet" },
  { label: "Services",     href: "#services" },
  { label: "À Propos",    href: "#why-us" },
];

const PAGE_LINKS = [
  { label: "Collection", href: "/collection" },
];

/* ── Smooth scroll helper ── */
function scrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Handle hash link clicks (home vs other page) ── */
function useHashNav(pathname: string) {
  return function handleHash(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname === "/") {
      e.preventDefault();
      scrollTo(href);
    }
    // On other pages let Next.js navigate to /#hash
  };
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const handleHash = useHashNav(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isCollection = pathname === "/collection";

  return (
    <>
      {/* ── Main navbar ── */}
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#0A0F1A] border-b border-[#E30613]/30 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <nav
          className="container-xl h-full flex items-center justify-between gap-4"
          aria-label="Navigation principale"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Iron Car Location – Accueil"
          >
            {/* TODO: Place logo.png in public/ directory */}
            <Image
              src="/logo.png"
              alt="Iron Car Location logo"
              width={140}
              height={42}
              className="h-[36px] sm:h-[42px] w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden lg:flex items-center gap-6" role="list">
            {HASH_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={pathname === "/" ? link.href : `/${link.href}`}
                  onClick={(e) => handleHash(e, link.href)}
                  className="text-slate-300 hover:text-[#E30613] text-sm font-medium transition-colors duration-200 relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#E30613] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}

            {/* ─ Notre Collection (page link) ─ */}
            <li>
              <Link
                href="/collection"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 relative group py-1 ${
                  isCollection
                    ? "text-[#E30613]"
                    : "text-slate-300 hover:text-[#E30613]"
                }`}
              >
                <LayoutGrid size={14} />
                Notre Collection
                {isCollection && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#E30613]" />
                )}
                {!isCollection && (
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#E30613] transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            </li>
          </ul>

          {/* ── Desktop WhatsApp CTA ── */}
          <a
            id="navbar-whatsapp-cta"
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] active:translate-y-0 shrink-0"
          >
            <MessageCircle size={17} strokeWidth={2} />
            Réserver maintenant
          </a>

          {/* ── Mobile Hamburger ── */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="close"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="mobile-menu"
              className="fixed top-[72px] left-0 right-0 z-50 bg-[#0F172A] border-b border-[#D4AF37]/20 lg:hidden"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ul className="container-xl py-5 flex flex-col gap-1" role="list">
                {HASH_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={pathname === "/" ? link.href : `/${link.href}`}
                      onClick={(e) => {
                        handleHash(e, link.href);
                        setMenuOpen(false);
                      }}
              className={`flex items-center gap-3 text-slate-200 hover:text-[#E30613] font-medium text-base py-3 px-2 rounded-lg hover:bg-white/5 transition-colors`}
                    >
                      <span className="text-[#E30613] text-xs">▸</span>
                      {link.label}
                    </a>
                  </li>
                ))}

                {/* Notre Collection mobile link */}
                <li>
                  <Link
                    href="/collection"
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 font-medium text-base py-3 px-2 rounded-lg hover:bg-white/5 transition-colors ${
                      isCollection ? "text-[#D4AF37]" : "text-slate-200 hover:text-[#D4AF37]"
                    }`}
                  >
                    <LayoutGrid size={14} className="text-[#D4AF37]" />
                    Notre Collection
                  </Link>
                </li>

                {/* Mobile WhatsApp CTA */}
                <li className="mt-3 pt-3 border-t border-white/10">
                  <a
                    id="mobile-whatsapp-cta"
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-base py-3.5 rounded-xl transition-colors"
                  >
                    <MessageCircle size={20} />
                    Réserver maintenant
                  </a>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
