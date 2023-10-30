import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFire, faLocationDot, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
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
          <span className="text-white">Prediction Modal</span>
          <button onClick={handleClose}>
            <FontAwesomeIcon
              icon={faTimes}
              className="h-[1rem] w-[1rem] text-gray-400"
              size="3x" // Increase the size of the 'x' icon
            />
          </button>
        </div>
        <div
            className={`flex w-full cursor-pointer pb-[1rem] pl-[1rem] pr-[1rem] pt-[1rem] text-white items-center`}
            onClick={() => null}
          >
            <div className="flex flex-col">
            <span className="ml-[0.8rem] text-base text-white">ICP Julian 10-15</span>
            <span className="ml-[0.8rem] text-sm text-gray-400">10/22/</span>
            </div>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="h-[1.6rem] w-[1.6rem] text-gray-400"
            />
            <FontAwesomeIcon
              icon={faLocationDot}
              className="h-[1.6rem] w-[1.6rem] text-gray-400"
            />
          </div>
      </div>
    </Draggable>
  );
};

export default PredictionModal;
