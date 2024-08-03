import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import useLayersStore from "~/store/layersStore";
import type { Map } from "mapbox-gl";
import type { Instance } from "~/types/layerInterfaces";

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

    // Function to add markers to the map
    const addMarkers = (
      instances: Instance[],
      markerClass: string,
      icon: string,
    ) => {
      instances.forEach((instance) => {
        console.log("Adding marker at coordinates:", instance.coordinates);
        const el = document.createElement("div");
        el.className = markerClass;
        el.style.backgroundImage = `url(${icon})`;
        el.style.width = "42px";
        el.style.height = "42px";
        el.style.backgroundSize = "100%";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundPosition = "center";

        const marker = new mapboxgl.Marker(el)
          .setLngLat(instance.coordinates as [number, number])
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    // Adding grouped layers markers
    selectedLayers.forEach((layer) => {
      addMarkers(layer.instances, "selected-layer-marker", layer.icon.src);
    });
  }, [map, selectedLayers]);

  return null;
};

export default ServicesLayer;
