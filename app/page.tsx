import { HeroSection } from "@/components/home/HeroSection";
import { CoursesSection } from "@/components/home/CoursesSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { SkillsProgramSection } from "@/components/home/SkillsProgramSection";
import { SearchFundamentalsSection } from "@/components/home/SearchFundamentalsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <CertificationsSection />
      <SkillsProgramSection />
      <SearchFundamentalsSection />
    </>
  );
}
