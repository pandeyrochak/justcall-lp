import HeroSkeleton from "@/components/sections/HeroSkeleton";
import ProblemSkeleton from "@/components/sections/ProblemSkeleton";
import ProductFeatureSkeleton from "@/components/sections/ProductFeatureSkeleton";
import MidCTASkeleton from "@/components/sections/MidCTASkeleton";

export default function Loading() {
  return (
    <main>
      <HeroSkeleton />
      <ProblemSkeleton />
      <ProductFeatureSkeleton />
      <ProductFeatureSkeleton reverse />
      <MidCTASkeleton />
    </main>
  );
}
