"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "./testimonial-card";

const testimonials = [
  {
    content:
      "SaleSphere transformed how we manage sales and stock. The real-time updates and blockchain transparency are a game-changer",
    author: "Tobey Maguire",
    role: "Store Owner",
    avatar: "/user1.svg",
  },
  {
    content:
      "The ability to generate detailed sales reports has helped us make better decisions. Highly recommend!",
    author: "Scarlett Johansson",
    role: "Retail Chain Manager",
    avatar: "/user2.svg",
  },
  {
    content:
      "SaleSphere has simplified how we manage our inventory. The seamless integration and real-time updates are exactly what we needed to scale our business.",
    author: "Patrick Bateman",
    role: "Boutique Owner",
    avatar: "/user3.svg",
  },
];

export function TestimonialCarousel() {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <TestimonialCard {...testimonial} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12" />
      <CarouselNext className="hidden md:flex -right-12" />
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
        ))}
      </div>
    </Carousel>
  );
}
