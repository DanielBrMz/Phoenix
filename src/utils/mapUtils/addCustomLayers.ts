import type { Map, AnyLayout, AnyLayer, Layer } from "mapbox-gl";
import { wildfiresDetails } from "~/data/wildfires";

type SymbolLayout = AnyLayout & {
  "text-field"?: string;
};

const addCustomLayers = (map: Map) => {
  const layers: AnyLayer[] = map.getStyle().layers;
  const labelLayer = layers.find((layer) => {
    const typedLayer = layer as Layer & { layout?: SymbolLayout };
    return (
      typedLayer.type === "symbol" &&
      typedLayer.layout &&
      typedLayer.layout["text-field"]
    );
  });

  // Add place labels layer
  map.addLayer({
    id: "place-labels",
    source: "composite",
    "source-layer": "place_label",
    type: "symbol",
    layout: {
      "text-field": ["get", "name"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  // Add heatmap layers for each wildfire
  wildfiresDetails.forEach((country) => {
    country.states.forEach((state) => {
      state.wildfires.forEach((wildfire) => {
        const layerId = `heatmap-${wildfire.id}`;
        map.addLayer({
          id: layerId,
          type: "heatmap",
          source: `wildfire-${wildfire.id}`,
          layout: {},
          paint: {
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(33,102,172,0)",
              0.2,
              "rgb(103,169,207)",
              0.4,
              "rgb(209,229,240)",
              0.6,
              "rgb(253,219,199)",
              0.8,
              "rgb(239,138,98)",
              1,
              "rgb(178,24,43)",
            ],
            "heatmap-opacity": 0.6,
            "heatmap-radius": 10, // Fixed value to maintain size
            "heatmap-intensity": 1, // Fixed value to maintain intensity
          },
        });
      });
    });
  });

  // Add 3D buildings layer
  map.addLayer(
    {
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    },
    labelLayer?.id,
  );
};

// Function to adjust heatmap radius manually
export function setHeatmapRadius(map: Map, radius: number) {
  wildfiresDetails.forEach((country) => {
    country.states.forEach((state) => {
      state.wildfires.forEach((wildfire) => {
        const layerId = `heatmap-${wildfire.id}`;
        map.setPaintProperty(layerId, "heatmap-radius", radius);
      });
    });
  });
}

export default addCustomLayers;
