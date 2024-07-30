import React from "react";
import styles from "~/styles/NavbarStyles/AlertModal.module.css";
import alertStore from "~/store/alertsStore";

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

const AlertsModal: React.FC<AlertsModalProps> = ({ alert }) => {
  const alertVisible = alertStore((state) => state.alertVisible);
  const toggleAlertsVisible = alertStore((state) => state.toggleAlertsVisible);

  const handleCheckbox = () => {
    toggleAlertsVisible();
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          checked={alertVisible}
          onChange={handleCheckbox}
        />
        <p>Emergency Alerts</p>
      </div>
      {alert ? (
        <>
          <h2>
            ALERT! A fire is predicted to reach the location in{" "}
            {alert.hourPrediction} hours
          </h2>
          <p>Send at: {new Date(alert.sendTime).toLocaleString()}</p>
          <p>Received at: {new Date(alert.receivedTime).toLocaleString()}</p>
        </>
      ) : (
        <p>No alert selected</p>
      )}
    </div>
  );
};

export default AlertsModal;
