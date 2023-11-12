import {
  TobeyLogoWeb,
  AppleWeb,
  GooglePlayWeb,
  HllLogoWeb,
  OptimeraLogoWeb,
  ArrowRightRegularWeb,
} from "@tobey/icons/src/index.web";
import Link from "next/link";
import { TobeyLine } from "@/components/TobeyLine";
import { postgrestClient } from "@/helpers/api";
import questionsAndAnswers from "@/data/q&a.json";
import { ListShowMore } from "@/components/ListShowMote";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordition";

const storeButtons = [
  [
    AppleWeb,
    "Hämta i",
    "App Store",
    "https://apps.apple.com/se/app/tobey/id6448893719",
  ],
  [
    GooglePlayWeb,
    "Ladda ned på",
    "Google Play",
    "https://play.google.com/store/apps/details?id=io.tobey.app",
  ],
] as const;

const utm = "?utm_source=tobey&utm_medium=web&utm_campaign=pilot";
const partners = [
  [TobeyLogoWeb, "https://tobey.io"],
  [HllLogoWeb, "https://hyreslandslaget.se"],
  [OptimeraLogoWeb, "https://optimera.se"],
] as const;

export default async function Page() {
  const sites = await postgrestClient.sites.query({
    select: {
      id: true,
      name: true,
      openingHours: true,
      location: true,
    },
    where: { status: { not: { eq: "disabled" } } },
  });

  return (
    <div className="bg-primary min-h-screen w-full">
      <div className="container max-w-3xl flex flex-col gap-16 py-16">
        <TobeyLine className="-ml-16" />
        <TobeyLogoWeb className="w-full fill-white" />
        <p className="text-3xl font-bold text-white">
          I våra smarta boxar kan du hämta och lämna maskiner från{" "}
          <a
            className="text-[#eb6400] hover:underline"
            href={`https://hyreslandslaget.se${utm}`}
          >
            HLL Hyreslandslaget
          </a>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          {storeButtons.map(([Icon, first, second, href]) => (
            <a
              className="flex flex-row text-white rounded-full border border-current w-full gap-4 hover:bg-white/10 pl-8 py-4 items-center"
              href={href}
              key={href}
            >
              <Icon className="w-12 h-12 fill-current" />
              <div className="flex flex-col">
                <div>{first}</div>
                <div className="font-bold text-xl">{second}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="rounded-lg overflow-hidden divide-y">
          {sites.map(({ id, name }) => (
            <Link
              className="bg-white hover:bg-gray-100 flex flex-row justify-between h-12 text-lg items-center px-4"
              href={`/sites/${id}`}
              key={id}
            >
              <span>{name}</span>
              <ArrowRightRegularWeb className="h-4 w-4" />
            </Link>
          ))}
        </div>

        <Accordion
          className="rounded-lg overflow-hidden divide-y"
          type="multiple"
        >
          {questionsAndAnswers
            .filter(({ show }) => show)
            .map(({ title, answer }) => (
              <AccordionItem key={title} value={title}>
                <AccordionTrigger className="bg-white hover:bg-gray-100 text-lg font-normal hover:no-underline min-h-[48px] py-2 px-4 text-left">
                  {title}
                </AccordionTrigger>
                <AccordionContent className="bg-white text-base px-4">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          <ListShowMore>
            {questionsAndAnswers
              .filter(({ show }) => !show)
              .map(({ title, answer }) => (
                <AccordionItem key={title} value={title}>
                  <AccordionTrigger className="bg-white hover:bg-gray-100 text-lg font-normal hover:no-underline min-h-[48px] py-2 px-4 text-left">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="bg-white text-base px-4">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </ListShowMore>
        </Accordion>

        <a
          className="bg-white hover:bg-gray-100 rounded-lg flex flex-row justify-between h-12 text-lg items-center px-4"
          href="mailto:hej@tobey.io"
        >
          <span>Kontakta oss: hej@tobey.io</span>
          <ArrowRightRegularWeb className="h-4 w-4" />
        </a>

        <div className="w-full h-px bg-white/10" />

        <div className="flex flex-row gap-2">
          {partners.map(([Icon, href]) => (
            <a
              className="flex justify-center w-full flex-1 h-16"
              href={href + utm}
              key={href}
            >
              <Icon className="py-2 fill-white w-full" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
