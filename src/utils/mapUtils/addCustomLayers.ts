import { Map, AnyLayout, AnyLayer, Layer } from "mapbox-gl";
import { wildfiresDetails } from "~/data/wildfires";
import { createHotspotGeoJSON } from "./addHotspots";

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
        if (!map.getLayer(layerId)) {
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
        }
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

  // Add hotspot heatmap layer
  addHotspotHeatmapLayer(map);
};

// Function to add the hotspot heatmap layer
export const addHotspotHeatmapLayer = (map: Map) => {
  const sourceId = "hotspot-heatmap-source";
  const layerId = "hotspot-heatmap-layer";

  // Check if the source already exists
  if (map.getSource(sourceId)) {
    console.warn(`Source with ID ${sourceId} already exists.`);
    return;
  }

  const geoJSONSource = createHotspotGeoJSON();

  map.addSource(sourceId, geoJSONSource);

  // Check if the layer already exists
  if (map.getLayer(layerId)) {
    console.warn(`Layer with ID ${layerId} already exists.`);
    return;
  }

  map.addLayer({
    id: layerId,
    type: "heatmap",
    source: sourceId,
    paint: {
      "heatmap-intensity": 1,
      "heatmap-radius": 20, // Adjust the radius as needed
      "heatmap-opacity": 0.7,
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
    },
  });
};

// Function to adjust heatmap radius manually
export function setHeatmapRadius(map: Map, radius: number, wildfireId: string) {
  const layerId = `heatmap-${wildfireId}`;
  map.setPaintProperty(layerId, "heatmap-radius", radius);
}

export default addCustomLayers;
