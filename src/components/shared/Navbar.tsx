"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale?: "fr" | "en";
}

const navLinks = {
  fr: [
    { label: "Inspirations", href: "/inspirations" },
    { label: "Comment ça marche", href: "/#how-it-works" },
    { label: "Tarifs", href: "/#pricing" },
  ],
  en: [
    { label: "Inspirations", href: "/inspirations" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
  ],
};

export function Navbar({ locale = "fr" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = navLinks[locale];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ivoire/95 backdrop-blur-sm shadow-sm border-b border-champagne/40"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <Logo size="md" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-poppins text-sm text-encre/70 hover:text-terracotta transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              {locale === "fr" ? "Se connecter" : "Sign in"}
            </Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/signup">
              {locale === "fr" ? "Commencer" : "Get started"}
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-encre hover:text-terracotta transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ivoire border-t border-champagne/40 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-poppins text-sm text-encre/70 hover:text-terracotta py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-champagne/40">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                {locale === "fr" ? "Se connecter" : "Sign in"}
              </Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/signup">
                {locale === "fr" ? "Commencer gratuitement" : "Start for free"}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
