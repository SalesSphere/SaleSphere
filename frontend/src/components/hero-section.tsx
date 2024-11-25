import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="px-5 py-2 max-w-[80rem] mx-auto">
      <section className="relative pt-20 pb-0 md:pt-32 md:pb-0">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[url('/bg.svg')] bg-cover bg-center" />
        </div>
        <div className="container max-w-[70rem] mx-auto space-y-10 text-center">
          <div className="inline-flex items-center rounded-[2rem] gap-2  border px-3 py-2 text-sm">
            Powered by lisk
            <Image src="/lisklogo.svg" width={15} height={15} alt="Lisk Logo" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-[500] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Take Control of Your Inventory with the Power of Web3 🚀
            </h1>
            <p className="mx-auto max-w-[700px] font-[400] text-muted-foreground md:text-xl">
              Streamline your stock management, track every transaction in
              real-time, and ensure transparency like never before all powered
              by decentralized technology.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="hover:opacity-90 text-white rounded-[2rem]"
              style={{
                background: "linear-gradient(to right,#78D6FF, #0088C4)",
              }}
            >
              Join waitlist
            </Button>

            <Button
              className="border rounded-[2rem] hover:bg-transparent"
              size="lg"
              variant="outline"
            >
              Request a demo
            </Button>
          </div>
        </div>
      </section>
      <Image
        src="/dashboard.svg"
        alt="Dashboard Preview"
        className="w-full h-full"
        width={200}
        height={200}
      />
    </div>
  );
}
