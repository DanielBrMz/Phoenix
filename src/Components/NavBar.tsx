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

const NavBar = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<{
    country?: string;
    state?: string;
    wildfire?: string;
  }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleNext = (data: string) => {
    if (activeStep === 0) {
      setSelectedData({ country: data });
    } else if (activeStep === 1) {
      setSelectedData((prev) => ({ ...prev, state: data }));
    } else if (activeStep === 2) {
      setSelectedData((prev) => ({ ...prev, wildfire: data }));
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
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
          />
        );
      default:
        return null;
    }
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="barraLateral">
          <FontAwesomeIcon
            icon={faFire}
            className={`icon ${isModalVisible ? "active" : ""}`}
            onClick={toggleModalVisibility}
          />
          <FontAwesomeIcon
            icon={faBell}
            className={`icon ${isModalVisible ? "active" : ""}`}
            onClick={toggleModalVisibility}
          />
          <FontAwesomeIcon
            icon={faLayerGroup}
            className={`icon ${isModalVisible ? "active" : ""}`}
            onClick={toggleModalVisibility}
          />
          <FontAwesomeIcon
            icon={faGear}
            className={`icon ${isModalVisible ? "active" : ""}`}
            onClick={toggleModalVisibility}
          />
        </div>
        {isModalVisible && (
          <div className="menu">{getCurrentStepComponent()}</div>
        )}
      </div>
      <div className="cerradura" onClick={toggleModalVisibility}></div>
      <div className="flex"></div>
    </div>
  );
};

export default NavBar;
