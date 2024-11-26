import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full min-h-[60vh] bg-[#22A7E6] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl my-20">
        <div className="bg-gradient-to-br from-[#FF84D4] to-[#EC17A2] rounded-3xl border-8 border-[#FFC2EA]  p-8 md:p-16 flex flex-col items-center text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 max-w-3xl mb-8">
            Don’t miss out on revolutionizing how you manage sales and
            inventory. By joining our waitlist, you’ll be among the first to
            enjoy exclusive features, early updates, and premium support
          </h2>
          <Button
            variant="outline"
            className="bg-transparent border border-[#292D3280] text-gray-900 hover:bg-gray-900 hover:text-white transition-colors rounded-full px-8 py-2">
            Join waitlist
          </Button>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#22A7E6] font-semibold">S</span>
            </div>
            <span className="text-lg font-medium">SalesSphere</span>
          </div>

          <div className="w-full border-t border-white/20" />

          <nav className="flex flex-wrap justify-center gap-8 text-white mb-8">
            <Link href="#" className="hover:underline">
              Home
            </Link>
            <Link href="#" className="hover:underline">
              About
            </Link>
            <Link href="#" className="hover:underline">
              Features
            </Link>
            <Link href="#" className="hover:underline">
              Pricing
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
