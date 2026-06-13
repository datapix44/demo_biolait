import Link from "next/link";
import { LayoutGrid, FolderHeart, Heart, Settings, Plus } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Inspirations", href: "/inspirations", icon: LayoutGrid },
  { label: "Mes projets", href: "/projects", icon: FolderHeart },
  { label: "Favoris", href: "/favorites", icon: Heart },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 bg-white border-r border-champagne/60 z-40">
        <div className="p-6 border-b border-champagne/40">
          <Logo size="sm" />
        </div>

        {/* New creation CTA */}
        <div className="p-4">
          <Button variant="primary" size="md" asChild className="w-full gap-2">
            <Link href="/workspace/new">
              <Plus size={16} />
              Nouvelle création
            </Link>
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-poppins text-sm text-encre/70 hover:text-terracotta hover:bg-terracotta/5 transition-all duration-150"
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>

        {/* User / Settings */}
        <div className="p-4 border-t border-champagne/40">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-poppins text-sm text-encre/70 hover:text-terracotta hover:bg-terracotta/5 transition-all duration-150"
          >
            <Settings size={16} strokeWidth={1.5} />
            Paramètres
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-champagne/40 px-4 h-14 flex items-center justify-between">
        <Logo size="sm" />
        <Button variant="primary" size="sm" asChild>
          <Link href="/workspace/new">
            <Plus size={14} />
            Créer
          </Link>
        </Button>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen pt-14 md:pt-0 bg-ivoire">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-champagne/40 flex z-40">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center gap-1 py-3 font-poppins text-xs text-encre/50 hover:text-terracotta transition-colors"
          >
            <Icon size={20} strokeWidth={1.5} />
            {label}
          </Link>
        ))}
        <Link
          href="/settings"
          className="flex-1 flex flex-col items-center gap-1 py-3 font-poppins text-xs text-encre/50 hover:text-terracotta transition-colors"
        >
          <Settings size={20} strokeWidth={1.5} />
          Compte
        </Link>
      </nav>
    </div>
  );
}
