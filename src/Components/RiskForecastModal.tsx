import { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCloudSun,
  faTimes,
  faCaretDown,
  faCaretUp,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";

interface RiskForecastModalProps {
  selectedIcons: IconDefinition[];
  handleIconClick: (icon: IconDefinition) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const RiskForecastModal = ({
  selectedIcons,
  handleIconClick,
  isOpen,
  setIsOpen,
}: RiskForecastModalProps): JSX.Element | null => {
  if (!selectedIcons.includes(faCloudSun) || !isOpen) return null;

  const [isOpenDropdown1, setIsOpenDropdown1] = useState(false);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    handleIconClick(faCloudSun);
  };

  return (
    <Draggable>
      <div className="absolute top-20 flex h-[30rem] w-[24rem] flex-col bg-[#2c2a2c]">
        <div className="m-[0.4rem] flex h-[1.5rem] justify-between">
          <span className="text-white"> View Risk Forecast</span>
          <button onClick={handleClose}>
            <FontAwesomeIcon
              icon={faTimes}
              className="h-[1rem] w-[1rem] text-gray-400"
              size="3x" // Increase the size of the 'x' icon
            />
          </button>
        </div>
        <div className="flex w-full flex-grow flex-col border-2 border-gray-400 p-[1.2rem]">
        <div
            className={`flex w-full pt-[1rem] pb-[1rem] pl-[1rem] pr-[1rem] text-white cursor-pointer ${
              isOpenDropdown1 && "bg-[#777]"
            }`}
            onClick={() => setIsOpenDropdown1(!isOpenDropdown1)}
          >
            <FontAwesomeIcon
              icon={(isOpenDropdown1 && faCaretDown) || faCaretRight}
              className="h-[1rem] w-[1rem] text-gray-400"
            />
            <span className="ml-[0.8rem] text-white">
              Weather Forecast
            </span>
          </div>
          <div
            className={`flex w-full p-[1rem] text-white cursor-pointer ${
              isOpenDropdown2 && "bg-[#777]"
            }`}
            onClick={() => setIsOpenDropdown2(!isOpenDropdown2)}
          >
            <FontAwesomeIcon
              icon={(isOpenDropdown2 && faCaretDown) || faCaretRight}
              className="h-[1rem] w-[1rem] text-gray-400"
            />
            <span className="ml-[0.8rem] text-white">
              Territory Wildifre Risk Forecast
            </span>
          </div>
          <div className="flex flex-row justify-between w-full h-[6rem] p-[1.2rem] pt-[0.2rem]">
            <div className="flex flex-col w-1/2">
              <span className="text-gray-200 mb-[0.5rem]">Metric</span>
              <select className="text-white bg-transparent border-white border-2 mr-[0.25rem] p-[0.25rem]">
                <option value="">None</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <span className="text-gray-200 mb-[0.5rem]">Unit</span>
              <select className="text-white bg-transparent border-white border-2 ml-[0.25rem] p-[0.25rem]">
                <option value="">Raw</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full p-[1.2rem] pt-[0rem]">
            <span className="text-white">Transparency</span>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default RiskForecastModal;
