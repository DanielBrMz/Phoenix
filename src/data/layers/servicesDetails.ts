import firefighter from "../../assets/emergencyIcons/bombero.png";
import hospital from "../../assets/emergencyIcons/hospital.png";
import police from "../../assets/emergencyIcons/policia.png";
import electricityPole from "../../assets/infrastructureIcons/torre.png";
import industria from "../../assets/infrastructureIcons/industria.png";
import gasolinera from "../../assets/infrastructureIcons/gas.png";
import plantaEnergia from "../../assets/infrastructureIcons/planta-de-energia.png";
import hotel from "../../assets/humanHabitationIcons/hotel.png";
import colegio from "../../assets/humanHabitationIcons/colegio.png";
import agricultura from "../../assets/enviromentalIcons/agricultura.png";
import mina from "../../assets/enviromentalIcons/mina.png";
import type { Category } from "../../types/layerInterfaces";

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
      // {
      //   name: "Coast Guard",
      //   icon: hospital,
      //   instances: [],
      // },
      // {
      //   name: "Civil Protection",
      //   icon: hospital,
      //   instances: [],
      // },
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
        icon: industria,
        instances: [
          { id: "i1", coordinates: [-110.912, 31.28] },
          { id: "i2", coordinates: [-110.91, 31.281] },
        ],
      },
      {
        name: "Gas Stations",
        icon: gasolinera,
        instances: [
          { id: "g1", coordinates: [-110.914, 31.272] },
          { id: "g2", coordinates: [-110.916, 31.278] },
        ],
      },
      {
        name: "Power Plants",
        icon: plantaEnergia,
        instances: [{ id: "p1", coordinates: [-110.886, 31.265] }],
      },
    ],
  },
  {
    type: "Human Habitation",
    services: [
      {
        name: "Hotels",
        icon: hotel,
        instances: [
          { id: "h1", coordinates: [-110.918, 31.267] },
          { id: "h2", coordinates: [-110.899, 31.28] },
        ],
      },
      {
        name: "Schools",
        icon: colegio,
        instances: [{ id: "s1", coordinates: [-110.911, 31.262] }],
      },
    ],
  },
  {
    type: "Environmental & Resources",
    services: [
      {
        name: "Protected Areas",
        icon: electricityPole,
        instances: [],
      },
      {
        name: "Agricultural facilities & farms",
        icon: agricultura,
        instances: [
          { id: "a1", coordinates: [-110.893, 31.27] },
          { id: "a2", coordinates: [-110.899, 31.278] },
        ],
      },
      {
        name: "Mine",
        icon: mina,
        instances: [{ id: "m1", coordinates: [-110.895, 31.254] }],
      },
      {
        name: "Historical buildings",
        icon: electricityPole,
        instances: [],
      },
    ],
  },
  // {
  //   type: "Monitoring & Surveillance",
  //   services: [
  //     {
  //       name: "Cameras",
  //       icon: electricityPole,
  //       instances: [],
  //     },
  //     {
  //       name: "Drones",
  //       icon: electricityPole,
  //       instances: [],
  //     },
  //   ],
  // },
];
