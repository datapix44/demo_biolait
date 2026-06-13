import Link from "next/link";
import { Gift, Flower2, Heart, Baby, Star, Home } from "lucide-react";

const categories = [
  {
    slug: "cadeau-maitresse",
    name: "Cadeau maîtresse",
    description: "Pour remercier avec amour",
    icon: Gift,
    count: 48,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    color: "from-terracotta/20 to-terracotta/5",
    iconBg: "bg-terracotta/10",
    iconColor: "text-terracotta",
  },
  {
    slug: "fete-des-meres",
    name: "Fête des mères",
    description: "Des créations qui viennent du cœur",
    icon: Flower2,
    count: 63,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
    color: "from-sauge/20 to-sauge/5",
    iconBg: "bg-sauge/20",
    iconColor: "text-encre",
  },
  {
    slug: "mariage",
    name: "Mariage",
    description: "Le plus beau jour en beauté",
    icon: Heart,
    count: 87,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
    color: "from-champagne/40 to-champagne/10",
    iconBg: "bg-champagne/40",
    iconColor: "text-encre",
  },
  {
    slug: "naissance",
    name: "Naissance",
    description: "Accueillir le nouveau-né avec douceur",
    icon: Baby,
    count: 42,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    color: "from-terracotta/10 to-sauge/10",
    iconBg: "bg-terracotta/10",
    iconColor: "text-terracotta",
  },
  {
    slug: "noel",
    name: "Noël",
    description: "Magie et chaleur pour les fêtes",
    icon: Star,
    count: 94,
    image: "https://images.unsplash.com/photo-1482833973580-6f833f95b807?w=600&q=80",
    color: "from-encre/10 to-encre/5",
    iconBg: "bg-encre/10",
    iconColor: "text-encre",
  },
  {
    slug: "decoration",
    name: "Décoration",
    description: "Votre intérieur, votre signature",
    icon: Home,
    count: 71,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    color: "from-sauge/10 to-champagne/10",
    iconBg: "bg-sauge/20",
    iconColor: "text-encre",
  },
];

export function Categories() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="font-poppins text-xs font-medium text-terracotta uppercase tracking-widest mb-4">
            Pour chaque moment
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-encre">
            Quel est votre{" "}
            <span className="text-terracotta italic">prochain projet ?</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/inspirations?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden card-hover"
              >
                {/* Background image */}
                <div className="relative aspect-[4/3]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.color}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-encre/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className={`w-9 h-9 rounded-xl ${cat.iconBg} backdrop-blur-sm flex items-center justify-center`}>
                    <Icon size={16} className={cat.iconColor} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="font-cormorant text-xl font-semibold text-white">
                      {cat.name}
                    </h3>
                    <p className="font-poppins text-xs text-white/70 mt-0.5">
                      {cat.description}
                    </p>
                    <p className="font-poppins text-xs text-white/50 mt-1">
                      {cat.count} inspirations
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
