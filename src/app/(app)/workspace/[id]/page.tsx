"use client";

import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ChatPanel } from "@/components/workspace/ChatPanel";
import { PreviewPanel } from "@/components/workspace/PreviewPanel";

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=85",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=85",
];

export default function WorkspacePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [versions, setVersions] = useState<
    { id: string; number: number; imageUrl: string | null; prompt: string; createdAt: string }[]
  >([]);
  const [projectTitle] = useState("Ma création");

  const handleGenerate = useCallback((prompt: string) => {
    setIsGenerating(true);

    setTimeout(() => {
      const newImage = MOCK_IMAGES[versions.length % MOCK_IMAGES.length];
      const newVersion = {
        id: `v-${Date.now()}`,
        number: versions.length + 1,
        imageUrl: newImage,
        prompt,
        createdAt: new Date().toISOString(),
      };
      setVersions((prev) => [...prev, newVersion]);
      setCurrentImage(newImage);
      setIsGenerating(false);
    }, 2500);
  }, [versions]);

  const handleVersionSelect = useCallback(
    (version: { id: string; number: number; imageUrl: string | null; prompt: string; createdAt: string }) => {
      setCurrentImage(version.imageUrl);
    },
    []
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Workspace header */}
      <div className="h-14 md:h-16 bg-white border-b border-champagne/40 flex items-center gap-4 px-4 md:px-6 shrink-0">
        <Link
          href="/inspirations"
          className="p-2 rounded-xl hover:bg-ivoire transition-colors text-encre/60 hover:text-encre"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-cormorant text-xl font-semibold text-encre truncate">
            {projectTitle}
          </h1>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-sauge" />
          <span className="font-poppins text-xs text-encre/40 hidden sm:inline">Enregistré</span>
        </div>
      </div>

      {/* Workspace layout: chat left, preview right */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat panel */}
        <div className="w-full md:w-[400px] lg:w-[440px] border-r border-champagne/40 flex flex-col overflow-hidden">
          <ChatPanel onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Preview panel */}
        <div className="hidden md:flex flex-1 flex-col overflow-hidden">
          <PreviewPanel
            currentImage={currentImage}
            isGenerating={isGenerating}
            versions={versions}
            onVersionSelect={handleVersionSelect}
            projectTitle={projectTitle}
          />
        </div>
      </div>
    </div>
  );
}
