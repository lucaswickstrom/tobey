import type { z } from "zod";
import type { schemas } from "@tobey/db";
import { Arrow } from "./Arrow";
import { MapMarker } from "./MapMarker";

type SiteMarkerProps = Pick<
  z.infer<(typeof schemas)["sites"]["schema"]>,
  "name" | "address" | "openingHours" | "location" | "directions"
>;

export function MapSiteMarker({
  name,
  address,
  openingHours,
  location,
  directions,
}: SiteMarkerProps) {
  return (
    <MapMarker
      anchor="bottom"
      latitude={location.coordinates[1]}
      longitude={location.coordinates[0]}
      // fixes rounding jiggeling when rotating
      style={{ transition: "transform 1s" }}
    >
      <div className="mb-6 max-w-xs">
        <div className="min-w-[256px] bg-white shadow relative rounded py-3 gap-2 flex flex-col">
          <div className="px-3">
            <h1 className="text-2xl font-bold font-display">{name}</h1>
            <p>{address}</p>
          </div>
          {openingHours ? (
            <div className="px-3">
              <h3 className="font-medium">Öppettider</h3>
              <p>{openingHours}</p>
            </div>
          ) : null}
          <div className="px-3">
            <h3 className="font-medium">Boxplacering</h3>
            <p>{directions}</p>
          </div>

          <Arrow />
        </div>
      </div>
    </MapMarker>
  );
}
