import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const inspirations = [
  {
    id: 1,
    title: "Tableau prénom bohème",
    category: "Décoration",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    likes: 342,
    height: "h-80",
  },
  {
    id: 2,
    title: "Cadeau maîtresse fleurs aquarelle",
    category: "Cadeau maîtresse",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    likes: 289,
    height: "h-52",
  },
  {
    id: 3,
    title: "Faire-part mariage champêtre",
    category: "Mariage",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
    likes: 418,
    height: "h-64",
  },
  {
    id: 4,
    title: "Mug naissance personnalisé",
    category: "Naissance",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    likes: 156,
    height: "h-60",
  },
  {
    id: 5,
    title: "Boîte cadeau fête des mères",
    category: "Fête des mères",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
    likes: 234,
    height: "h-72",
  },
  {
    id: 6,
    title: "Calendrier de l'avent illustré",
    category: "Noël",
    image: "https://images.unsplash.com/photo-1482833973580-6f833f95b807?w=600&q=80",
    likes: 567,
    height: "h-48",
  },
];

export function PopularInspirations() {
  return (
    <section className="py-28 bg-ivoire">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-poppins text-xs font-medium text-terracotta uppercase tracking-widest mb-4">
              Tendances du moment
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-encre">
              Ce que créent{" "}
              <span className="text-terracotta italic">nos créatrices</span>
            </h2>
          </div>
          <Button variant="outline" size="md" asChild>
            <Link href="/inspirations">Voir toutes les inspirations</Link>
          </Button>
        </div>

        {/* Masonry-ish grid (CSS columns) */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {inspirations.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
            >
              <img
                src={item.image}
                alt={item.title}
                className={`w-full ${item.height} object-cover transition-transform duration-500 group-hover:scale-105`}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-encre/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Like button */}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white">
                <Heart size={14} className="text-terracotta" strokeWidth={1.5} />
              </button>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Badge variant="champagne" className="mb-2">{item.category}</Badge>
                <p className="font-poppins text-sm font-medium text-white">{item.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Heart size={11} className="text-terracotta fill-terracotta" />
                  <span className="font-poppins text-xs text-white/70">{item.likes}</span>
                </div>
              </div>

              {/* Personnaliser button on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="primary" size="sm" asChild>
                  <Link href={`/workspace/new?template=${item.id}`}>
                    Personnaliser
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
