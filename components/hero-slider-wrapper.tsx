"use client";

import dynamic from "next/dynamic";

const HeroSlider = dynamic(
  () => import("@/components/hero-slider").then((m) => m.HeroSlider),
  {
    ssr: false,
    loading: () => <div className="h-[480px] w-full bg-muted" />,
  }
);

export function HeroSliderWrapper() {
  return <HeroSlider />;
}