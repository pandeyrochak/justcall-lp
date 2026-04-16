import type { LandingPageData, ProductFeatureContent } from "@/lib/types/content";
import { getWpBaseMediaUrl, wpFetch } from "./wp-client";

interface WPProblemCard {
  value: string;
  label: string;
}

interface WPProductFeature {
  feature_title: string;
  feature_description: string;
  feature_list: string[];
  feature_ending_text: string;
  layout: "text-left" | "text-right";
  feature_image: string;
}

interface WPPage {
  acf: {
    hero: {
      heading: string;
      description: string;
      image: string;
    };
    problem: {
      heading: string;
      description: string;
      bottom_text: string;
      cards: WPProblemCard[];
    };
    product_features: {
      main_heading: string;
      main_description: string;
      "product-feature-1": WPProductFeature;
      "product-feature-2": WPProductFeature;
    };
    cta: {
      heading: string;
      description: string;
      image: string;
    };
  };
}

function mapProductFeature(
  feature: WPProductFeature,
  sharedContent?: { heading: string; description: string },
): ProductFeatureContent {
  return {
    heading: sharedContent?.heading ?? "",
    description: sharedContent?.description ?? "",
    featureTitle: feature.feature_title,
    featureDescription: feature.feature_description,
    featureList: feature.feature_list,
    featureEndingText: feature.feature_ending_text,
    featureImage: feature.feature_image,
    layout: feature.layout,
  };
}

function mapWPToLandingData(wp: WPPage): LandingPageData {
  const { acf } = wp;
  const mediaBaseUrl = getWpBaseMediaUrl();

  return {
    hero: {
      heading: acf.hero.heading,
      description: acf.hero.description,
      image: acf.hero.image,
    },
    problem: {
      heading: acf.problem.heading,
      description: acf.problem.description,
      cards: acf.problem.cards.map((card) => ({
        icon: `${mediaBaseUrl}/${card.value}-icon.svg`,
        title: card.label,
      })),
      bottomText: acf.problem.bottom_text,
    },
    productFeatures: [
      mapProductFeature(acf.product_features["product-feature-1"], {
        heading: acf.product_features.main_heading,
        description: acf.product_features.main_description,
      }),
      mapProductFeature(acf.product_features["product-feature-2"]),
    ],
    cta: {
      heading: acf.cta.heading,
      description: acf.cta.description,
      image: acf.cta.image,
    },
  };
}

export async function getLandingPageData(): Promise<LandingPageData> {
  const pages = await wpFetch<WPPage[]>("/pages?slug=home-page");

  if (!pages.length) {
    throw new Error("Unable to find WordPress page with slug `home-page`.");
  }

  return mapWPToLandingData(pages[0]);
}
