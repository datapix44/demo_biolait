import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockTemplates, mockCategories } from "@/lib/mock-data";
import { InspirationCard } from "@/components/gallery/InspirationCard";

const mockFavorites = mockTemplates.filter((t) => t.is_featured).slice(0, 4);

export default function FavoritesPage() {
  const getCategoryName = (categoryId: string) =>
    mockCategories.find((c) => c.id === categoryId)?.name;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Heart size={22} className="text-terracotta" strokeWidth={1.5} />
          <h1 className="font-cormorant text-4xl font-semibold text-encre">
            Mes favoris
          </h1>
        </div>
        <p className="font-poppins text-sm text-encre/50">
          {mockFavorites.length} inspiration{mockFavorites.length > 1 ? "s" : ""} sauvegardée{mockFavorites.length > 1 ? "s" : ""}
        </p>
      </div>

      {mockFavorites.length === 0 ? (
        <div className="text-center py-24">
          <Heart size={40} className="text-champagne mx-auto mb-4" strokeWidth={1} />
          <p className="font-cormorant text-3xl text-encre/40">
            Aucun favori pour l&apos;instant
          </p>
          <p className="font-poppins text-sm text-encre/30 mt-2 mb-6">
            Explorez les inspirations et cliquez sur ♡ pour sauvegarder vos coups de cœur
          </p>
          <Button variant="primary" asChild>
            <Link href="/inspirations">Explorer les inspirations</Link>
          </Button>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {mockFavorites.map((template) => (
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
  );
}
