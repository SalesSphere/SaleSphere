import Image from "next/image";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

export function TestimonialCard({
  content,
  author,
  role,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="text-center px-6 md:px-16 py-8">
      <blockquote className="text-lg md:text-xl text-gray-700 mb-8">
        {content}
      </blockquote>
      <div className="space-y-2">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <Image
            src={avatar}
            alt={author}
            fill
            className="rounded-full  object-cover"
          />
        </div>
        <div className="font-semibold text-gray-900">{author}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  );
}
