import React, { useState } from "react";
import styles from "~/styles/PopUp/PopUp.module.css";
interface PopUpProps {
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <div className={styles.popUpOuterContainer}>
      <div className={styles.popUpContainer}>
        {page === 1 && (
          <div className={styles.popUpInnerContainer}>
            <h2 className={styles.popUpHeader}>
              Discover our advanced
              <span className={styles.firstHeaderSpan}> fire prediction</span>
            </h2>

            <img src="FirstGIF.gif" alt="Pop Up 1 GIF" className={styles.gif} />

            <p className={styles.descriptionText}>
              Learn how our advanced machine learning models analyze real-time
              data to predict wildfires. Get a clear view of potential risk
              areas.
            </p>
            <button className={styles.buttonNext} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
        {page === 2 && (
          <div className={styles.popUpInnerContainer}>
            <h2 className={styles.popUpHeader}>
              Stay <span className={styles.secondHeaderSpan}>Alert</span> with
              Our Device!
            </h2>
            <img src="FirstGIF.gif" alt="Pop Up 1 GIF" className={styles.gif} />
            <p className={styles.descriptionText}>
              Meet our EMERGENCY RESPONSE DEVICE. Receive instant alerts about
              nearby fires, including an accurate estimated arrival time. Act
              quickly and safely!
            </p>
            <div className={styles.buttonsContainer}>
              <button className={styles.buttonBack} onClick={prevPage}>
                Back
              </button>
              <button className={styles.buttonNext} onClick={nextPage}>
                Next
              </button>
            </div>
          </div>
        )}
        {page === 3 && (
          <div className={styles.popUpInnerContainer}>
            <h2 className={styles.popUpHeader}>
              <span className={styles.thirdHeaderSpan}>Plan </span> ahead, stay
              <span className={styles.thirdHeaderSpan}> prepared</span>
            </h2>
            <img src="FirstGIF.gif" alt="Pop Up 1 GIF" className={styles.gif} />
            <p className={styles.descriptionText}>
              Visualize the location of hospitals, schools, and other points of
              interest on an interactive map. Plan evacuation routes and
              coordinate emergency actions effectively.
            </p>
            <div className={styles.buttonsContainer}>
              <button className={styles.buttonBack} onClick={prevPage}>
                Back
              </button>
              <button className={styles.buttonClose} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;
