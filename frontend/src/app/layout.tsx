
import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Fk construction & Developers | Premium Solar & Sustainable Solutions",
  description: "Save up to 80% on electricity bills with Fk construction & Developers. Reliable, eco-friendly solar solutions with professional installation and govt subsidy support.",
  keywords: ["Fk construction & Developers", "solar installation", "Assam solar", "Dhemaji solar", "green energy"],
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
