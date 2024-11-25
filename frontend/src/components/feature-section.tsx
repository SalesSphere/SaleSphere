import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FeatureSectionProps {
  imageUrl: string;
  imageAlt: string;
  reversed?: boolean;
  variant?: "purple" | "blue" | "light";
}

export function FeatureSection({
  imageUrl,
  imageAlt,
  reversed = false,
}: FeatureSectionProps) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div
        className={`flex flex-col gap-12 items-center ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}>
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Powerful Insights at Your Fingertips
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-gray-600">
                • Track key metrics like products, sales, and members.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600">
                • Visualize sales trends with a clear, interactive chart.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600">
                • Quickly select and manage specific sales records efficiently.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-600">
                • Arrows and color codes track performance trends easily.
              </span>
            </li>
          </ul>
          <Button className="mt-6 rounded-[2rem] border">Request a demo</Button>
        </div>
        <div className="w-full lg:w-1/2">
          <div className={`rounded-2xl overflow-hidden  p-6`}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
