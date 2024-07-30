import React, { useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import {
  infrastructureDetails,
  emergencyServicesDetails,
} from "~/data/layers/servicesDetails";

interface ServicesLayerProps {
  map: Map | null;
}

const ServicesLayer: React.FC<ServicesLayerProps> = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    // Function to add markers to the map
    const addMarkers = (
      details: typeof infrastructureDetails | typeof emergencyServicesDetails,
      markerClass: string,
    ) => {
      details.forEach((service) => {
        const el = document.createElement("div");
        el.className = markerClass;
        el.style.backgroundImage = `url(${service.icon.src})`;
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.backgroundSize = "100%";

        new mapboxgl.Marker(el)
          .setLngLat(service.coordinates as [number, number])
          .addTo(map);
      });
    };

    // Adding infrastructure markers
    addMarkers(infrastructureDetails, "infrastructure-marker");

    // Adding emergency services markers
    addMarkers(emergencyServicesDetails, "emergency-marker");
  }, [map]);

  return null;
};

export default ServicesLayer;
