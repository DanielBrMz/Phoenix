import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBars, faCalendar, faCloudSun, faFire, faGear, faLayerGroup, faTree, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Draggable from 'react-draggable';

const NavBar = () => {
  const [selectedIcons, setSelectedIcons] = useState<IconDefinition[]>([]);

  const handleIconClick = (icon: IconDefinition) => {
    setSelectedIcons(prevIcons => {
      if (prevIcons.includes(icon)) {
        return prevIcons.filter(i => i !== icon);
      } else {
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

  const renderModal = (icon: IconDefinition) => (
    selectedIcons.includes(icon) && (
      <Draggable>
        <div className="absolute bg-black p-4 top-20  w-[20rem] h-[30rem]">
          <button onClick={() => handleIconClick(icon)}>
            <FontAwesomeIcon
              icon={faTimes}
              className="text-white"
              size="3x"  // Increase the size of the 'x' icon
            />
          </button>
        </div>
      </Draggable>
    )
  );
  

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
