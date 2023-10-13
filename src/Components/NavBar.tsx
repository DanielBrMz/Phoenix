import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendar, faCloudSun, faFire, faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import RiskForecastModal from './RiskForecastModal'; 
import PredictionModal from "./PredictionModal";

const NavBar = () => {
  const [selectedIcons, setSelectedIcons] = useState<IconDefinition[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = (icon: IconDefinition) => {
    setSelectedIcons(prevIcons => {
      if (prevIcons.includes(icon)) {
        return prevIcons.filter(i => i !== icon);
      } else {
        setIsOpen(true);
        return [...prevIcons, icon];
      }
    });
  };
  

  const renderIcon = (icon: IconDefinition) => (
    <button onClick={() => handleIconClick(icon)}>
      <FontAwesomeIcon
        icon={icon}
        className={`h-[1.4rem] w-[1.4rem] ${selectedIcons.includes(icon) ? 'text-blue-500' : 'text-gray-400'}`}
      />
    </button>
  );

  const renderModal = (icon: IconDefinition):JSX.Element => {
    switch (icon) {
      case faCloudSun:
        return (<RiskForecastModal selectedIcons={selectedIcons} handleIconClick={handleIconClick} isOpen={isOpen} setIsOpen={setIsOpen} />);
      case faFire:
        return (<PredictionModal selectedIcons={selectedIcons} handleIconClick={handleIconClick} isOpen={isOpen} setIsOpen={setIsOpen}/>);
      default:
        return <></>;
    }
  };
  

  return (
    <div className="fixed left-6 top-6 bg-[#222] flex flex-col h-[4.5rem] w-[18rem] border-2 border-gray-400">
      <div className="flex w-full">
        <div className="p-[0.3rem] border-r-2 border-b-2 border-gray-400">
          {renderIcon(faCloudSun)}
          {renderModal(faCloudSun)}
        </div>
        <div className="flex flex-row flex-grow justify-evenly border-b-2 border-gray-400">
          {renderIcon(faCalendar)}
          {renderModal(faCalendar)}
          {renderIcon(faLayerGroup)}
          {renderModal(faLayerGroup)}
          {renderIcon(faFire)}
          {renderModal(faFire)}
          {renderIcon(faGear)}
          {renderModal(faGear)}
        </div>
      </div>
      <div className="flex">

      </div>
    </div> 
  );
};

export default NavBar;
