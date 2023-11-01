import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { Open_Sans as OpenSans, Nunito } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/helpers/cn";

const nunito = Nunito({
  variable: "--display-font",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const openSans = OpenSans({
  variable: "--body-font",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={cn(
        nunito.variable,
        openSans.variable,
        "font-body antialiased"
      )}
      lang="sv"
    >
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
