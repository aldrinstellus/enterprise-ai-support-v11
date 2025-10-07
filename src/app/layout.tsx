import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enterprise AI Support V6 - Demo | Multi-Persona Interface",
  description: "Demo reference with mock data - Three personas: C-Level, CS Manager, Support Agent",
  keywords: ["support", "ticketing", "AI", "dashboard", "analytics", "demo", "multi-persona"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className="h-screen overflow-hidden bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
