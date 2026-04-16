import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "font-semibold text-[46px] lg:text-[56px] leading-[64px] tracking-[-2px]",
      h2: "font-semibold text-[32px] lg:text-[38px] leading-[42px] tracking-[-1px]",
      p1: "font-normal text-[16px] lg:text-[18px] leading-[1.4]",
      p2: "font-normal text-[14px] leading-[1.4]",
    },
  },
  defaultVariants: {
    variant: "p1",
  },
});

const elementMap = {
  h1: "h1",
  h2: "h2",
  p1: "p",
  p2: "p",
} as const;

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export default function Typography({
  variant = "p1",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? elementMap[variant as TypographyVariant] ?? "p";

  return (
    <Component className={cn(typographyVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
}

export { typographyVariants };
