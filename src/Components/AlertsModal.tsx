import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";
import {Alert, Receiver} from "~/utils/receivers";

interface AlertsModalProps {
  selectedIcons: IconDefinition[];
  handleIconClick: (icon: IconDefinition) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedReceiver: Receiver | null
}


const AlertsModal = ({
  selectedIcons,
  handleIconClick,
  isOpen,
  setIsOpen,
  selectedReceiver
}: AlertsModalProps): JSX.Element | null => {

  if (!selectedIcons.includes(faCalendar) || !isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    handleIconClick(faCalendar);
  };

  return (
    <Draggable>
      <div className="absolute top-20 flex h-[30rem] w-[24rem] flex-col bg-gray-800 text-white">
        <div className="m-[0.4rem] flex h-[1.5rem] justify-between">
          <span>Alerts Sent</span>
          <button onClick={handleClose}>
            <FontAwesomeIcon
              icon={faCalendar}
              className="h-[1rem] w-[1rem] text-gray-400"
              size="3x"
            />
          </button>
        </div>
        <div className="flex w-full flex-grow flex-col border-2 border-gray-400 p-[1.2rem] scrollbar scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-200 overflow-y-scroll">
          {selectedReceiver?.alerts.map((alert: Alert, index: number) => (
            <div key={index} className="mb-4 p-2 bg-gray-700 rounded-md">
              <p>{alert.message}</p>
              <p className="text-xs text-gray-500">{`Sent at: ${new Date(alert.sentAt).toLocaleString()}`}</p>
              <p className="text-xs text-gray-500">{`Received at: ${new Date(alert.receivedAt).toLocaleString()}`}</p>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );

};

export default AlertsModal;
