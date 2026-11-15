"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Discover Your Next Great Read",
    text: "Browse hundreds of books shared by our community of readers.",
    bg: "from-indigo-600 to-purple-700",
  },
  {
    title: "Borrow a Book in Seconds",
    text: "Pick a book, confirm, and enjoy it for the next seven days.",
    bg: "from-emerald-600 to-teal-700",
  },
  {
    title: "Share Books You Love",
    text: "Add your own books to the library and help others read more.",
    bg: "from-rose-600 to-orange-600",
  },
];

export function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="w-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div
            className={`flex h-[420px] flex-col items-center justify-center gap-4 bg-gradient-to-r ${slide.bg} px-4 text-center text-white`}
          >
            <h1 className="max-w-3xl text-3xl font-bold md:text-5xl">
              {slide.title}
            </h1>
            <p className="max-w-xl text-base md:text-lg">{slide.text}</p>
            <Button
              size="lg"
              variant="secondary"
              render={<Link href="/books" />}
            >
              Browse Books
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}