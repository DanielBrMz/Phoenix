import { StaticImageData } from "next/image";
import firefighter from "../../assets/emergencyIcons/bombero.png";
import hospital from "../../assets/emergencyIcons/hospital.png";
import police from "../../assets/emergencyIcons/policia.png";
import electricityPole from "../../assets/infrastructureIcons/torre.png";
import { Category } from "../../types/layerInterfaces";

export const servicesDetails: Category[] = [
  {
    type: "Observation Data",
    services: [
      {
        name: "VIIRS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "MODIS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Live satellite (GOES-16)",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Fire history",
        icon: electricityPole,
        instances: [],
      },
    ],
  },
  {
    type: "Emergency Services",
    services: [
      {
        name: "Hospitals",
        icon: hospital,
        instances: [
          { id: "e1", coordinates: [-110.894, 31.283] },
          { id: "e2", coordinates: [-110.905, 31.2655] },
        ],
      },
      {
        name: "Firefighters",
        icon: firefighter,
        instances: [
          { id: "e3", coordinates: [-110.882, 31.275] },
          { id: "e4", coordinates: [-110.905, 31.278] },
        ],
      },
      {
        name: "Coast Guard",
        icon: hospital,
        instances: [],
      },
      {
        name: "Civil Protection",
        icon: hospital,
        instances: [],
      },
      {
        name: "Police Stations",
        icon: police,
        instances: [
          { id: "e5", coordinates: [-110.911, 31.275] },
          { id: "e6", coordinates: [-110.888, 31.28] },
        ],
      },
    ],
  },
  {
    type: "Infrastructure & Services",
    services: [
      {
        name: "Electricity Poles",
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
      {
        name: "Industrial Complexes",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Gas Stations",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Power Plants",
        icon: electricityPole,
        instances: [],
      },
    ],
  },
  {
    type: "Human Habitation",
    services: [
      {
        name: "VIIRS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "MODIS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Live satellite (GOES-16)",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Fire history",
        icon: electricityPole,
        instances: [],
      },
    ],
  },
  {
    type: "Environmental & Resources",
    services: [
      {
        name: "VIIRS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "MODIS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Live satellite (GOES-16)",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Fire history",
        icon: electricityPole,
        instances: [],
      },
    ],
  },
  {
    type: "Monitoring & Surveillance",
    services: [
      {
        name: "VIIRS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "MODIS hotspots",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Live satellite (GOES-16)",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Fire history",
        icon: electricityPole,
        instances: [],
      },
    ],
  },
];
