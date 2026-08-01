import type { Metadata, Viewport } from "next";
import "@fontsource/dancing-script/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CODEX — The Chronicle of Generation 10 · LSC FTU HCMC",
  description:
    "An interactive farewell chronicle for Generation 10 of Logistics Studying Club FTU HCMC — FER, HRE, MEDIA, and RND.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
