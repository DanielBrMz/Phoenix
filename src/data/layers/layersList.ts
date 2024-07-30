interface EmergencyServices {
  type: string;
  services: string[];
}

interface Infrastructure {
  type: string;
  services: string[];
}

export const emergencyServicesList: EmergencyServices = {
  type: "EMERGENCY SERVICES",
  services: [
    "Hospitals",
    "Firefighters",
    "Coast Guard",
    "Civil Protection",
    "Police",
  ],
};

export const infrastructureList: Infrastructure = {
  type: "INFRASTRUCTURE & SERVICES",
  services: ["Electricity Poles", "Gas Stations", "Telephone Poles"],
};
