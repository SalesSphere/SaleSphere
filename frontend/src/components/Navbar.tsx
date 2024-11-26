"use client";
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";

export function NavBar() {
  const account = useActiveAccount();

  return (
    <header className="fixed top-0 w-full z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container  px-5 py-2 max-w-[80rem] mx-auto flex h-16 items-center justify-between my-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-semibold">SalesSphere</span>
        </div>
        <nav className="hidden md:flex items-center gap-16 rounded-[2rem] border-[#292D321A] border p-4">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link
            href="#benefits"
            className="text-sm font-medium hover:text-primary">
            Benefits
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:text-primary">
            About us
          </Link>
        </nav>

        <div>
          {account ? (
            <Button className="h-12">
              <Link href={"/a/dashboard/overview"}>Launch Application</Link>
            </Button>
          ) : (
            <ConnectButton client={client} />
          )}
        </div>
        <Button variant="ghost" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
