import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata = {
  title: "Ella Yee | Portfolio",
  description: "Portfolio of Ella Yee, Biomedical Engineering Student",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>{children}</body>
    </html>
  );
}