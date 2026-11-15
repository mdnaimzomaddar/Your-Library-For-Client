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
    image: "/hero/slide1.jpg",
  },
  {
    title: "Borrow a Book in Seconds",
    text: "Pick a book, confirm, and enjoy it for the next seven days.",
    image: "/hero/slide2.jpg",
  },
  {
    title: "Share Books You Love",
    text: "Add your own books to the library and help others read more.",
    image: "/hero/slide3.jpg",
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
    <div className="relative flex h-[480px] items-center justify-center overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ছবি */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* কালো ওভারলে */}
      <div className="absolute inset-0 bg-black/60" />

      {/* লেখা */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center text-white">
        <h1 className="max-w-3xl text-3xl font-bold md:text-5xl">
          {slide.title}
        </h1>
        <p className="max-w-xl text-base md:text-lg">{slide.text}</p>
        <Button size="lg" render={<Link href="/books" />}>
          Browse Books
        </Button>
      </div>
    </div>
  </SwiperSlide>
))}
    </Swiper>
  );
}