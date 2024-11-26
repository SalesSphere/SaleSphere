import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { headers } from "next/headers";
import Provider2 from "@/lib/Provider2";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SalesSphere",
  description: "Sales management dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = (await headers()).get("cookie");
  return (
    <ThirdwebProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="">
            <Provider2 cookies={cookies}>{children}</Provider2>
            <Toaster />
            <Sonner richColors position="bottom-right" />
          </main>
        </body>
      </html>
    </ThirdwebProvider>
  );
}
