import { SpinnerThirdDuotoneWeb } from "@tobey/icons/src/index.web";
import type { SVGProps } from "react";
import { cn } from "@/helpers/cn";

export function Loading({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <SpinnerThirdDuotoneWeb
      className={cn("h-8 w-8 animate-spin", className)}
      {...props}
    />
  );
}
