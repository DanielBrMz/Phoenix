import React, { ReactNode } from 'react'
import styles from "../styles/Home.module.css";

import { Map } from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect} from "@deck.gl/core";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react/typed";
import { RGBAColor } from 'deck.gl';
import { ColorRange } from 'deck.gl';

interface MyDeckGLProps extends DeckGL {
  children?: ReactNode;
}

const MAPBOX_ACCESS_TOKEN: string = 'pk.eyJ1IjoiaGVjdG9yZ3R6MjciLCJhIjoiY2xuZ3dmc215MDc2ZDJqbWFydmszaTVxZCJ9.VjBUl1K3sWQTxY5pce434A'

const ambientLight: AmbientLight= new AmbientLight({
  color: [255, 165, 0],
  intensity: 1.0,
});

const pointLight1: PointLight = new PointLight({
  color: [255, 69, 0],
  intensity: 1.2,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2: PointLight = new PointLight({
  color: [255, 69, 0],
  intensity: 1.2,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect: LightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const material: Record<string, number | number[]> = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

const INITIAL_VIEW_STATE: Record<string, number> = {
  longitude: -93.16479,
  latitude: 18.4417,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27,
};

const MAP_STYLE: string = "mapbox://styles/mapbox/satellite-streets-v12";

export const colorRange: ColorRange = [
  [1, 152, 189, 355],
  [73, 227, 206, 255],
  [216, 254, 181, 255],
  [254, 237, 177, 255],
  [254, 173, 84, 255],
  [209, 55, 78, 255],
];

if (colorRange.length !== 6 || colorRange.some(color => color.length !== 4)) {
  throw new Error('colorRange must be an array of exactly six RGBA colors');
}

function getTooltip({ object }: { object: { position: number[], points: { length: number }[] } }) {
  if (!object) {
    return null;
  }
  const lat: number = object.position[1]!;
  const lng: number = object.position[0]!;
  const count: number = object.points.length;

  return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
    ${count} Accidents`;
}

interface MyMapProps {
  data?: number[][],
  mapStyle?: string,
  radius?: number,
  upperPercentile?: number,
  coverage?: number,
}

export default function MyMap({
  data = [],
  mapStyle = MAP_STYLE,
  radius = 1000,
  upperPercentile = 100,
  coverage = 1,
}: MyMapProps) {
  const layers: HeatmapLayer<number[]>[] = [
    new HeatmapLayer({
      id: 'heatmap',
      data,
      getPosition: d => {
        if (d.length >= 2 && typeof d[0] === 'number' && typeof d[1] === 'number') {
          return [d[0], d[1]];
        } else {
          throw new Error('Data array must have at least two elements and they must be numbers');
        }
      },
      getWeight: d => 1,
      radiusPixels: 60,
      intensity: 1,
      threshold: 0.05,
      colorRange: colorRange,
      opacity: 0.8,
    }),
  ];

  return (
    <div>
      <DeckGL
        layers={layers}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={mapStyle}
        />
      </DeckGL>
    </div>
  );
}
