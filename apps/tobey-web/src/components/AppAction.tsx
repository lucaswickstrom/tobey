"use client";

import type { ReactElement } from "react";
import { Children, cloneElement } from "react";
import { AppleWeb, GooglePlayWeb } from "@tobey/icons/src/index.web";
import type { getMobileOS } from "@/helpers/getMobileOS";
import { Button } from "./Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

const appStore = "https://apps.apple.com/se/app/tobey/id6448893719";
const googlePlay = "https://play.google.com/store/apps/details?id=io.tobey.app";

// const os = getMobileOS();

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
        <DialogContent className="max-w-[320px]">
          <DialogHeader>
            <DialogTitle>Hämta Tobey-Appen</DialogTitle>
            <p>I appen kan du se priser, boka och returnera maskiner.</p>
          </DialogHeader>
          <DialogFooter>
            <Button asChild className="relative w-full" variant="secondary">
              <a href={appStore}>
                <AppleWeb className="absolute left-4 h-4 w-4 fill-current" />
                App Store
              </a>
            </Button>
            <Button asChild className="relative w-full" variant="secondary">
              <a href={googlePlay}>
                <GooglePlayWeb className="absolute left-4 h-4 w-4 fill-current" />
                Play Store
              </a>
            </Button>
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
        }),
      )}
    </>
  );
}
