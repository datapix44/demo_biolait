"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  activeSlug: string | null;
  onChange: (slug: string | null) => void;
}

export function CategoryFilter({ categories, activeSlug, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 font-poppins text-sm rounded-full px-5 py-2 transition-all duration-200 border",
          activeSlug === null
            ? "bg-encre text-ivoire border-encre"
            : "bg-white text-encre/70 border-champagne hover:border-terracotta/50 hover:text-terracotta"
        )}
      >
        Toutes
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={cn(
            "shrink-0 font-poppins text-sm rounded-full px-5 py-2 transition-all duration-200 border",
            activeSlug === cat.slug
              ? "bg-terracotta text-white border-terracotta"
              : "bg-white text-encre/70 border-champagne hover:border-terracotta/50 hover:text-terracotta"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
