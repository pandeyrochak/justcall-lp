import { Suspense } from "react";
import { getLandingPageData } from "@/services/landing-page";
import Hero from "@/components/sections/Hero";
import ProblemStatement from "@/components/sections/ProblemStatement";
import ProductFeature from "@/components/sections/ProductFeature";
import MidCTA from "@/components/sections/MidCTA";
import HeroSkeleton from "@/components/sections/HeroSkeleton";
import ProblemSkeleton from "@/components/sections/ProblemSkeleton";
import ProductFeatureSkeleton from "@/components/sections/ProductFeatureSkeleton";
import MidCTASkeleton from "@/components/sections/MidCTASkeleton";

// export const revalidate = 3600;

async function LandingContent() {
  const data = await getLandingPageData();

  return (
    <>
      <Hero data={data.hero} />
      <ProblemStatement data={data.problem} />
      {data.productFeatures.map((feature, i) => (
        <ProductFeature key={i} data={feature} />
      ))}
      <MidCTA data={data.cta} />
    </>
  );
}

function LandingSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <ProblemSkeleton />
      <ProductFeatureSkeleton />
      <ProductFeatureSkeleton reverse />
      <MidCTASkeleton />
    </>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LandingSkeleton />}>
        <LandingContent />
      </Suspense>
    </main>
  );
}
