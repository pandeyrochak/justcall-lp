"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { scrollToHeroLeadEmail } from "@/lib/scroll-to-hero-lead";

interface HeroLeadScrollButtonsProps {
  className?: string;
  fullWidth?: boolean;
  stacked?: boolean;
  size?: "default" | "lg";
  /** When true, renders Start Free Trial before Book a Demo (matches mid-page CTA layout). */
  primaryFirst?: boolean;
  onAfterNavigate?: () => void;
}

export default function HeroLeadScrollButtons({
  className,
  fullWidth,
  stacked,
  size = "lg",
  primaryFirst = false,
  onAfterNavigate,
}: HeroLeadScrollButtonsProps) {
  function handleClick() {
    scrollToHeroLeadEmail();
    onAfterNavigate?.();
  }

  const outlineButton = (
    <Button
      type="button"
      variant="outline"
      size={size}
      className={cn(fullWidth && "w-full")}
      onClick={handleClick}
    >
      Book a Demo
    </Button>
  );

  const primaryButton = (
    <Button
      type="button"
      variant="primary"
      size={size}
      className={cn(fullWidth && "w-full")}
      onClick={handleClick}
    >
      Start Free Trial
    </Button>
  );

  return (
    <div
      className={cn(
        "flex gap-3",
        stacked ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
    >
      {primaryFirst ? (
        <>
          {primaryButton}
          {outlineButton}
        </>
      ) : (
        <>
          {outlineButton}
          {primaryButton}
        </>
      )}
    </div>
  );
}
