"use client";

import { cn } from "@/lib/utils";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MemoDashboard from "@/icons/Dashboard";
import MemoProducts from "@/icons/Products";
import MemoUsers from "@/icons/Users";
import MemoSales from "@/icons/Sales";
import MemoSettings from "@/icons/Settings";
import { useState } from "react";
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

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: MemoDashboard },
  { name: "Products", href: "/products", icon: MemoProducts },
  { name: "Sales", href: "/sales", icon: MemoSales },
  { name: "Users", href: "/users", icon: MemoUsers },
  { name: "Settings", href: "/settings", icon: MemoSettings },
];

type NavLinkProps = {
  item: NavItem;
  isMobile?: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ item, isMobile = false }) => {
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
        <div className="absolute -bottom-[9px] left-0 right-0 h-[3px] bg-[#292D32]" />
      )}
    </Link>
  );
};

export default function NavHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="flex h-16 items-center sm:justify-between py-10 px-6 md:px-6 lg:px-20">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              S
            </div>
            <span className="text-lg font-semibold">SalesSphere</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-10">
          {navigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
          <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <Bell className="h-4 w-4" />
            <span>Notification</span>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className="ml-auto sm:ml-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/user.svg" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
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
                <span>Notification</span>
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
