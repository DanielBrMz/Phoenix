import firefighter from "../assets/emergencyIcons/bombero.png";
import hospital from "../assets/emergencyIcons/hospital.png";
import police from "../assets/emergencyIcons/policia.png";
import electricityPole from "../assets/infrastructureIcons/torre.png";

interface EmergencyServices {
  type: string;
  services: string[];
}

interface Infrastructure {
  type: string;
  services: string[];
}

export const emergencyServicesList: EmergencyServices = {
  type: "Emergency Services",
  services: [
    "Hospitals",
    "Firefighters",
    "Coast Guard",
    "Civil Protection",
    "Police",
  ],
};

export const infrastructureList: Infrastructure = {
  type: "Infrastructure",
  services: ["Electricity Poles", "Gas Stations", "Telephone Poles"],
};
