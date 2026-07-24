import Hero from "@/components/home/Hero";
import QuickNav from "@/components/home/QuickNav";
import AboutSection from "@/components/home/AboutSection";
import StatsCounter from "@/components/home/StatsCounter";
import VideoHighlight from "@/components/home/VideoHighlight";
import NewsPreview from "@/components/home/NewsPreview";
import Testimonials from "@/components/home/Testimonials";
import ContactMap from "@/components/home/ContactMap";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickNav />
      <AboutSection />
      <StatsCounter />
      <VideoHighlight />
      <NewsPreview />
      <Testimonials />
      <ContactMap />
    </>
  );
}
