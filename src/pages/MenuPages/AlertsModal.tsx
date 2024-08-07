import React from "react";
import styles from "~/styles/NavbarStyles/AlertSection.module.css";
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
    <div className={styles.alertsContainer}>
      <h2 className={styles.alertsTitle}>ALERTS</h2>
      <div className={styles.line}></div>
      <div className={styles.checkboxContainer} onClick={handleCheckbox}>
        <div
          className={`${styles.checkboxAlerts} ${
            alertsVisible ? styles.checkboxChecked : ""
          }`}
        ></div>
        <h2 className={styles.checkboxAlertsSubtitle}>
          EMERGENCY RESPONSE DEVICE
        </h2>
      </div>
      <div className={styles.line}></div>
      {alert ? (
        <div className={styles.alertDetailsContainer}>
          <h2 className={styles.alertDetailsTitle}>
            ALERT! A fire is predicted to reach the location in{" "}
            {alert.hourPrediction}{" "}
            {alert.hourPrediction == 1 ? "hour" : "hours"}
          </h2>
          <div className={styles.alertDetailsDescription}>
            <p>Send at: {new Date(alert.sendTime).toLocaleString()}</p>
            <p>Received at: {new Date(alert.receivedTime).toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <p className={styles.noAlertText}>No alert selected</p>
      )}
      <div className={styles.line}></div>
      <button className={styles.alertExitButton}>EXIT</button>
    </div>
  );
};

export default AlertsModal;
