import { GlobeRegularWeb, RouteRegularWeb } from "@tobey/icons/src/index.web";
import { BookingCard } from "@/components/BookingCard";
import { Button } from "@/components/Button";
import { Map } from "@/components/Map";
import { MapRotateCamera } from "@/components/MapRotateCamera";
import { MapSiteMarker } from "@/components/MapSiteMarker";
import { postgrestClient } from "@/helpers/api";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { slug: string } }) {
  const siteId = params.slug;

  const [site, articles] = await Promise.all([
    postgrestClient.sites.query(
      {
        select: {
          name: true,
          address: true,
          directions: true,
          openingHours: true,
          location: true,
          url: true,
          status: true,
        },
        where: { id: { eq: siteId } },
      },
      { single: true }
    ),
    postgrestClient.articles.query({
      select: {
        id: true,
        type: true,
        categoryName: true,
        brand: true,
        model: true,
        articleImages: { select: { name: true }, order: [["name", "asc"]] },
        slotBookingsReferences: {
          select: {
            slotBooking: {
              select: {
                id: true,
                bookingId: true,
                type: true,
                status: true,
                slot: {
                  select: {
                    box: {
                      select: {
                        boxGroup: {
                          select: { id: true },
                          where: { siteId: { eq: siteId } },
                          inner: true,
                        },
                      },
                      inner: true,
                    },
                  },
                  inner: true,
                },
              },
              inner: true,
              where: {
                type: { eq: "retrieve" },
                status: { eq: "ongoing" },
                bookingId: { is: null },
              },
            },
          },
          inner: true,
        },
      },
      where: { type: { eq: "rentalEquipment" } },
    }),
  ]);

  return (
    <>
      <div className="sticky top-0 -mt-14">
        <Map
          initialViewState={{
            longitude: site.location.coordinates[0],
            latitude: site.location.coordinates[1],
            zoom: 16,
            pitch: 62,
          }}
          interactive={false}
          padding={{ top: 160, bottom: 0, left: 0, right: 0 }}
          style={{ height: "62vh", minHeight: 360 }}
        >
          <MapRotateCamera />
          <MapSiteMarker {...site} />
        </Map>
      </div>
      <div className="relative -mt-14">
        <div className="scrollbar-hide container flex flex-row gap-2 overflow-auto px-4 py-2">
          <Button
            className="pointer-events-none rounded-full px-4"
            size="sm"
            variant="secondary"
          >
            Maskiner på plats
          </Button>
          <Button
            asChild
            className="gap-2 rounded-full px-4"
            size="sm"
            variant="outline"
          >
            <a href={site.url}>
              <GlobeRegularWeb className="h-4 w-4 fill-inherit" />
              Hemsida
            </a>
          </Button>
          <Button
            asChild
            className="gap-2 rounded-full px-4"
            size="sm"
            variant="outline"
          >
            <a
              href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${site.address.replace(
                " ",
                "+"
              )}`}
            >
              <RouteRegularWeb className="h-4 w-4 fill-inherit" />
              Vägbeskrivning
            </a>
          </Button>
        </div>
        <div className="w-full border-t bg-white">
          {site.status === "active" ? (
            <div className="container px-0">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                {articles.map((article) => (
                  <div className="border-b" key={article.id}>
                    <BookingCard article={article} />
                  </div>
                ))}
              </div>
              <div className="-mt-[1px] w-full border-b" />
            </div>
          ) : (
            <div className="container px-0 flex flex-col items-center">
              <div className="bg-slate-100 px-4 py-4 rounded my-4 max-w-[32rem] w-full">
                Den här platsen aktiveras snart.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
