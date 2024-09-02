import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { loraDevices } from "~/data/loraDevices";
import type { Map } from "mapbox-gl";
import alertsStore from "~/store/alertsStore";

export interface Alert {
  id: string;
  hourPrediction: number;
  sendTime: string;
  receivedTime: string;
  coordinates: [number, number];
}

interface EmergencyAlertsProps {
  map: Map | null;
  onAlertClick: (alert: Alert) => void;
}

const EmergencyAlerts: React.FC<EmergencyAlertsProps> = ({
  map,
  onAlertClick,
}) => {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const alertsVisible = alertsStore((state) => state.alertsVisible);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers when alertsVisible changes
    const clearMarkers = () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };

    if (alertsVisible) {
      loraDevices.forEach((alert) => {
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundColor = "#62E824";
        el.style.width = "20px";
        el.style.height = "20px";
        el.style.backgroundSize = "100%";
        el.style.borderRadius = "50%";
        el.style.cursor = "pointer";

        el.addEventListener("click", () => {
          onAlertClick(alert);
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat(alert.coordinates as [number, number])
          .addTo(map);

        markersRef.current.push(marker);
      });
    } else {
      clearMarkers(); // Ensure markers are removed when alerts are toggled off
    }

    // Cleanup markers when component unmounts or before adding new ones
    return clearMarkers;
  }, [map, onAlertClick, alertsVisible]);

  return null;
};

export default EmergencyAlerts;
