import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely.
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-[#D4AF37]", "text-white")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price in Moroccan Dirham.
 * @example formatPrice(299) → "299 MAD"
 */
export function formatPrice(amount: number): string {
  return `${amount} MAD`;
}

/**
 * Builds a WhatsApp URL with a pre-filled message.
 * @param phone  Phone number in international format without "+" (e.g. "212600000000")
 * @param message  Plain-text message to pre-fill
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Default Iron Car WhatsApp reservation URL.
 */
export const IRON_CAR_WA_URL = buildWhatsAppUrl(
  "212600000000",
  "Bonjour, je veux réserver une voiture à Tanger"
);
