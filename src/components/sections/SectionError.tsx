"use client";

import Typography from "@/components/ui/Typography";

interface SectionErrorProps {
  sectionName: string;
  onRetry?: () => void;
}

export default function SectionError({ sectionName, onRetry }: SectionErrorProps) {
  return (
    <section className="py-[60px] px-6">
      <div className="max-w-[600px] mx-auto text-center flex flex-col gap-4 items-center">
        <Typography variant="p1" className="text-gray-600">
          Unable to load {sectionName}. Please try again later.
        </Typography>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-blue-500 hover:text-blue-600 text-[16px] leading-[1.4] font-medium underline cursor-pointer"
          >
            Retry
          </button>
        )}
      </div>
    </section>
  );
}
