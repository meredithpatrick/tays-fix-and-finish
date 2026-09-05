import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tays Fix and Finish — Drywall, Painting & Finish Carpentry in Springboro, OH",
  description:
    "Professional drywall, painting, finish carpentry, and handyman services in Springboro, OH and the Greater Dayton area. Quality work. Clean finish. Every time.",
  keywords: "drywall repair Springboro OH, drywall contractor Dayton, painting contractor Springboro, finish carpentry Dayton Ohio, handyman Springboro Ohio, Tays Fix and Finish",
  openGraph: {
    title: "Tays Fix and Finish",
    description: "Professional drywall, painting & finish carpentry in Springboro, OH.",
    siteName: "Tays Fix and Finish",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
