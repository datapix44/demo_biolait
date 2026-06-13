import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie-Laure D.",
    role: "Maman de 3 enfants",
    location: "Lyon",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&q=80",
    content:
      "J'ai créé le cadeau de fin d'année pour la maîtresse de ma fille en 10 minutes. Elle a adoré ! C'est exactement ce que j'imaginais, avec le prénom Léa et les petites fleurs roses. Je n'aurais jamais pu faire ça seule.",
    creation: "Cadeau maîtresse personnalisé",
    highlight: "10 minutes",
  },
  {
    id: 2,
    name: "Sophie M.",
    role: "DIY enthusiast",
    location: "Paris",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
    content:
      "Je fais du Cricut depuis 3 ans mais je galérais toujours avec les designs. Depuis MakerBelle, je décris juste ce que je veux et j'ai mon fichier prêt à découper. Révolutionnaire pour ma chaîne DIY.",
    creation: "Designs Cricut personnalisés",
    highlight: "Révolutionnaire",
  },
  {
    id: 3,
    name: "Aurélie et Pierre",
    role: "Futurs mariés",
    location: "Bordeaux",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&q=80",
    content:
      "Tous nos faire-part, nos menus, nos plans de table... on a tout créé avec Belle. Le style champêtre exactement comme on le voulait. Notre wedding planner n'en revenait pas de la qualité.",
    creation: "Papeterie de mariage complète",
    highlight: "Style champêtre parfait",
  },
  {
    id: 4,
    name: "Nathalie K.",
    role: "Créatrice Etsy",
    location: "Nantes",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80",
    content:
      "J'utilise MakerBelle pour générer mes designs personnalisés pour ma boutique Etsy. Mes clientes repartent avec exactement ce qu'elles voulaient. Mon chiffre d'affaires a augmenté de 40% en 2 mois.",
    creation: "Boutique Etsy personnalisée",
    highlight: "+40% de CA",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 bg-ivoire-warm">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="font-poppins text-xs font-medium text-terracotta uppercase tracking-widest mb-4">
            Elles ont osé créer
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-encre">
            Des créations qui{" "}
            <span className="text-terracotta italic">viennent du cœur</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-8 border border-champagne/60 card-hover"
            >
              <Quote size={28} className="text-terracotta/30 mb-4" strokeWidth={1.5} />

              <p className="font-poppins text-base text-encre/80 leading-relaxed">
                {t.content}
              </p>

              {/* Highlight badge */}
              <div className="mt-5 inline-flex items-center gap-2 bg-terracotta/10 rounded-full px-3 py-1">
                <span className="font-poppins text-xs font-medium text-terracotta">
                  ✦ {t.highlight}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t border-champagne/40 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-champagne"
                />
                <div>
                  <p className="font-poppins text-sm font-semibold text-encre">{t.name}</p>
                  <p className="font-poppins text-xs text-encre/50">
                    {t.role} · {t.location}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-poppins text-xs text-encre/40">A créé :</p>
                  <p className="font-poppins text-xs font-medium text-terracotta">{t.creation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "2 400+", label: "Créatrices actives" },
            { value: "18 000+", label: "Créations réalisées" },
            { value: "4.9/5", label: "Note moyenne" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-cormorant text-5xl font-semibold text-terracotta">{stat.value}</p>
              <p className="font-poppins text-sm text-encre/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
