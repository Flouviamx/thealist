import type { Metadata } from "next";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "The A List | Where cool people meet",
  description: "Curated Experiences, Private Events & The A List Network in Mexico City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`font-sans antialiased bg-[#080407] text-white selection:bg-white/20`}
        suppressHydrationWarning
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
