import { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCloudSun,
  faTimes,
  faCaretDown,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";
import Slider from "react-input-slider";

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
  const [isOpenDropdown1, setIsOpenDropdown1] = useState(false);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);
  const [isOpenDropdown3, setIsOpenDropdown3] = useState(false);
  const [transparency, setTransparency] = useState(0);
  
  if (!selectedIcons.includes(faCloudSun) || !isOpen) return null;
  
  const colors = [
    "#009352",
    "#00c163",
    "#8ade63",
    "#d3f580",
    "#ffe67d",
    "#ffb24a",
    "#ff6600",
    "#ff0000",
  ];

  const colorLabels = ["1", "10", "100", "0.5k", "1k", "3k", "5k", "10k"];

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
              size="3x" 
            />
          </button>
        </div>
        <div className="flex w-full flex-grow flex-col border-2 border-gray-400 p-[1.2rem]">
          <div
            className={`flex w-full cursor-pointer pb-[1rem] pl-[1rem] pr-[1rem] pt-[1rem] text-white ${
              isOpenDropdown1 && "bg-[#777]"
            }`}
            onClick={() => (setIsOpenDropdown1(!isOpenDropdown1), setIsOpenDropdown2(false), setIsOpenDropdown3(false))}
          >
            <FontAwesomeIcon
              icon={(isOpenDropdown1 && faCaretDown) || faCaretRight}
              className="h-[1rem] w-[1rem] text-gray-400"
            />
            <span className="ml-[0.8rem] text-white">Weather Forecast</span>
          </div>
          <div
            className={`flex w-full cursor-pointer p-[1rem] text-white ${
              isOpenDropdown2 && "bg-[#777]"
            }`}
            onClick={() => (setIsOpenDropdown1(false), setIsOpenDropdown2(!isOpenDropdown2), setIsOpenDropdown3(false))}
          >
            <FontAwesomeIcon
              icon={(isOpenDropdown2 && faCaretDown) || faCaretRight}
              className="h-[1rem] w-[1rem] text-gray-400"
            />
            <span className="ml-[0.8rem] text-white">
              Territory Wildifre Risk Forecast
            </span>
          </div>
          <div className="flex h-[6rem] w-full flex-row justify-between p-[1.2rem] pt-[0.2rem]">
            <div className="flex w-1/2 flex-col">
              <span className="mb-[0.5rem] text-gray-200">Metric</span>
              <select className="mr-[0.25rem] border-2 border-white bg-transparent p-[0.25rem] text-white">
                <option value="">None</option>
                <option value="">Fire Size Potential</option>
                <option value="">Conditional Impact</option>
              </select>
            </div>
            <div className="flex w-1/2 flex-col">
              <span className="mb-[0.5rem] text-gray-200">Unit</span>
              <select className="ml-[0.25rem] border-2 border-white bg-transparent p-[0.25rem] text-white">
                <option value="">Raw</option>
              </select>
            </div>
          </div>
          <div className="flex w-full flex-col p-[1.2rem] pt-[0rem]">
            <span className="text-white">Transparency</span>
            <Slider
              axis="x"
              x={transparency}
              xmax={80}
              xmin={0}
              onChange={({ x }) => setTransparency(x)}
              xstep={10}
              styles={{
                track: {
                  backgroundColor: "#ddd",
                  height: "0.4rem",
                  width: "100%",
                  marginBottom: "1.6rem",
                },
                active: {
                  backgroundColor: transparency > 9 ? colors[Math.floor((transparency - 10) / 10)] : colors[0],
                  height: "0.4rem",
                },
                thumb: {
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#0084ff",
                },
              }}
            />
            <div className="flex flex-row items-center justify-between space-x-2">
              {colors.map((color, index) => (
                <div className="flex flex-col items-center" key={index}>
                  <div
                    className="h-2 w-5"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-xs text-white">
                    {colorLabels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`flex w-full cursor-pointer p-[1rem] text-white ${
              isOpenDropdown3 && "bg-[#777]"
            }`}
            onClick={() => setIsOpenDropdown3(!isOpenDropdown3)}
          >
            <FontAwesomeIcon
              icon={(isOpenDropdown3 && faCaretDown) || faCaretRight}
              className="h-[1rem] w-[1rem] text-gray-400"
            />
            <span className="ml-[0.8rem] text-white">
              Asset Wildifre Risk Forecast
            </span>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default RiskForecastModal;
