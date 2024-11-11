// addCustomLayers.ts
import { Map, AnyLayout, AnyLayer, Layer } from "mapbox-gl";
import { wildfiresDetails } from "~/data/wildfires";
import { createHotspotGeoJSON } from "./addHotspots";
import { createPredictionGeoJSON } from "./addHotspotsPrediction";

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
};

// Function to add the hotspot heatmap layer
export const addHotspotHeatmapLayer = (map: Map) => {
  const sourceId = "hotspot-heatmap-source";
  const layerId = "hotspot-heatmap-layer";

  if (map.getSource(sourceId)) {
    console.warn(`Source with ID ${sourceId} already exists.`);
    return;
  }

  const geoJSONSource: mapboxgl.GeoJSONSourceRaw = {
    type: "geojson",
    data: createHotspotGeoJSON(),
  };

  map.addSource(sourceId, geoJSONSource);

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
      "heatmap-radius": 20,
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

export const addHotspotHeatmapPrediction = async (map: Map) => {
  const sourceId = "prediction-heatmap-source";
  const layerId = "prediction-heatmap-layer";

  if (map.getSource(sourceId)) {
    console.warn(`Source with ID ${sourceId} already exists.`);
    return;
  }

  // Usa los datos de predicción con `value` en `properties`
  const predictionData = await createPredictionGeoJSON();
  const geoJSONSource: mapboxgl.GeoJSONSourceRaw = {
    type: "geojson",
    data: predictionData,
  };

  map.addSource(sourceId, geoJSONSource);

  if (map.getLayer(layerId)) {
    console.warn(`Layer with ID ${layerId} already exists.`);
    return;
  }

  // Define los umbrales de valor
  const minValue = 0.000000001; // Valor mínimo a considerar
  const maxValue = 1; // Valor máximo a considerar

  map.addLayer({
    id: layerId,
    type: "heatmap",
    source: sourceId,
    paint: {
      // Ajustar `heatmap-weight` para considerar solo valores entre 0.000000001 y 1
      "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "value"],
        minValue,
        0, // Peso mínimo para el valor mínimo
        (minValue + maxValue) / 2,
        0.5, // Peso medio para el valor medio del rango
        maxValue,
        1, // Peso máximo para el valor máximo
      ],
      "heatmap-intensity": 1,
      "heatmap-radius": 70,
      "heatmap-opacity": 0.7,
      // Colores interpolados solo para valores dentro del rango
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)", // Color más claro para valores bajos
        0.2,
        "rgb(103,169,207)", // Azul para valores bajos-medios
        0.4,
        "rgb(209,229,240)", // Azul claro para valores medios
        0.6,
        "rgb(253,219,199)", // Rosado para valores medios-altos
        0.8,
        "rgb(239,138,98)", // Naranja para valores altos
        1,
        "rgb(178,24,43)", // Rojo oscuro para valores muy altos
      ],
    },
  });
};

export default addCustomLayers;
