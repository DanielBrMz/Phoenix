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
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Function to add markers to the map
    const addMarkers = (details, markerClass) => {
      details.forEach((service) => {
        const el = document.createElement("div");
        el.className = markerClass;
        el.style.backgroundImage = `url(${service.icon.src})`;
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundSize = "100%";

        const marker = new mapboxgl.Marker(el)
          .setLngLat(service.coordinates as [number, number])
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    // Adding selected layers markers
    addMarkers(selectedLayers, "selected-layer-marker");
  }, [map, selectedLayers]);

  return null;
};

export default ServicesLayer;
