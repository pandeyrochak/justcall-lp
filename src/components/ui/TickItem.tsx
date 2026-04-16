import Image from "next/image";
import Typography from "./Typography";

interface TickItemProps {
  text: string;
}

export default function TickItem({ text }: TickItemProps) {
  return (
    <div className="flex gap-4 items-start">
      <Image
        src="/feature-check-icon.svg"
        alt=""
        width={17}
        height={17}
        className="shrink-0 mt-[3px]"
      />
      <Typography variant="p2" className="text-blue-900">{text}</Typography>
    </div>
  );
}
