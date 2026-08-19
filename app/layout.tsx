import "./globals.css";
import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { EmbeddingProvider } from "./components/EmbeddingContext";
import Cursor from "./components/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-4pwx.vercel.app"),
  title: {
    default: "Ella Yee",
    template: "%s · Ella Yee",
  },
  description:
    "Ella Yee — Biomedical Engineering & Computer Science at Columbia. Computational biology, single-cell and spatial transcriptomics, and machine learning for human health.",
  openGraph: {
    title: "Ella Yee",
    description:
      "Biomedical Engineering & Computer Science at Columbia. Computational biology, single-cell and spatial transcriptomics, and machine learning for human health.",
    url: "/",
    siteName: "Ella Yee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ella Yee",
    description:
      "Biomedical Engineering & Computer Science at Columbia. Computational biology and machine learning for human health.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans bg-paper text-ink antialiased`}
      >
        <EmbeddingProvider>
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </EmbeddingProvider>
      </body>
    </html>
  );
}
