import Image from "next/image";
import { cn } from "@/lib/utils";
import Typography from "./Typography";

interface BentoCardProps {
  icon: string;
  title: string;
  className?: string;
}

export default function BentoCard({ icon, title, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 rounded-lg p-5 flex gap-[18px] items-center",
        className,
      )}
    >
      <div className="bg-white rounded-[5px] size-[50px] flex items-center justify-center shrink-0">
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
        />
      </div>
      <Typography variant="p1" className="text-gray-600">
        {title}
      </Typography>
    </div>
  );
}
