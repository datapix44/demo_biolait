import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivoire flex">
      {/* Left panel — visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85"
          alt="Créations MakerBelle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-encre/50" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Logo variant="dark" size="lg" />
          <div>
            <blockquote className="font-cormorant text-3xl font-light text-ivoire leading-relaxed italic">
              &ldquo;Chaque idée mérite de devenir une création unique.&rdquo;
            </blockquote>
            <p className="mt-4 font-poppins text-sm text-ivoire/60">
              Belle, votre créatrice personnelle
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="lg:hidden mb-10">
          <Logo size="lg" />
        </div>
        <div className="w-full max-w-md">{children}</div>
        <p className="mt-8 font-poppins text-xs text-encre/40 text-center">
          © 2025 MakerBelle ·{" "}
          <Link href="/privacy" className="hover:text-terracotta transition-colors">
            Confidentialité
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="hover:text-terracotta transition-colors">
            CGU
          </Link>
        </p>
      </div>
    </div>
  );
}
