import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tays Fix and Finish — Drywall, Painting & Finish Carpentry in Austin, TX",
  description:
    "Tays Fix and Finish — Professional drywall, painting, finish carpentry, and handyman services in Austin, TX. Quality work. Clean finish. Every time.",
  keywords: "drywall repair Austin TX, painting contractor Austin, finish carpentry Austin, handyman Austin Texas, Tays Fix and Finish",
  openGraph: {
    title: "Tays Fix and Finish",
    description: "Professional drywall, painting & finish carpentry in Austin, TX.",
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
