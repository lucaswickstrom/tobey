"use client";

import type { ReactElement } from "react";
import { Children, cloneElement } from "react";
import type { getMobileOS } from "@/helpers/getMobileOS";
import { Button } from "./Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./Dialog";
import { AppDownload } from "./AppDownload";

const appStore = "https://apps.apple.com/se/app/tobey/id6448893719";
const googlePlay = "https://play.google.com/store/apps/details?id=io.tobey.app";

export function AppAction({
  os,
  children,
}: {
  os: ReturnType<typeof getMobileOS>;
  children: ReactElement | ReactElement[];
}) {
  if (os === "unknown") {
    return (
      <Dialog>
        {Children.map(children, (child) => (
          <DialogTrigger asChild>{child}</DialogTrigger>
        ))}
        <DialogContent className="max-w-[420px]">
          <AppDownload />
          <div className="w-full border-b" />
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Stäng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {Children.map(children, (child) =>
        cloneElement(child, {
          onClick: () => (location.href = os === "iOS" ? appStore : googlePlay),
        })
      )}
    </>
  );
}
