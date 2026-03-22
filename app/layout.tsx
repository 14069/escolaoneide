import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ETI Professora Oneide da Cruz Mousinho",
    template: "%s | ETI Professora Oneide da Cruz Mousinho",
  },
  description:
    "Site institucional com Next.js + Sanity para publicar eventos com capa, galeria e página interna completa.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
