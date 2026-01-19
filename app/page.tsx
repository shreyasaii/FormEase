import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LanguagesSection } from "@/components/landing/LanguagesSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      {/* <ProblemSolutionSection /> */}
      <FeaturesSection />
      <HowItWorksSection />
      <LanguagesSection />
      <DemoSection />
      <PrivacySection />
      <Footer />
    </div>
  );
};

export default Index;
