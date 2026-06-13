import Link from "next/link";
import { Plus, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockProjects = [
  {
    id: "p-1",
    title: "Cadeau maîtresse Emma",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
    status: "completed",
    versions: 3,
    updatedAt: "Il y a 2 jours",
    category: "Cadeau maîtresse",
  },
  {
    id: "p-2",
    title: "Tableau salon bohème",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    status: "draft",
    versions: 5,
    updatedAt: "Il y a 1 semaine",
    category: "Décoration",
  },
  {
    id: "p-3",
    title: "Faire-part mariage Sophie & Pierre",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
    status: "completed",
    versions: 8,
    updatedAt: "Il y a 2 semaines",
    category: "Mariage",
  },
];

const statusLabel: Record<string, { label: string; color: string }> = {
  completed: { label: "Terminé", color: "bg-sauge/20 text-encre" },
  draft: { label: "En cours", color: "bg-terracotta/10 text-terracotta" },
  archived: { label: "Archivé", color: "bg-champagne/40 text-encre/60" },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-cormorant text-4xl font-semibold text-encre">
            Mes projets
          </h1>
          <p className="font-poppins text-sm text-encre/50 mt-1">
            {mockProjects.length} création{mockProjects.length > 1 ? "s" : ""} sauvegardée{mockProjects.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="primary" size="md" asChild className="gap-2">
          <Link href="/workspace/new">
            <Plus size={16} />
            Nouveau projet
          </Link>
        </Button>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockProjects.map((project) => {
          const status = statusLabel[project.status];
          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-champagne/60 overflow-hidden card-hover group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-encre/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Link
                  href={`/workspace/${project.id}`}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <span className="bg-white text-encre font-poppins text-sm font-medium px-4 py-2 rounded-full shadow-md">
                    Ouvrir
                  </span>
                </Link>
                <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                  <MoreHorizontal size={13} className="text-encre" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-poppins text-sm font-semibold text-encre truncate">
                  {project.title}
                </h3>
                <p className="font-poppins text-xs text-encre/40 mt-0.5">
                  {project.category}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className={`font-poppins text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                  <div className="flex items-center gap-1 text-encre/30">
                    <Clock size={11} />
                    <span className="font-poppins text-xs">{project.updatedAt}</span>
                  </div>
                </div>

                <p className="font-poppins text-xs text-encre/30 mt-1">
                  {project.versions} version{project.versions > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          );
        })}

        {/* Empty new project card */}
        <Link
          href="/workspace/new"
          className="bg-ivoire border-2 border-dashed border-champagne rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 hover:border-terracotta/50 hover:bg-terracotta/5 transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-full bg-champagne/40 group-hover:bg-terracotta/10 flex items-center justify-center transition-colors">
            <Plus size={20} className="text-encre/40 group-hover:text-terracotta transition-colors" />
          </div>
          <span className="font-poppins text-sm text-encre/40 group-hover:text-terracotta transition-colors">
            Nouvelle création
          </span>
        </Link>
      </div>
    </div>
  );
}
