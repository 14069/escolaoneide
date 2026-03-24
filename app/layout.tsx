import type { Metadata } from "next";

import { AccessibilityControls } from "@/components/accessibility-controls";
import { school } from "@/lib/school";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ETI Professora Oneide da Cruz Mousinho",
    template: "%s | ETI Professora Oneide da Cruz Mousinho",
  },
  description:
    `Site oficial de eventos da ${school.name}, em ${school.city}, com comunicados, registros e atividades da comunidade escolar.`,
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="site-shell">
        {children}
        <AccessibilityControls />
      </body>
    </html>
  );
}
