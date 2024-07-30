import React, { useState, useEffect } from "react";
import {
  faFire,
  faGear,
  faLayerGroup,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountryStep from "~/pages/MenuPages/CountryStep";
import StateStep from "~/pages/MenuPages/StateStep";
import WildfireStep from "~/pages/MenuPages/WildfireStep";
import PredictionStep from "~/pages/MenuPages/PredictionStep";
import AlertsModal from "~/pages/MenuPages/AlertsModal";
import LayersModal from "~/pages/MenuPages/LayersModal";
import SettingsModal from "~/pages/MenuPages/SettingsModal";
import EmergencyAlerts from "~/Components/Alerts/EmergencyAlerts";
import useStore from "~/store/useStore";
import styles from "../styles/NavbarStyles/Navbar.module.css";
import { Map } from "mapbox-gl";

interface Alert {
  id: string;
  hourPrediction: number;
  sendTime: string;
  receivedTime: string;
  coordinates: [number, number];
}

interface NavBarProps {
  map: Map | null;
}

const NavBar: React.FC<NavBarProps> = ({ map }) => {
  const [selectedData, setSelectedData] = useState<{
    country?: string;
    state?: string;
    wildfire?: string;
  }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null); // Estado para la alerta seleccionada
  const {
    activeStep,
    setActiveStep,
    inPredictionStep,
    stayInPredictionStep,
    leavePredictionStep,
    resetStep,
  } = useStore((state) => ({
    activeStep: state.activeStep,
    setActiveStep: state.setActiveStep,
    inPredictionStep: state.inPredictionStep,
    stayInPredictionStep: state.stayInPredictionStep,
    leavePredictionStep: state.leavePredictionStep,
    resetStep: state.resetStep,
  }));

  const handleNext = (data: string) => {
    setSelectedData((prev) => {
      if (activeStep === 0) return { country: data };
      if (activeStep === 1) return { ...prev, state: data };
      if (activeStep === 2) return { ...prev, wildfire: data };
      return prev;
    });
    setActiveStep(activeStep + 1);
    if (activeStep === 2) {
      stayInPredictionStep();
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);
  const handleReset = () => {
    resetStep();
    setSelectedData({});
  };

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    setIsModalVisible(true);
    if (icon === "fire" && !inPredictionStep) {
      setActiveStep(0);
    }
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setActiveIcon("bell");
    setIsModalVisible(true);
  };

  const getCurrentStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <CountryStep onNext={handleNext} />;
      case 1:
        return (
          <StateStep
            country={selectedData.country!}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <WildfireStep
            country={selectedData.country!}
            state={selectedData.state!}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <PredictionStep
            country={selectedData.country!}
            state={selectedData.state!}
            wildfire={selectedData.wildfire!}
            onBack={handleBack}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  const getCurrentModalComponent = () => {
    switch (activeIcon) {
      case "bell":
        return <AlertsModal alert={selectedAlert} />; // Pasar la alerta seleccionada
      case "layer":
        return <LayersModal />;
      case "gear":
        return <SettingsModal />;
      default:
        return getCurrentStepComponent();
    }
  };

  const toggleModalVisibility = () => setIsModalVisible(!isModalVisible);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.barraLateral}>
          <FontAwesomeIcon
            icon={faFire}
            className={`${styles.icon} ${
              activeIcon === "fire" && isModalVisible ? styles.active : ""
            }`}
            onClick={() => handleIconClick("fire")}
          />
          <FontAwesomeIcon
            icon={faBell}
            className={`${styles.icon} ${
              activeIcon === "bell" && isModalVisible ? styles.active : ""
            }`}
            onClick={() => handleIconClick("bell")}
          />
          <FontAwesomeIcon
            icon={faLayerGroup}
            className={`${styles.icon} ${
              activeIcon === "layer" && isModalVisible ? styles.active : ""
            }`}
            onClick={() => handleIconClick("layer")}
          />
          <FontAwesomeIcon
            icon={faGear}
            className={`${styles.icon} ${
              activeIcon === "gear" && isModalVisible ? styles.active : ""
            }`}
            onClick={() => handleIconClick("gear")}
          />
        </div>
        {isModalVisible && (
          <div className={styles.menu}>{getCurrentModalComponent()}</div>
        )}
      </div>
      <div className={styles.cerradura} onClick={toggleModalVisibility}></div>
      <div className={styles.flex}></div>
      {map && <EmergencyAlerts map={map} onAlertClick={handleAlertClick} />}
    </div>
  );
};

export default NavBar;
