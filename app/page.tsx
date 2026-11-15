import { HeroSliderWrapper } from "@/components/hero-slider-wrapper";
import { NewArrivals } from "@/components/new-arrivals";
import { HowItWorks } from "@/components/how-it-works";
import { TopCategories } from "@/components/top-categories";
import { HomeTitle } from "@/components/home-title";
import { FadeIn } from "@/components/fade-in";

export default function HomePage() {
  return (
    <>
      <HomeTitle />
      <HeroSliderWrapper />
      <FadeIn><NewArrivals /></FadeIn>
      <FadeIn><HowItWorks /></FadeIn>
      <FadeIn><TopCategories /></FadeIn>
    </>
  );
}