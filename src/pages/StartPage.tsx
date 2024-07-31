import React from "react";
import backgroundImage from "../assets/StartBackground.png";
import styles from "../styles/StartPageStyles/startPage.module.css";
import Image from "next/image";
import PhoenixEyeLogo from "../assets/phoenixeyelogo.png";

interface StartPageProps {
  onLogin: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onLogin }) => {
  return (
    <div
      className={styles.startPageContainer}
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <header className={styles.startPageHeader}>
        <div className={styles.leftStartPageHeader}>
          <Image
            src={PhoenixEyeLogo}
            alt="Phoenix Eye Logo"
            width={50}
            height={50}
          />
          <h1 className={styles.startPageTitleHeader}>Phoenix Eye</h1>
        </div>

        <nav className={styles.rightStartPageHeader}>
          <a href="https://phoenix-eye-website.vercel.app/">HOME</a>
          <a href="https://phoenix-eye-website.vercel.app/">ABOUT</a>
          <a href="https://phoenix-eye-website.vercel.app/">CONTACT</a>
        </nav>
      </header>
      <div className={styles.startPageIntro}>
        <h1 className={styles.startPageWelcome}>Welcome</h1>
        <h2 className={styles.startPageRising}>
          Rising Above Wildfires Through Prediction
        </h2>
        <button onClick={onLogin} className={styles.startPageButton}>
          PREDICT WILDFIRES
        </button>
      </div>
    </div>
  );
};

export default StartPage;
