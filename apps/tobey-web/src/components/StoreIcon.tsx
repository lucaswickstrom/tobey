import type { SVGProps } from "react";
import { AppleWeb, GooglePlayWeb } from "@tobey/icons/src/index.web";
import type { getMobileOS } from "@/helpers/getMobileOS";

export function StoreIcon({
  os,
  ...props
}: Omit<SVGProps<SVGSVGElement>, "children"> & {
  os: ReturnType<typeof getMobileOS>;
}) {
  if (os === "iOS") {
    return <AppleWeb {...props} />;
  }
  if (os === "Android") {
    return <GooglePlayWeb {...props} />;
  }
  return null;
}
