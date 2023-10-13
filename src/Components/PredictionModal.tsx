import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFire, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";

interface PredictionModalProps {
  selectedIcons: IconDefinition[];
  handleIconClick: (icon: IconDefinition) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PredictionModal = ({
  selectedIcons,
  handleIconClick,
  isOpen,
  setIsOpen,
}: PredictionModalProps): JSX.Element | null => {

  if (!selectedIcons.includes(faFire) || !isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    handleIconClick(faFire);
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
        <div className="flex w-full flex-grow flex-col border-2 border-gray-400 p-[1.2rem]"></div>
      </div>
    </Draggable>
  );

};

export default PredictionModal;