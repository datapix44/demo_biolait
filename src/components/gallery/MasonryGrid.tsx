"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { InspirationCard } from "./InspirationCard";
import { CategoryFilter } from "./CategoryFilter";
import { Input } from "@/components/ui/input";
import type { Template, Category } from "@/types";

interface MasonryGridProps {
  templates: Template[];
  categories: Category[];
}

export function MasonryGrid({ templates, categories }: MasonryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = templates;
    if (activeCategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) result = result.filter((t) => t.category_id === cat.id);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [templates, categories, activeCategory, search]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name;
  };

  return (
    <div>
      {/* Search + Filters */}
      <div className="sticky top-[72px] z-30 bg-ivoire/95 backdrop-blur-sm py-4 border-b border-champagne/40 mb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-encre/30"
              strokeWidth={1.5}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une inspiration..."
              className="pl-9"
            />
          </div>
          <CategoryFilter
            categories={categories}
            activeSlug={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="font-poppins text-sm text-encre/50">
          {filtered.length} inspiration{filtered.length > 1 ? "s" : ""}
          {activeCategory && (
            <span>
              {" "}dans{" "}
              <span className="text-terracotta">
                {categories.find((c) => c.slug === activeCategory)?.name}
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Masonry grid using CSS columns */}
      <div className="max-w-7xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-3xl text-encre/40">
              Aucune inspiration trouvée
            </p>
            <p className="font-poppins text-sm text-encre/30 mt-2">
              Essayez d&apos;autres mots-clés ou catégories
            </p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((template) => (
              <div key={template.id} className="break-inside-avoid">
                <InspirationCard
                  template={template}
                  categoryName={getCategoryName(template.category_id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
