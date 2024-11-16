import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import WalletProvider from "@/context/wallet";

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
        <main className="container mx-auto p-4 md:p-6">
          <ThirdwebProvider>
            <WalletProvider>{children}</WalletProvider>
          </ThirdwebProvider>
        </main>
      </body>
    </html>
  );
}
