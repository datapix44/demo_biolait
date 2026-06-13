import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-cormorant text-4xl font-semibold text-encre">
          Bon retour parmi nous
        </h1>
        <p className="mt-2 font-poppins text-sm text-encre/60">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-terracotta hover:underline">
            Créer un compte gratuitement
          </Link>
        </p>
      </div>

      {/* Google OAuth */}
      <button className="w-full flex items-center justify-center gap-3 h-11 rounded-full border border-champagne bg-white hover:bg-ivoire transition-colors font-poppins text-sm text-encre font-medium mb-6">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continuer avec Google
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-champagne" />
        <span className="font-poppins text-xs text-encre/40">ou</span>
        <div className="flex-1 h-px bg-champagne" />
      </div>

      <form className="space-y-4">
        <div>
          <label className="font-poppins text-xs font-medium text-encre/70 mb-1.5 block">
            Adresse email
          </label>
          <Input type="email" placeholder="votre@email.fr" autoComplete="email" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-poppins text-xs font-medium text-encre/70">
              Mot de passe
            </label>
            <Link href="/forgot-password" className="font-poppins text-xs text-terracotta hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <Input type="password" placeholder="••••••••" autoComplete="current-password" />
        </div>
        <Button variant="primary" size="md" className="w-full mt-2">
          Se connecter
        </Button>
      </form>
    </div>
  );
}
