import React from "react";
import Navbar from "../pages/Landing/navbar";
import Page from "../pages/Landing/page";

interface StartPageProps {
  onLogin: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onLogin }) => {
  return (
    <div className="bg-background text-foreground min-h-screen max-w-full overflow-x-hidden antialiased">
      <div className="flex w-full flex-col items-center">
        <Navbar />
        <Page />
      </div>
    </div>
  );
};

export default StartPage;
