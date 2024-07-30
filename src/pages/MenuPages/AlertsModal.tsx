import React from "react";

interface Alert {
  id: string;
  hourPrediction: number;
  sendTime: string;
  receivedTime: string;
  coordinates: [number, number];
}

interface AlertsModalProps {
  alert?: Alert | null;
}

// Función para formatear la fecha y hora
function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

const AlertsModal: React.FC<AlertsModalProps> = ({ alert }) => {
  if (!alert) return null;

  return (
    <div>
      <h2>
        ALERT! A fire is predicted to reach the location in{" "}
        {alert.hourPrediction} hours
      </h2>
      <p>Send at: {formatDateTime(alert.sendTime)}</p>
      <p>Received at: {formatDateTime(alert.receivedTime)}</p>
    </div>
  );
};

export default AlertsModal;
