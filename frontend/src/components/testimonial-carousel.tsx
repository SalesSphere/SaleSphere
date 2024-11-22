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
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    author: "Kemepade Ebizi",
    role: "Luxury Store Owner",
    avatar: "/user1.svg",
  },
  {
    content:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    author: "Alex Thompson",
    role: "Business Owner",
    avatar: "/user1.svg",
  },
  {
    content:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    author: "Sarah Chen",
    role: "Store Manager",
    avatar: "/user1.svg",
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
