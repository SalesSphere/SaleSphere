"use client";

import { cn } from "@/lib/utils";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

type LayoutProps = {
  children: React.ReactNode;
  showHeader?: boolean;
  navigation?: NavItem[];
};

function NavLink({
  item,
  isMobile = false,
}: {
  item: NavItem;
  isMobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary relative",
        isMobile ? "py-2" : "h-16",
        pathname === item.href ? "text-primary" : "text-muted-foreground"
      )}>
      <div className="flex items-center gap-2">
        <item.icon className="h-5 w-5" aria-hidden="true" />
        <span>{item.name}</span>
      </div>
      {pathname === item.href && !isMobile && (
        <div className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-primary" />
      )}
    </Link>
  );
}

function Header({ navigation }: { navigation: NavItem[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            S
          </div>
          <span className="text-lg font-semibold">SalesSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Avatar>
            <AvatarImage src="/user.svg" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} item={item} isMobile />
                ))}
                <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function DashboardLayout({
  children,
  showHeader = true,
  navigation = [],
}: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      {showHeader && <Header navigation={navigation} />}
      <main className="flex-1 pt-16">{children}</main>
    </div>
  );
}
