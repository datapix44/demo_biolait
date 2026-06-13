"use client";

import { useState } from "react";
import { Download, Share2, History, ZoomIn, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Version {
  id: string;
  number: number;
  imageUrl: string | null;
  prompt: string;
  createdAt: string;
}

interface PreviewPanelProps {
  currentImage: string | null;
  isGenerating: boolean;
  versions: Version[];
  onVersionSelect: (version: Version) => void;
  projectTitle: string;
}

export function PreviewPanel({
  currentImage,
  isGenerating,
  versions,
  onVersionSelect,
  projectTitle,
}: PreviewPanelProps) {
  const [showHistory, setShowHistory] = useState(false);

  const PLACEHOLDER_IMAGE =
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85";

  const displayImage = currentImage ?? PLACEHOLDER_IMAGE;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="px-5 py-4 border-b border-champagne/40 flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-poppins text-sm font-medium text-encre truncate">{projectTitle}</p>
          <p className="font-poppins text-xs text-encre/40">
            {versions.length > 0 ? `Version ${versions.length}` : "Première création"}
          </p>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-poppins text-xs transition-colors",
            showHistory
              ? "bg-terracotta/10 text-terracotta"
              : "text-encre/60 hover:bg-ivoire"
          )}
        >
          <History size={13} strokeWidth={1.5} />
          {versions.length > 0 ? `${versions.length} version${versions.length > 1 ? "s" : ""}` : "Historique"}
        </button>

        <button className="w-8 h-8 rounded-lg hover:bg-ivoire flex items-center justify-center text-encre/60 hover:text-encre transition-colors">
          <ZoomIn size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Preview area */}
      <div className="flex-1 relative overflow-hidden bg-ivoire/50">
        {/* Generation overlay */}
        {isGenerating && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-champagne border-t-terracotta animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-cormorant text-xl text-terracotta">B</span>
              </div>
            </div>
            <p className="font-cormorant text-xl text-encre mt-4">Belle crée pour vous...</p>
            <p className="font-poppins text-xs text-encre/50 mt-1">Quelques secondes</p>
          </div>
        )}

        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div
            className={cn(
              "relative max-w-full max-h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-500",
              isGenerating ? "scale-95 opacity-50" : "scale-100 opacity-100"
            )}
            style={{ aspectRatio: "1 / 1", maxHeight: "100%" }}
          >
            <img
              src={displayImage}
              alt={projectTitle}
              className="w-full h-full object-cover"
            />

            {/* Soft paywall blur overlay — shown for demo */}
            {false && (
              <div className="absolute inset-0 backdrop-blur-md bg-white/40 flex items-center justify-center">
                <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-xs mx-4">
                  <p className="font-cormorant text-2xl text-encre mb-2">
                    Votre création est prête !
                  </p>
                  <p className="font-poppins text-sm text-encre/60 mb-6">
                    Passez au Premium pour télécharger et continuer à créer sans limites.
                  </p>
                  <Button variant="primary" size="md" className="w-full">
                    Débloquer — 9€/mois
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fullscreen hint */}
        <button className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center text-encre/60 hover:text-encre hover:bg-white transition-all shadow-sm">
          <Maximize2 size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Version history drawer */}
      {showHistory && versions.length > 0 && (
        <div className="border-t border-champagne/40 p-4 bg-ivoire/50">
          <p className="font-poppins text-xs font-medium text-encre/60 mb-3">
            Historique des versions
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {versions.map((v) => (
              <button
                key={v.id}
                onClick={() => onVersionSelect(v)}
                className="shrink-0 flex flex-col items-center gap-1"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-champagne hover:border-terracotta transition-colors">
                  <img
                    src={v.imageUrl ?? PLACEHOLDER_IMAGE}
                    alt={`Version ${v.number}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-poppins text-xs text-encre/50">v{v.number}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-5 py-4 border-t border-champagne/40 flex items-center gap-3">
        <Button variant="primary" size="md" className="flex-1 gap-2">
          <Download size={15} />
          Télécharger
        </Button>
        <Button variant="soft" size="md" className="gap-2">
          <Share2 size={15} />
          Partager
        </Button>
      </div>
    </div>
  );
}
