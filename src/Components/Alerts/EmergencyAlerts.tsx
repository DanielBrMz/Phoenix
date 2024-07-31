import React, { useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { loraDevices } from "~/data/loraDevices";

interface Alert {
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
  useEffect(() => {
    if (!map) return;

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

      new mapboxgl.Marker(el)
        .setLngLat(alert.coordinates as [number, number])
        .addTo(map);
    });
  }, [map, onAlertClick]);

  return null;
};

export default EmergencyAlerts;
