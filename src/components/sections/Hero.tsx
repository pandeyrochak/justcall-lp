import type { HeroContent } from "@/lib/types/content";
import Typography from "@/components/ui/Typography";
import EmailForm from "@/components/ui/EmailForm";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface HeroProps {
  data: HeroContent;
}

export default function Hero({ data }: HeroProps) {
  if (!data.heading) return null;

  return (
    <section className="bg-orange-25 px-6 sm:px-8 py-10 md:py-[60px]">
      <div className="max-w-[1259px] mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-[100px]">
        <div className="flex flex-col gap-8 md:gap-10 flex-1 md:max-w-[400px] lg:max-w-[634px] max-md:items-center">
          <div className="flex flex-col gap-[18px] max-md:items-center max-md:text-center">
            <Typography variant="h1" className="text-gray-900 max-md:max-w-[500px]">
              {data.heading}
            </Typography>
            <Typography variant="p1" className="text-gray-700 max-w-[450px] md:max-w-[529px]">
              {data.description}
            </Typography>
          </div>
          <EmailForm />
        </div>

        <div className="relative w-full max-w-[520px] aspect-square">
          <ImageWithFallback
            src={data.image}
            alt="Hero illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
