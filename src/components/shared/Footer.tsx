import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-encre text-ivoire/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo variant="dark" size="md" />
            <p className="mt-4 font-poppins text-sm leading-relaxed text-ivoire/60 max-w-xs">
              Transformez vos idées en créations personnalisées uniques. Chaque
              création est unique, comme vous.
            </p>
            <p className="mt-6 font-cormorant text-lg italic text-terracotta">
              Imaginez. Personnalisez. Créez.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-poppins text-xs font-semibold uppercase tracking-widest text-ivoire/40 mb-4">
              Produit
            </h4>
            <ul className="space-y-3">
              {[
                ["Inspirations", "/inspirations"],
                ["Comment ça marche", "/#how-it-works"],
                ["Tarifs", "/#pricing"],
                ["Créer", "/signup"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-poppins text-sm text-ivoire/60 hover:text-terracotta transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins text-xs font-semibold uppercase tracking-widest text-ivoire/40 mb-4">
              Légal
            </h4>
            <ul className="space-y-3">
              {[
                ["Confidentialité", "/privacy"],
                ["Conditions d'utilisation", "/terms"],
                ["Mentions légales", "/legal"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-poppins text-sm text-ivoire/60 hover:text-terracotta transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ivoire/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-poppins text-xs text-ivoire/40">
            © 2025 MakerBelle. Tous droits réservés.
          </p>
          <p className="font-poppins text-xs text-ivoire/40 flex items-center gap-1.5">
            Fait avec <Heart size={12} className="text-terracotta fill-terracotta" /> en France
          </p>
        </div>
      </div>
    </footer>
  );
}
