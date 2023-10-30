import type { HTMLAttributes } from "react";
import { cn } from "@/helpers/cn";

export function Dash(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("bg-accent h-1 rounded-full", props.className)}
    />
  );
}

export function TobeyLine(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      // eslint-disable-next-line react/no-children-prop -- off
      children={
        <>
          <Dash className="w-48" />
          <Dash className="w-12" />
        </>
      }
      {...props}
      className={cn("flex flex-row gap-8", props.className)}
    />
  );
}
