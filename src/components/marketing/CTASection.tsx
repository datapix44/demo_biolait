import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const freeBenefits = [
  "5 créations offertes",
  "Sans carte bancaire",
  "Sans engagement",
  "Accès immédiat",
];

const premiumBenefits = [
  "Créations illimitées",
  "Exports haute résolution",
  "Tous les formats (SVG, PNG, PDF)",
  "Historique complet",
  "Licence commerciale",
  "Support prioritaire",
];

export function CTASection() {
  return (
    <section className="py-28 bg-encre relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sauge/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <p className="font-poppins text-xs font-medium text-terracotta uppercase tracking-widest mb-6">
              Commencez maintenant
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-ivoire leading-tight">
              Votre première création
              <br />
              <span className="text-terracotta italic">vous attend</span>
            </h2>
            <p className="mt-6 font-poppins text-base text-ivoire/60 leading-relaxed max-w-md">
              Rejoignez 2 400 créatrices qui transforment leurs idées en
              réalité. Commencez gratuitement, créez dès aujourd&apos;hui.
            </p>

            <ul className="mt-8 space-y-3">
              {freeBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-terracotta" />
                  </div>
                  <span className="font-poppins text-sm text-ivoire/70">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" asChild className="group">
                <Link href="/signup">
                  Créer mon compte gratuit
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="bg-white/10 text-ivoire rounded-full hover:bg-white/20 border border-white/20 font-poppins"
              >
                <Link href="/inspirations">Voir les inspirations</Link>
              </Button>
            </div>
          </div>

          {/* Right — Pricing card */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              {/* Free */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-cormorant text-2xl font-semibold text-ivoire">Gratuit</h3>
                    <p className="font-poppins text-sm text-ivoire/50">Pour découvrir</p>
                  </div>
                  <div className="text-right">
                    <p className="font-cormorant text-4xl font-bold text-ivoire">0€</p>
                    <p className="font-poppins text-xs text-ivoire/40">pour toujours</p>
                  </div>
                </div>
                <Button variant="outline" size="md" asChild className="w-full border-white/20 text-ivoire hover:bg-white/10 hover:text-ivoire rounded-full">
                  <Link href="/signup">Commencer gratuitement</Link>
                </Button>
              </div>

              {/* Premium */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-cormorant text-2xl font-semibold text-ivoire">Premium</h3>
                      <span className="bg-terracotta text-white text-xs font-poppins font-medium px-2 py-0.5 rounded-full">
                        Populaire
                      </span>
                    </div>
                    <p className="font-poppins text-sm text-ivoire/50">Pour créer sans limites</p>
                  </div>
                  <div className="text-right">
                    <p className="font-cormorant text-4xl font-bold text-terracotta">9€</p>
                    <p className="font-poppins text-xs text-ivoire/40">par mois</p>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {premiumBenefits.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-terracotta" />
                      </div>
                      <span className="font-poppins text-sm text-ivoire/70">{b}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="md" asChild className="w-full">
                  <Link href="/signup?plan=premium">Passer au Premium</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
