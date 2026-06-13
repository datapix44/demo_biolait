"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Ai-je besoin de compétences en design pour utiliser MakerBelle ?",
    answer:
      "Absolument pas ! C'est précisément pour ça que MakerBelle existe. Vous décrivez simplement ce que vous voulez en français naturel — comme vous l'expliqueriez à une amie créatrice — et Belle s'occupe de tout le reste.",
  },
  {
    question: "Qu'est-ce que je reçois une fois ma création terminée ?",
    answer:
      "Vous téléchargez votre création en haute résolution (PNG, SVG, PDF selon le format). Le fichier est directement utilisable avec Cricut, Silhouette, pour l'impression chez un imprimeur ou à la maison, ou encore dans Canva pour aller plus loin.",
  },
  {
    question: "Comment fonctionne le forfait gratuit ?",
    answer:
      "Avec le forfait gratuit, vous pouvez réaliser 5 créations complètes, sans engagement et sans carte bancaire. C'est largement suffisant pour découvrir MakerBelle et créer votre premier cadeau ou décoration.",
  },
  {
    question: "Puis-je modifier ma création autant de fois que je veux ?",
    answer:
      "Oui ! Chaque conversation avec Belle génère une nouvelle version. Affinez sans limites — changez les couleurs, ajoutez un prénom, modifiez le style. Chaque version est sauvegardée dans votre historique, vous pouvez toujours revenir en arrière.",
  },
  {
    question: "Les créations sont-elles vraiment uniques ?",
    answer:
      "Chaque création est générée spécialement pour vous, à partir de votre description unique. Même si deux personnes demandent « un cadeau maîtresse avec des fleurs », Belle créera deux visuels différents selon les détails de chaque conversation.",
  },
  {
    question: "MakerBelle, c'est bien adapté pour le Cricut ?",
    answer:
      "Absolument. Nous exportons en formats vectoriels (SVG) parfaitement compatibles avec Cricut Design Space. Beaucoup de nos créatrices utilisent MakerBelle spécifiquement pour alimenter leurs projets Cricut — gain de temps et qualité garantis.",
  },
  {
    question: "Puis-je utiliser mes créations pour les revendre (Etsy, marchés...) ?",
    answer:
      "Avec l'abonnement Premium, vous disposez d'une licence commerciale complète sur vos créations. Vous pouvez les vendre sur Etsy, dans votre boutique, sur les marchés artisanaux — vos créations vous appartiennent.",
  },
  {
    question: "Comment annuler mon abonnement Premium ?",
    answer:
      "En un clic, sans conditions. Rendez-vous dans Paramètres → Abonnement → Annuler. Vous conservez l'accès Premium jusqu'à la fin de votre période de facturation. Pas de rétention cachée.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-poppins text-xs font-medium text-terracotta uppercase tracking-widest mb-4">
            Questions fréquentes
          </p>
          <h2 className="font-cormorant text-5xl font-semibold text-encre">
            Tout ce que vous voulez{" "}
            <span className="text-terracotta italic">savoir</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-200",
                openIndex === index
                  ? "border-terracotta/30 bg-terracotta/5"
                  : "border-champagne/60 bg-white hover:border-terracotta/20"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-poppins text-sm font-medium text-encre pr-8">
                  {faq.question}
                </span>
                <div className={cn(
                  "shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors",
                  openIndex === index ? "bg-terracotta text-white" : "bg-champagne/40 text-encre"
                )}>
                  {openIndex === index ? (
                    <Minus size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="font-poppins text-sm text-encre/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <p className="text-center font-poppins text-sm text-encre/50 mt-10">
          Vous avez d&apos;autres questions ?{" "}
          <a href="mailto:bonjour@makerbelle.fr" className="text-terracotta hover:underline">
            Écrivez-nous
          </a>
        </p>
      </div>
    </section>
  );
}
