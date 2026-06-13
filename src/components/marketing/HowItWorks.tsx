import { MessageCircle, Wand2, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Décrivez votre envie",
    title_en: "Describe your idea",
    description:
      "Écrivez simplement ce que vous imaginez, en langage naturel. « Un cadeau pour la maîtresse avec des fleurs et le prénom Emma ». Belle comprend tout.",
    description_en:
      "Simply write what you imagine, in natural language. Belle understands everything.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&q=80",
    color: "bg-terracotta/10",
    iconColor: "text-terracotta",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Belle crée pour vous",
    title_en: "Belle creates for you",
    description:
      "En quelques secondes, votre création prend vie. Affinez à l'infini — plus de couleurs, autre style, changer un détail. Belle s'adapte à chaque retour.",
    description_en:
      "In seconds, your creation comes to life. Refine endlessly — more colors, different style, change a detail.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    color: "bg-sauge/20",
    iconColor: "text-sauge",
  },
  {
    number: "03",
    icon: Download,
    title: "Exportez & créez",
    title_en: "Export & create",
    description:
      "Téléchargez votre création en haute résolution. Prêt pour Cricut, l'impression, Canva ou votre artisan local. Votre idée, vos mains, votre magie.",
    description_en:
      "Download your creation in high resolution. Ready for Cricut, printing, Canva or your local craftsperson.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80",
    color: "bg-champagne/40",
    iconColor: "text-encre",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="font-poppins text-xs font-medium text-terracotta uppercase tracking-widest mb-4">
            Simple comme bonjour
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-encre">
            Créer n&apos;a jamais
            <br />
            <span className="text-terracotta italic">été aussi simple</span>
          </h2>
          <p className="mt-5 font-poppins text-base text-encre/60 leading-relaxed">
            Pas besoin de compétences techniques. Pas de logiciel complexe.
            Juste vous, vos idées, et Belle.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="group relative">
                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(100%_-_1rem)] w-8 h-px bg-champagne z-10" />
                )}

                <div className="flex flex-col h-full">
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-encre/20 to-transparent" />
                    {/* Step number */}
                    <div className="absolute top-4 left-4 font-cormorant text-5xl font-bold text-white/30">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`rounded-2xl p-6 ${step.color} flex-1`}>
                    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm`}>
                      <Icon size={18} className={step.iconColor} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-cormorant text-2xl font-semibold text-encre mb-2">
                      {step.title}
                    </h3>
                    <p className="font-poppins text-sm text-encre/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
