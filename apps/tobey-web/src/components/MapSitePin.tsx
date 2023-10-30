import { PinWeb } from "@tobey/icons/src/index.web";
import { MapMarker } from "./MapMarker";

export function MapPin({
  coordinates,
}: {
  coordinates: [longitude: number, latitude: number];
}) {
  return (
    <MapMarker
      anchor="bottom"
      latitude={coordinates[1]}
      longitude={coordinates[0]}
    >
      <PinWeb className="fill-secondary h-10 w-10 border-black hover:border" />
    </MapMarker>
  );
}
