import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import TalentSection from "@/components/home/TalentSection";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturedProjects />
            <StatsSection />
            <TalentSection />
            <Testimonials />
            <CTASection />
        </>
    );
}