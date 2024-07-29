import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar,
  faCloudSun,
  faFire,
  faGear,
  faLayerGroup,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import RiskForecastModal from "./RiskForecastModal";
import PredictionModal from "./PredictionModal";
import AlertsModal from "~/Components/AlertsModal";
import type { Receiver } from "~/utils/receivers";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="barraLateral">
          <FontAwesomeIcon icon={faFire} className="icon" />
          <FontAwesomeIcon icon={faBell} className="icon" />
          <FontAwesomeIcon icon={faLayerGroup} className="icon" />
          <FontAwesomeIcon icon={faGear} className="icon" />
        </div>
        <div className="menu">Menu</div>
      </div>

      <div className="flex"></div>
    </div>
  );
};

export default NavBar;
