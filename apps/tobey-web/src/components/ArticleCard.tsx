import type { HTMLAttributes } from "react";
import Image from "next/image";
import type { schemas } from "@tobey/db";
import type { z } from "zod";
import { articleName } from "@/helpers/articleName";
import { cn } from "@/helpers/cn";
import { SUPABASE_URL } from "@/helpers/config";

export function ArticleCard({
  article,
  className,
  children,
}: {
  article: Pick<
    z.infer<(typeof schemas)["articles"]["schema"]>,
    "categoryName" | "brand" | "model"
  > & {
    articleImages: Pick<
      z.infer<(typeof schemas)["articleImages"]["schema"]>,
      "name"
    >[];
  };
} & Pick<HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-3 py-2 mix-blend-darken",
        className,
      )}
    >
      <div>
        <div className="font-medium">{article.categoryName}</div>
        <div>{[article.brand, article.model].filter(Boolean).join(" ")}</div>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <Image
          alt={articleName(article)}
          className="aspect-square object-contain mix-blend-darken"
          height={220}
          src={`${SUPABASE_URL}/storage/v1/object/public/articleFiles/${article.articleImages[0]?.name}`}
          width={220}
        />
      </div>
      {children}
    </div>
  );
}
