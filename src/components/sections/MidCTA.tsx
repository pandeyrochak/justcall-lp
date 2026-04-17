import type { CTAContent } from "@/lib/types/content";
import Typography from "@/components/ui/Typography";
import HeroLeadScrollButtons from "@/components/ui/HeroLeadScrollButtons";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface MidCTAProps {
  data: CTAContent;
}

export default function MidCTA({ data }: MidCTAProps) {
  if (!data.heading) return null;

  return (
    <section className="bg-orange-25 px-6 sm:px-8 py-15">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-3">
        <div className="flex flex-col gap-6 grow">
          <div className="flex flex-col gap-[8px]">
            <Typography variant="h1" className="text-gray-900">
              {data.heading}
            </Typography>
            {data.description && (
              <Typography variant="p1" className="text-gray-700 max-w-[644px]">
                {data.description}
              </Typography>
            )}
          </div>
          <HeroLeadScrollButtons primaryFirst />
        </div>

        <div className="relative w-full max-w-[394px] aspect-square">
          <ImageWithFallback
            src={data.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 394px, (min-width: 768px) 360px, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
