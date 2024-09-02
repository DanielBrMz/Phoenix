import React from "react";
import Navbar from "../pages/Landing/navbar";
import Page from "../pages/Landing/page";
import Footer from "../pages/Landing/footer";

interface StartPageProps {
  onLogin: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-slate-950 text-white antialiased">
      <div className="flex w-full flex-col items-center">
        <Navbar />
        <Page />
        <Footer />
      </div>
    </div>
  );
};

export default StartPage;
