"use client";

import { useEffect } from "react";
import { useMap } from "react-map-gl";

export function MapRotateCamera() {
  const { current: map } = useMap();

  useEffect(() => {
    if (map) {
      let requestId: number | undefined;
      const rotateCamera = (bearing: number) => {
        map.setBearing(bearing);
        requestId = requestAnimationFrame(() => {
          rotateCamera(bearing - 0.02);
        });
      };
      rotateCamera(map.getBearing());

      return () => {
        requestId ? cancelAnimationFrame(requestId) : undefined;
      };
    }
  }, [map]);

  return null;
}
