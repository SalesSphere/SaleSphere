import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavHeader from "@/components/nav-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SalesSphere",
  description: "Sales management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavHeader />
        <main className="container mx-auto p-4 md:p-6">{children}</main>
      </body>
    </html>
  );
}
