import type { ProductFeatureContent } from "@/lib/types/content";
import Typography from "@/components/ui/Typography";
import SectionHeader from "@/components/ui/SectionHeader";
import TickItem from "@/components/ui/TickItem";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProductFeatureProps {
  data: ProductFeatureContent;
}

export default function ProductFeature({ data }: ProductFeatureProps) {
  if (!data.featureTitle) return null;

  const isTextLeft = data.layout === "text-left";

  return (
    <section className="bg-white px-6 sm:px-8 py-10 md:py-[60px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 md:gap-10 items-center">
        {data.heading && (
          <SectionHeader heading={data.heading} description={data.description} />
        )}

        <div
          className={`flex flex-col ${isTextLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center justify-between gap-8 lg:gap-12 w-full`}
        >
          <div className="flex flex-col gap-5 md:gap-6 max-w-[566px] md:max-w-[530px] flex-1">
            <Typography variant="h2" className="text-blue-900">
              {data.featureTitle}
            </Typography>
            <Typography variant="p1" className="text-gray-700">
              {data.featureDescription}
            </Typography>

            {data.featureList.length > 0 && (
              <div className="flex flex-col gap-4 md:gap-[18px]">
                {data.featureList.map((item) => (
                  <TickItem key={item} text={item} />
                ))}
              </div>
            )}

            {data.featureEndingText && (
              <Typography variant="p1" className="text-gray-700">
                {data.featureEndingText}
              </Typography>
            )}
          </div>

          <div className="bg-blue-10 rounded-3xl overflow-hidden w-full max-w-[622px] aspect-622/503 relative shrink-0">
            <ImageWithFallback
              src={data.featureImage}
              alt={data.featureTitle}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
