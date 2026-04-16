import type { ProblemContent } from "@/lib/types/content";
import Typography from "@/components/ui/Typography";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoCard from "@/components/ui/BentoCard";

interface ProblemStatementProps {
  data: ProblemContent;
}

export default function ProblemStatement({ data }: ProblemStatementProps) {
  if (!data.heading) return null;

  return (
    <section className="bg-white px-8 py-10 md:py-[60px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[22px] items-center">
        <SectionHeader heading={data.heading} description={data.description} />

        {data.cards.length > 0 && (
          <div className="max-w-[1230px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[30px] mt-2">
            {data.cards.map((card) => (
              <BentoCard
                key={card.title}
                icon={card.icon}
                title={card.title}
              />
            ))}
          </div>
        )}

        {data.bottomText && (
          <Typography variant="p1" className="text-blue-900 text-center max-w-[900px]">
            {data.bottomText}
          </Typography>
        )}
      </div>
    </section>
  );
}
