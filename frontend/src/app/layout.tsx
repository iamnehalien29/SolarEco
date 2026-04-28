
import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "SolarEco | Premium Solar Installation for Home & Business",
  description: "Save up to 80% on electricity bills with SolarEco. Reliable, eco-friendly solar solutions with 25-year warranty and govt subsidy support.",
  keywords: ["solar installation", "solar panels india", "green energy", "solar subsidy", "residential solar"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
