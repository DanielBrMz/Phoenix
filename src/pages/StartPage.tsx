import React from "react";
import backgroundImage from "../assets/StartBackground.png";
import styles from "../styles/StartPageStyles/StartPageStyles";
import Image from "next/image";
import PhoenixEyeLogo from "../assets/phoenixeyelogo.png";

interface StartPageProps {
  onLogin: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onLogin }) => {
  return (
    <div
      style={{
        ...styles.startPageContainer,
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      <header style={styles.startPageHeader}>
        <div style={styles.leftStartPageHeader}>
          <Image
            src={PhoenixEyeLogo}
            alt="Phoenix Eye Logo"
            width={50}
            height={50}
          />
          <h1 style={styles.startPageTitleHeader}>Phoenix Eye</h1>
        </div>

        <nav style={styles.rightStartPageHeader}>
          <a href="https://phoenix-eye-website.vercel.app/">HOME</a>
          <a href="https://phoenix-eye-website.vercel.app/">ABOUT</a>
          <a href="https://phoenix-eye-website.vercel.app/">CONTACT</a>
        </nav>
      </header>
      <div style={styles.startPageIntro}>
        <h1 style={styles.startPageWelcome}>Welcome</h1>
        <h2 style={styles.startPageRising}>
          Rising Above Wildfires Through Prediction
        </h2>
        <button onClick={onLogin} style={styles.startPageButton}>
          PREDICT WILDFIRES
        </button>
      </div>
    </div>
  );
};

export default StartPage;
