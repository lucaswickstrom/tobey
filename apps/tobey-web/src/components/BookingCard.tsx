import type { ComponentProps } from "react";
import { getMobileOS } from "@/helpers/getMobileOS";
import { ArticleCard } from "./ArticleCard";
import { Button } from "./Button";
import { AppAction } from "./AppAction";

export function BookingCard({
  article,
}: {
  article: ComponentProps<typeof ArticleCard>["article"] & { id: string };
}) {
  return (
    <div className="relative h-full">
      <AppAction os={getMobileOS()}>
        <button
          className="cursor-pointer flex flex-col h-full px-3 hover:bg-gray-100 "
          tabIndex={0}
          type="button"
        >
          <ArticleCard article={article} className="py-6 h-full">
            <div className="h-10" />
          </ArticleCard>
        </button>
        <Button
          className="flex-1 absolute bottom-6 left-6 right-6"
          variant="outline"
        >
          Hyr
        </Button>
      </AppAction>
    </div>
  );
}
