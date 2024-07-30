import firefighter from "../../assets/emergencyIcons/bombero.png";
import hospital from "../../assets/emergencyIcons/hospital.png";
import police from "../../assets/emergencyIcons/policia.png";
import electricityPole from "../../assets/infrastructureIcons/torre.png";

export const servicesDetails = [
  {
    type: "Emergency Services",
    services: [
      {
        name: "hospital",
        icon: hospital,
        instances: [
          { id: "e1", coordinates: [-110.894, 31.283] },
          { id: "e2", coordinates: [-110.905, 31.2655] },
        ],
      },
      {
        name: "firefighter",
        icon: firefighter,
        instances: [
          { id: "e3", coordinates: [-110.882, 31.275] },
          { id: "e4", coordinates: [-110.905, 31.278] },
        ],
      },
      {
        name: "police",
        icon: police,
        instances: [
          { id: "e5", coordinates: [-110.911, 31.275] },
          { id: "e6", coordinates: [-110.888, 31.28] },
        ],
      },
    ],
  },
  {
    type: "Infrastructure",
    services: [
      {
        name: "electricity_pole",
        icon: electricityPole,
        instances: [
          { id: "i1", coordinates: [-110.908, 31.261] },
          { id: "i2", coordinates: [-110.898, 31.263] },
          { id: "i3", coordinates: [-110.89, 31.272] },
          { id: "i4", coordinates: [-110.9045, 31.2675] },
          { id: "i5", coordinates: [-110.9005, 31.273] },
          { id: "i6", coordinates: [-110.892, 31.266] },
        ],
      },
    ],
  },
];
