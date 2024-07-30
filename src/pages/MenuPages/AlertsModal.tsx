import React from "react";

interface Alert {
  id: string;
  hourPrediction: number;
  sendTime: string;
  coordinates: [number, number];
}

interface AlertsModalProps {
  alert?: Alert | null;
}

const AlertsModal: React.FC<AlertsModalProps> = ({ alert }) => {
  if (!alert) return null;

  return (
    <div>
      <h2>Alert Information</h2>
      <p>ID: {alert.id}</p>
      <p>Hour Prediction: {alert.hourPrediction}</p>
      <p>Send Time: {alert.sendTime}</p>
      <p>Coordinates: {alert.coordinates.join(", ")}</p>
    </div>
  );
};

export default AlertsModal;
