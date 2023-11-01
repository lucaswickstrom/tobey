"use client";

import type {
  NumberFormatBaseProps,
  NumericFormatProps,
} from "react-number-format";
import { NumberFormatBase, NumericFormat } from "react-number-format";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/helpers/cn";

export const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-md file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      focus: {
        visible:
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        within:
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      },
    },
    defaultVariants: {
      focus: "visible",
    },
  }
);

export function InputNumberFormatBase(props: NumberFormatBaseProps) {
  return (
    <NumberFormatBase
      {...props}
      className={cn(inputVariants(), props.className)}
    />
  );
}

export const InputNumericFormat = forwardRef<
  HTMLInputElement,
  NumericFormatProps
>(function InputNumericFormat(props, ref) {
  return (
    <NumericFormat
      getInputRef={ref}
      {...props}
      className={cn(inputVariants(), props.className)}
    />
  );
});
