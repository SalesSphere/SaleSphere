import { FeatureHeader } from "./feature-header";
import { FeatureSection } from "./feature-section";

export default function Feature() {
  return (
    <div className="min-h-screen bg-white">
      <FeatureHeader />

      <FeatureSection
        imageUrl="/insight1.svg"
        imageAlt="Dashboard analytics view"
        variant="purple"
      />

      <FeatureSection
        imageUrl="/insight2.svg"
        imageAlt="Sales history view"
        reversed
        variant="blue"
      />

      <FeatureSection
        imageUrl="/insight3.svg"
        imageAlt="Member management view"
        variant="purple"
      />

      <FeatureSection
        imageUrl="/insight4.svg"
        imageAlt="Performance tracking view"
        reversed
        variant="light"
      />
    </div>
  );
}
