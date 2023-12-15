import React from 'react'
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendar, faCloudSun, faFire, faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useCallback, useEffect, useState} from "react";
import RiskForecastModal from './RiskForecastModal';
import PredictionModal from "./PredictionModal";
import AlertsModal from "~/Components/AlertsModal";
import type {Receiver} from "~/utils/receivers";

const NavBar = ({selectedReceiver}:{selectedReceiver: Receiver | null}) => {
  const [selectedIcons, setSelectedIcons] = useState<IconDefinition[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = useCallback((icon: IconDefinition) => {
    setSelectedIcons(prevIcons => {
      if (prevIcons.includes(icon)) {
        return prevIcons.filter(i => i !== icon);
      } else {
        setIsOpen(true);
        return [...prevIcons, icon];
      }
    });
  }, [setSelectedIcons]);


  const renderIcon = useCallback((icon: IconDefinition) => (
    <button onClick={() => handleIconClick(icon)}>
      <FontAwesomeIcon
        icon={icon}
        className={`h-[1.4rem] w-[1.4rem] ${selectedIcons.includes(icon) ? 'text-blue-500' : 'text-gray-400'}`}
      />
    </button>
  ), [handleIconClick, selectedIcons]);

  const renderModal = useCallback((key: string):JSX.Element => {
    switch (key) {
      case 'cloud':
        return (<RiskForecastModal selectedIcons={selectedIcons} handleIconClick={handleIconClick} isOpen={isOpen} setIsOpen={setIsOpen} />);
      case 'fire':
        return (<PredictionModal selectedIcons={selectedIcons} handleIconClick={handleIconClick} isOpen={isOpen} setIsOpen={setIsOpen}/>);
      case 'alert':
        return (<AlertsModal selectedIcons={selectedIcons} selectedReceiver={selectedReceiver} handleIconClick={handleIconClick} isOpen={isOpen} setIsOpen={setIsOpen}/>);
      default:
        return <></>;
    }
  }, [handleIconClick, isOpen, selectedIcons, selectedReceiver]);

  useEffect(() => {
    // Make sure alerts are shown when receiver is selected
    if(!selectedReceiver) return
    setIsOpen(true)
    setSelectedIcons((selectedIcons) => {
      return selectedIcons.includes(faCalendar) ? selectedIcons : [...selectedIcons, faCalendar]
    })
  }, [selectedReceiver])


  return (
    <div className="fixed left-6 top-6 bg-[#222] flex flex-col h-[4.5rem] w-[18rem] border-2 border-gray-400">
      <div className="flex w-full">
        <div className="p-[0.3rem] border-r-2 border-b-2 border-gray-400">
          {renderIcon(faCloudSun)}
          {renderModal('cloud')}
        </div>
        <div className="flex flex-row flex-grow justify-evenly border-b-2 border-gray-400">
          {renderIcon(faCalendar)}
          {renderModal('alert')}
          {renderIcon(faLayerGroup)}
          {renderModal('cloud')}
          {renderIcon(faFire)}
          {renderModal('fire')}
          {renderIcon(faGear)}
          {renderModal('gear')}
        </div>
      </div>
      <div className="flex">

      </div>
    </div>
  );
};

export default NavBar;
