import React, { useState } from "react";
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

const NavBar = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<{
    country?: string;
    state?: string;
    wildfire?: string;
  }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleNext = (data: string) => {
    setSelectedData((prev) => {
      if (activeStep === 0) return { country: data };
      if (activeStep === 1) return { ...prev, state: data };
      if (activeStep === 2) return { ...prev, wildfire: data };
      return prev;
    });
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setSelectedData({});
    setActiveStep(0);
  };

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    setIsModalVisible(true);
    if (icon === "fire") {
      setActiveStep(0);
    }
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
        return <AlertsModal />;
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
    <div className="navbar">
      <div className="navbarContainer">
        <div className="barraLateral">
          <FontAwesomeIcon
            icon={faFire}
            className={`icon ${
              activeIcon === "fire" && isModalVisible ? "active" : ""
            }`}
            onClick={() => handleIconClick("fire")}
          />
          <FontAwesomeIcon
            icon={faBell}
            className={`icon ${
              activeIcon === "bell" && isModalVisible ? "active" : ""
            }`}
            onClick={() => handleIconClick("bell")}
          />
          <FontAwesomeIcon
            icon={faLayerGroup}
            className={`icon ${
              activeIcon === "layer" && isModalVisible ? "active" : ""
            }`}
            onClick={() => handleIconClick("layer")}
          />
          <FontAwesomeIcon
            icon={faGear}
            className={`icon ${
              activeIcon === "gear" && isModalVisible ? "active" : ""
            }`}
            onClick={() => handleIconClick("gear")}
          />
        </div>
        {isModalVisible && (
          <div className="menu">{getCurrentModalComponent()}</div>
        )}
      </div>
      <div className="cerradura" onClick={toggleModalVisibility}></div>
      <div className="flex"></div>
    </div>
  );
};

export default NavBar;
