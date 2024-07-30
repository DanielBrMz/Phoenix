import React, { useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import useLayersStore from "~/store/layersStore";

interface ServicesLayerProps {
  map: Map | null;
}

const ServicesLayer: React.FC<ServicesLayerProps> = ({ map }) => {
  const selectedLayers = useLayersStore((state) => state.selectedLayers);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Group selected layers by type
    const groupedLayers = selectedLayers.reduce((acc, layer) => {
      if (!acc[layer.name]) {
        acc[layer.name] = [];
      }
      acc[layer.name].push(layer);
      return acc;
    }, {});

    // Function to add markers to the map
    const addMarkers = (details, markerClass, icon) => {
      details.forEach((service) => {
        console.log("Adding marker at coordinates:", service.coordinates);
        const el = document.createElement("div");
        el.className = markerClass;
        el.style.backgroundImage = `url(${icon})`;
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundSize = "100%";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundPosition = "center";

        const marker = new mapboxgl.Marker(el)
          .setLngLat(service.coordinates as [number, number])
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    // Adding grouped layers markers
    Object.keys(groupedLayers).forEach((key) => {
      const layers = groupedLayers[key];
      if (layers.length > 0) {
        const { icon } = layers[0];
        addMarkers(layers, "selected-layer-marker", icon.src);
      }
    });
  }, [map, selectedLayers]);

  return null;
};

export default ServicesLayer;
