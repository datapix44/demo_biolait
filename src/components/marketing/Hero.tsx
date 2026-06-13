"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockCreations = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
    alt: "Cadeau personnalisé fête des mères",
    label: "Fête des mères",
    rotate: "-rotate-3",
    top: "top-4",
    left: "left-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    alt: "Décoration bohème personnalisée",
    label: "Décoration maison",
    rotate: "rotate-2",
    top: "top-16",
    left: "left-40",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
    alt: "Cadeau de mariage personnalisé",
    label: "Mariage",
    rotate: "-rotate-1",
    top: "top-2",
    left: "left-72",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ivoire">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,133,114,0.08) 0%, transparent 60%),
                            radial-gradient(circle at 80% 20%, rgba(166,180,161,0.08) 0%, transparent 50%)`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Copy */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-terracotta/10 border border-terracotta/20 rounded-full px-4 py-1.5 mb-8">
            <Sparkles size={14} className="text-terracotta" />
            <span className="font-poppins text-xs font-medium text-terracotta">
              Créez quelque chose d&apos;unique aujourd&apos;hui
            </span>
          </div>

          <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-semibold text-encre leading-[1.05]">
            Des idées plein
            <br />
            la tête.{" "}
            <span className="text-terracotta italic">Des créations</span>
            <br />
            plein les mains.
          </h1>

          <p className="mt-6 font-poppins text-lg text-encre/60 leading-relaxed max-w-md">
            Décrivez simplement ce que vous imaginez. Belle, votre créatrice
            personnelle, transforme vos idées en créations uniques — cadeaux,
            décorations, souvenirs.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
            <Button variant="primary" size="lg" asChild className="group">
              <Link href="/signup">
                Commencer à créer
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/inspirations">Voir les inspirations</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&q=80",
                "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Créatrice MakerBelle"
                  className="w-9 h-9 rounded-full object-cover border-2 border-ivoire"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#C98572">
                    <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z" />
                  </svg>
                ))}
              </div>
              <p className="font-poppins text-xs text-encre/50 mt-0.5">
                <span className="font-medium text-encre">2 400+</span> créatrices nous font confiance
              </p>
            </div>
          </div>
        </div>

        {/* Right — Visual collage */}
        <div
          className="relative h-[520px] hidden lg:block animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Main large image */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-encre/10">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Création personnalisée MakerBelle"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-encre/30 to-transparent" />

            {/* Belle chat bubble overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center shrink-0">
                    <span className="font-cormorant text-white font-semibold text-sm">B</span>
                  </div>
                  <div>
                    <p className="font-poppins text-xs font-medium text-encre">Belle</p>
                    <p className="font-poppins text-sm text-encre/70 mt-0.5">
                      J&apos;adore cette idée ! Et si on ajoutait des fleurs de
                      pivoines pour une touche encore plus personnelle ?
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="bg-ivoire rounded-full px-3 py-1 text-xs font-poppins text-encre/60 border border-champagne">
                    Oui, j&apos;adore !
                  </div>
                  <div className="bg-ivoire rounded-full px-3 py-1 text-xs font-poppins text-encre/60 border border-champagne">
                    Style bohème plutôt
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card — top right */}
          <div className="absolute -top-4 -right-4 w-36 h-36 rounded-2xl overflow-hidden shadow-lg rotate-3 border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&q=80"
              alt="Cadeau maîtresse"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating card — bottom right */}
          <div className="absolute -bottom-4 -right-6 w-32 h-32 rounded-2xl overflow-hidden shadow-lg -rotate-2 border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80"
              alt="Décoration mariage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s" }}>
        <span className="font-poppins text-xs text-encre/30 uppercase tracking-widest">Découvrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-terracotta/40 to-transparent" />
      </div>
    </section>
  );
}
