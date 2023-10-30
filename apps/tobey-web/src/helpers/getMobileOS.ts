import { headers } from "next/headers";
import UAParser from "ua-parser-js";

export function getMobileOS() {
  const userAgent = headers().get("user-agent");

  if (!userAgent) {
    return "unknown";
  }

  const parser = new UAParser(userAgent);
  const name = parser.getOS().name;

  if (name === "iOS" || name === "Android") {
    return name;
  }

  return "unknown";
}
