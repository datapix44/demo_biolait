import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale: string = "fr-FR") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + "…" : str;
}

export const FREE_TIER_LIMIT = 5;

export function isOverFreeLimit(generationsUsed: number, plan: string) {
  return plan === "free" && generationsUsed >= FREE_TIER_LIMIT;
}
