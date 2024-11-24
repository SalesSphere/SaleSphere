import { TestimonialCarousel } from "./testimonial-carousel";
import { TestimonialHeader } from "./testimonial-header";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <TestimonialHeader />
        <TestimonialCarousel />
      </div>
    </div>
  );
}
