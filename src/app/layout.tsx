import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { autoshedData } from "@/data/autoshed-data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: autoshedData.meta.title,
  description: autoshedData.meta.description,
  keywords: autoshedData.meta.keywords.join(", "),
  openGraph: {
    title: autoshedData.meta.title,
    description: autoshedData.meta.description,
    type: "website",
    locale: "en_ZA",
    siteName: autoshedData.business.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" style={{ fontFamily: 'var(--font-inter), Inter, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
