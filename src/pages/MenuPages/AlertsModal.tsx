import React from "react";
import styles from "~/styles/NavbarStyles/AlertModal.module.css";
import alertsStore from "~/store/alertsStore";

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
  const { alertsVisible, toggleAlertsVisible } = alertsStore((state) => ({
    alertsVisible: state.alertsVisible,
    toggleAlertsVisible: state.toggleAlertsVisible,
  }));

  const handleCheckbox = () => {
    toggleAlertsVisible();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={alertsVisible}
          onChange={handleCheckbox}
        />
        <p>Emergency Alerts</p>
      </div>
      {alert ? (
        <div className={styles.alertDetails}>
          <h2>
            ALERT! A fire is predicted to reach the location in{" "}
            {alert.hourPrediction} hours
          </h2>
          <p>Send at: {new Date(alert.sendTime).toLocaleString()}</p>
          <p>Received at: {new Date(alert.receivedTime).toLocaleString()}</p>
        </div>
      ) : (
        <p>No alert selected</p>
      )}
    </div>
  );
};

export default AlertsModal;
