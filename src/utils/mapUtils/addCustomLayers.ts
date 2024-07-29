import mapboxgl, { Map } from "mapbox-gl";

type SymbolLayout = mapboxgl.AnyLayout & {
  "text-field"?: string;
};

const addCustomLayers = (map: Map) => {
  const layers: mapboxgl.AnyLayer[] = map.getStyle().layers;
  const labelLayer = layers.find((layer) => {
    const typedLayer = layer as mapboxgl.Layer & { layout?: SymbolLayout };
    return (
      typedLayer.type === "symbol" &&
      typedLayer.layout &&
      typedLayer.layout["text-field"]
    );
  });

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

  map.addLayer({
    id: "polygon",
    type: "heatmap",
    source: "polygon",
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
      "heatmap-radius": {
        base: 1, // Inicialmente pequeño
        stops: [
          [1, 10],
          [3, 5],
          [22, 10],
        ], // valores iniciales pequeños
      },
      "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 15, 20, 22, 1],
    },
  });

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

  // Función de animación
  const animateHeatmap = () => {
    const startTime = performance.now();
    const duration = 30000; // 30 segundos

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Interpolar los valores de heatmap-radius
      const radius = 80 * progress; // aumentar el radio de 0 a 10

      map.setPaintProperty("polygon", "heatmap-radius", {
        base: radius,
        stops: [
          [1, radius * 10],
          [3, radius * 5],
          [22, radius * 10],
        ],
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Reiniciar la animación después de completar
        setTimeout(() => {
          animateHeatmap();
        }, 1000); // 1 segundo de pausa antes de reiniciar la animación
      }
    };

    requestAnimationFrame(animate);
  };

  // Iniciar la animación cuando el mapa esté cargado
  map.on("load", () => {
    animateHeatmap();
  });
};

export default addCustomLayers;
