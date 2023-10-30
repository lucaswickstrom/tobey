'use client';

import type { MarkerProps } from 'react-map-gl';
import { Marker } from 'react-map-gl';

export function MapMarker(props: MarkerProps) {
  return <Marker {...props} />
}
