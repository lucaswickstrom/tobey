"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { useMemo } from "react";
import type { MapProps } from "react-map-gl";
import MapGl from "react-map-gl";
import { getMapStyle } from "@/helpers/getMapStyle";

export function Map({ style, ...props }: MapProps) {
  const mapStyle = useMemo(
    () => getMapStyle([520535602, 115732315, 120314342, 207760547, 493146958]),
    []
  );

  return (
    <MapGl
      antialias
      attributionControl={false}
      // @ts-expect-error: comment
      mapStyle={mapStyle}
      mapboxAccessToken="pk.eyJ1IjoibHVjYXN3aWNrc3Ryb20iLCJhIjoiY2wxdnQ1cGo0MDI1OTNpbzlkZHprbjJvaSJ9.emZQDs9bIXtM38KRfcLLcQ"
      {...props}
      style={{ width: "100%", font: "inherit", ...style }}
    />
  );
}
