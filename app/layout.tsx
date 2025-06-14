import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vivaldi-quiz",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/pwa-512x512.png" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body>{children}</body>
    </html>
  );
}
