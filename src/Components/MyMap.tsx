import React from 'react'
import styles from "../styles/Home.module.css";

import { Map } from "react-map-gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react/typed";

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGVjdG9yZ3R6MjciLCJhIjoiY2xuZ3dmc215MDc2ZDJqbWFydmszaTVxZCJ9.VjBUl1K3sWQTxY5pce434A'

const ambientLight = new AmbientLight({
  color: [255, 165, 0],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 69, 0],
  intensity: 1.2,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 69, 0],
  intensity: 1.2,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

const INITIAL_VIEW_STATE = {
  longitude: -1.415727,
  latitude: 52.232395,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27,
};

// const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";
// const MAP_STYLE = "mapbox://styles/mapbox/streets-v9";
// const MAP_STYLE = "mapbox://styles/petherem/cl2hdvc6r003114n2jgmmdr24";
const MAP_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";


export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

function getTooltip({ object }:{object:any}) {
  if (!object) {
    return null;
  }
  const lat = object.position[1];
  const lng = object.position[0];
  const count = object.points.length;

  return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
    ${count} Accidents`;
}

export default function MyMap({
  data = [] as any,
  mapStyle = MAP_STYLE,
  radius = 1000,
  upperPercentile = 100,
  coverage = 1,
}) {
  const layers = [
    new HeatmapLayer({
      id: 'heatmap',
      data,
      getPosition: d => d as any,
      getWeight: d => 1,
      radiusPixels: 60,
      intensity: 1,
      threshold: 0.05,
      colorRange: colorRange as any,
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
        // getTooltip={getTooltip}
      >
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={mapStyle}
        />
      </DeckGL>
    </div>
  );
}
