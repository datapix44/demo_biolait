import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MakerBelle — Imaginez. Personnalisez. Créez.",
  description:
    "Transformez vos idées en créations personnalisées uniques grâce à l'intelligence créative. Cadeaux, décorations, souvenirs — créés avec amour.",
  keywords: "création personnalisée, cadeau personnalisé, DIY, décoration, Cricut, Etsy",
  openGraph: {
    title: "MakerBelle — Imaginez. Personnalisez. Créez.",
    description: "Transformez vos idées en créations personnalisées uniques.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
