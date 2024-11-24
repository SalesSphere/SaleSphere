import Image from "next/image";
import { Button } from "./ui/button";

export default function Waitlist() {
  return (
    <main className="bg-[#D8F1FC]">
      <div className=" grid h-[65vh] relative lg:grid-cols-2 bg-[#D8F1FC]">
        <div className="flex flex-col justify-center p-6 lg:p-12 bg-[#D8F1FC]">
          <div className="max-w-[23rem]">
            <h1 className="text-3xl md:text-xl lg:text-2xl font-bold tracking-tight text-[#292D32] mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </h1>
            <Button
              className="w-fit  text-white rounded-full px-8 py-2"
              style={{
                background: "linear-gradient(to right,#78D6FF, #0088C4)",
              }}>
              Join waitlist
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 right-0">
          <Image
            src="/sales.svg"
            alt="Dashboard Preview"
            width={500}
            height={500}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
