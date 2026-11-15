import { HeroSlider } from "@/components/hero-slider";
import { NewArrivals } from "@/components/new-arrivals";
import { HowItWorks } from "@/components/how-it-works";
import { TopCategories } from "@/components/top-categories";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  );
}