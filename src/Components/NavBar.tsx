import React, { useState } from "react";
import {
  faFire,
  faGear,
  faLayerGroup,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertsModal from "~/pages/MenuPages/AlertsModal";
import LayersModal from "~/pages/MenuPages/LayersModal";
import SettingsModal from "~/pages/MenuPages/SettingsModal";
import PredictionModal from "~/pages/MenuPages/PredictionModal";

const NavBar = () => {
  const [activeComponent, setActiveComponent] = useState<JSX.Element | null>(
    null,
  );
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleIconClick = (component: JSX.Element, icon: string) => {
    setActiveComponent(component);
    setActiveIcon(icon);
    setIsModalVisible(true);
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
            className={`icon ${activeIcon === "fire" ? "active" : ""}`}
            onClick={() => handleIconClick(<PredictionModal />, "fire")}
          />
          <FontAwesomeIcon
            icon={faBell}
            className={`icon ${activeIcon === "bell" ? "active" : ""}`}
            onClick={() => handleIconClick(<AlertsModal />, "bell")}
          />
          <FontAwesomeIcon
            icon={faLayerGroup}
            className={`icon ${activeIcon === "layer" ? "active" : ""}`}
            onClick={() => handleIconClick(<LayersModal />, "layer")}
          />
          <FontAwesomeIcon
            icon={faGear}
            className={`icon ${activeIcon === "gear" ? "active" : ""}`}
            onClick={() => handleIconClick(<SettingsModal />, "gear")}
          />
        </div>
        {isModalVisible && <div className="menu">{activeComponent}</div>}
      </div>
      <div className="cerradura" onClick={toggleModalVisibility}></div>
      <div className="flex"></div>
    </div>
  );
};

export default NavBar;
