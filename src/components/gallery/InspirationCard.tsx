"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Template } from "@/types";
import { cn } from "@/lib/utils";

interface InspirationCardProps {
  template: Template;
  categoryName?: string;
}

export function InspirationCard({ template, categoryName }: InspirationCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(template.popularity);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-champagne/40 card-hover">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={template.image_url}
          alt={template.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ aspectRatio: "auto" }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-encre/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Like button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-sm"
          aria-label="Aimer"
        >
          <Heart
            size={14}
            className={cn(
              "transition-colors",
              liked ? "fill-terracotta text-terracotta" : "text-encre/60"
            )}
            strokeWidth={1.5}
          />
        </button>

        {/* Featured badge */}
        {template.is_featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1">
            <Sparkles size={10} className="text-terracotta" />
            <span className="font-poppins text-xs font-medium text-terracotta">Tendance</span>
          </div>
        )}

        {/* Personnaliser CTA on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button variant="primary" size="sm" asChild className="w-full">
            <Link href={`/workspace/new?template=${template.id}`}>
              Personnaliser cette création
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {categoryName && (
          <Badge variant="champagne" className="mb-2 text-xs">
            {categoryName}
          </Badge>
        )}
        <h3 className="font-poppins text-sm font-medium text-encre leading-snug">
          {template.title}
        </h3>
        <p className="font-poppins text-xs text-encre/50 mt-1 line-clamp-2">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-poppins text-xs text-encre/40 bg-ivoire rounded-full px-2 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Like count */}
        <div className="flex items-center gap-1 mt-3">
          <Heart size={11} className="text-terracotta/60" strokeWidth={1.5} />
          <span className="font-poppins text-xs text-encre/40">{likeCount}</span>
        </div>
      </div>
    </div>
  );
}
