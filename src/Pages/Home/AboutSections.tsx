import HomeAboutSection from "./HomeAboutSection";
import { useAboutSections } from "@hooks/SiteData/useAboutSections";
import { AboutSectionsSkeleton } from "./AboutSectionsSkeleton";

export const AboutSections = () => {
  const { AboutSections, isLoading } = useAboutSections();

  if (isLoading) {
    return <AboutSectionsSkeleton />;
  }
  return AboutSections?.sort((a, b) => a.order - b.order).map((section) => (
    <HomeAboutSection
      key={section.id}
      img={section.image}
      label={section.label}
      paragraph={section.description}
      direction={section.leftDirection ? "left" : "right"}
      background={section.grayBackground ? "secondary" : "primary"}
    />
  ));
};
