export interface LandingPageData {
  hero: HeroContent;
  problem: ProblemContent;
  productFeatures: ProductFeatureContent[];
  cta: CTAContent;
}

export interface HeroContent {
  heading: string;
  description: string;
  image: string;
}

export interface ProblemContent {
  heading: string;
  description: string;
  cards: BentoCardContent[];
  bottomText: string;
}

export interface BentoCardContent {
  icon: string;
  title: string;
}

export interface ProductFeatureContent {
  heading: string;
  description: string;
  featureTitle: string;
  featureDescription: string;
  featureList: string[];
  featureEndingText: string;
  featureImage: string;
  layout: "text-left" | "text-right";
}

export interface CTAContent {
  heading: string;
  description: string;
  image: string;
}
