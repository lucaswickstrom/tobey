import Link from "next/link";
import { TobeyLogoWeb } from "@tobey/icons/src/index.web";
import { getMobileOS } from "@/helpers/getMobileOS";
import { AppAction } from "./AppAction";
import { Button } from "./Button";
import { StoreIcon } from "./StoreIcon";

export function Header() {
  const os = getMobileOS();

  return (
    <div className="sticky top-0 z-10 border-b bg-white/50 backdrop-blur">
      <header className="container flex h-14 items-center gap-8  px-4 text-sm">
        <Link href="/">
          <TobeyLogoWeb className="fill-tobey-secondary h-6" />
        </Link>
        <span className="sr-only">Tobey</span>
        {/* <Link href="/sites">Våra platser</Link> */}
        {/* <a href="/om-tobey">Om oss</a>
        <a href="/platser">Våra platser</a>
        <a href="/platser">Frågor och svar</a> */}
        <div className="flex-1" />
        <AppAction os={os}>
          <Button className="gap-2" variant="secondary">
            <StoreIcon className="h-4 w-4 fill-current" os={os} />
            Hämta appen
          </Button>
        </AppAction>
      </header>
    </div>
  );
}
