import { cn } from "@/lib/utils";
import Typography from "./Typography";

interface SectionHeaderProps {
  heading: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({ heading, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 items-center text-center", className)}>
      <Typography variant="h2" className="text-gray-900">
        {heading}
      </Typography>
      {description && (
        <Typography variant="p1" className="text-gray-500 max-w-[480px] md:max-w-[828px] whitespace-pre-line">
          {description}
        </Typography>
      )}
    </div>
  );
}
