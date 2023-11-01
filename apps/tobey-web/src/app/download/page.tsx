import { redirect } from "next/navigation";
import { AppleWeb, GooglePlayWeb } from "@tobey/icons/src/index.web";
import { AppDownload } from "@/components/AppDownload";
import { Header } from "@/components/Header";
import { getMobileOS } from "@/helpers/getMobileOS";
import { Button } from "@/components/Button";

const appStore = "https://apps.apple.com/se/app/tobey/id6448893719";
const googlePlay = "https://play.google.com/store/apps/details?id=io.tobey.app";

export default function Page() {
  const os = getMobileOS();

  if (os === "iOS") {
    redirect(appStore);
  }
  if (os === "Android") {
    redirect(googlePlay);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-96 flex flex-col gap-8">
          <AppDownload />
          <div className="w-full border-b" />
          <div className="flex flex-col gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
