import { MasonryGrid } from "@/components/gallery/MasonryGrid";
import { mockTemplates, mockCategories } from "@/lib/mock-data";

export const metadata = {
  title: "Inspirations — MakerBelle",
  description: "Des centaines d'inspirations pour vos créations personnalisées",
};

export default function InspirationsPage() {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-champagne/40 px-6 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <p className="font-poppins text-xs font-medium text-terracotta uppercase tracking-widest mb-3">
            Galerie d&apos;inspirations
          </p>
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-encre">
            Qu&apos;est-ce qui vous{" "}
            <span className="text-terracotta italic">inspire aujourd&apos;hui ?</span>
          </h1>
          <p className="mt-3 font-poppins text-sm text-encre/60 max-w-lg">
            Cliquez sur une création pour la personnaliser avec Belle — ajoutez votre
            prénom, changez les couleurs, le style, tout est possible.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="py-8">
        <MasonryGrid templates={mockTemplates} categories={mockCategories} />
      </div>
    </div>
  );
}
