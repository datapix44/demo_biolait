import { Crown, CreditCard, User, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="font-cormorant text-4xl font-semibold text-encre">Paramètres</h1>
        <p className="font-poppins text-sm text-encre/50 mt-1">Gérez votre compte et votre abonnement</p>
      </div>

      {/* Profile */}
      <section className="bg-white rounded-2xl border border-champagne/60 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <User size={16} className="text-terracotta" strokeWidth={1.5} />
          <h2 className="font-poppins text-sm font-semibold text-encre">Mon profil</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="font-poppins text-xs font-medium text-encre/70 mb-1.5 block">Prénom</label>
            <Input placeholder="Marie" defaultValue="Marie" />
          </div>
          <div>
            <label className="font-poppins text-xs font-medium text-encre/70 mb-1.5 block">Email</label>
            <Input type="email" placeholder="marie@email.fr" defaultValue="marie@email.fr" />
          </div>
        </div>
        <Button variant="soft" size="sm">Sauvegarder les modifications</Button>
      </section>

      {/* Subscription */}
      <section className="bg-white rounded-2xl border border-champagne/60 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Crown size={16} className="text-terracotta" strokeWidth={1.5} />
          <h2 className="font-poppins text-sm font-semibold text-encre">Abonnement</h2>
        </div>

        <div className="bg-ivoire rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-poppins text-sm font-semibold text-encre">Plan Gratuit</p>
            <p className="font-poppins text-xs text-encre/50 mt-0.5">3 créations utilisées sur 5</p>
          </div>
          <div className="w-24 h-1.5 bg-champagne rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-terracotta rounded-full" />
          </div>
        </div>

        <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-cormorant text-xl font-semibold text-encre">
                Passez au Premium — 9€/mois
              </p>
              <p className="font-poppins text-sm text-encre/60 mt-1">
                Créations illimitées · Exports haute résolution · Licence commerciale
              </p>
            </div>
          </div>
          <Button variant="primary" size="md" className="mt-4 gap-2">
            <Crown size={15} />
            Passer au Premium
          </Button>
        </div>
      </section>

      {/* Billing */}
      <section className="bg-white rounded-2xl border border-champagne/60 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <CreditCard size={16} className="text-terracotta" strokeWidth={1.5} />
          <h2 className="font-poppins text-sm font-semibold text-encre">Facturation</h2>
        </div>
        <p className="font-poppins text-sm text-encre/50">
          Aucune méthode de paiement enregistrée.{" "}
          <span className="text-terracotta cursor-pointer hover:underline">
            Ajouter une carte
          </span>
        </p>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-2xl border border-champagne/60 p-6">
        <div className="flex items-center gap-3 mb-5">
          <Bell size={16} className="text-terracotta" strokeWidth={1.5} />
          <h2 className="font-poppins text-sm font-semibold text-encre">Notifications</h2>
        </div>
        {[
          { label: "Nouvelles inspirations", desc: "Reçevez les dernières tendances" },
          { label: "Conseils créatifs", desc: "Tips et tutoriels chaque semaine" },
        ].map((notif) => (
          <div key={notif.label} className="flex items-center justify-between py-3 border-b border-champagne/40 last:border-0">
            <div>
              <p className="font-poppins text-sm text-encre">{notif.label}</p>
              <p className="font-poppins text-xs text-encre/40">{notif.desc}</p>
            </div>
            <div className="w-10 h-5 bg-sauge rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        ))}
      </section>

      {/* Logout */}
      <button className="flex items-center gap-2 font-poppins text-sm text-encre/40 hover:text-terracotta transition-colors">
        <LogOut size={15} strokeWidth={1.5} />
        Se déconnecter
      </button>
    </div>
  );
}
