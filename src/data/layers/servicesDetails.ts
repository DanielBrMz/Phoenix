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
import modisIcon from "../../assets/observationIcons/modis.png";
import viirsIcon from "../../assets/observationIcons/viirs.png";
import type { Category } from "../../types/layerInterfaces";
import hotspots from "./hotspots.json";

// Define a type for the instances
interface HotspotInstance {
  id: string;
  coordinates: [number, number];
}

export const servicesDetails: Category[] = [
  {
    type: "Observation Data",
    services: [
      {
        name: "VIIRS hotspots",
        icon: viirsIcon,
        instances: [],
      },
      {
        name: "MODIS hotspots",
        icon: modisIcon,
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
          { id: "e3", coordinates: [-121.912, 40.333] }, // South-east
        ],
      },
      {
        name: "Firefighters",
        icon: firefighter,
        instances: [
          { id: "f1", coordinates: [-110.882, 31.275] },
          { id: "f2", coordinates: [-110.905, 31.278] },
          { id: "f3", coordinates: [-121.925, 40.332] },
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
          { id: "i7", coordinates: [-121.9337, 40.3266] },
          { id: "i8", coordinates: [-121.9342, 40.3266] },
          { id: "i9", coordinates: [-121.9337, 40.339] },
          { id: "i10", coordinates: [-121.9342, 40.339] },
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
          { id: "g3", coordinates: [-121.916, 40.336] },
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
        instances: [
          { id: "s1", coordinates: [-110.911, 31.262] },
          { id: "s2", coordinates: [-121.9135, 40.3355] },
        ],
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
          { id: "a3", coordinates: [-121.892, 40.341] },
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

// Function to update VIIRS and MODIS hotspots
export const updateHotspotServices = () => {
  const modisInstances: HotspotInstance[] = [];
  const viirsInstances: HotspotInstance[] = [];

  hotspots.forEach((hotspot) => {
    const coordinates: [number, number] = [hotspot.longitude, hotspot.latitude]; // Define coordinates
    if (hotspot.instrument === "MODIS") {
      modisInstances.push({ id: hotspot.Datetime, coordinates });
    } else if (hotspot.instrument === "VIIRS") {
      viirsInstances.push({ id: hotspot.Datetime, coordinates });
    }
  });

  servicesDetails.forEach((category) => {
    category.services.forEach((service) => {
      if (service.name === "MODIS hotspots") {
        service.instances = modisInstances;
      } else if (service.name === "VIIRS hotspots") {
        service.instances = viirsInstances;
      }
    });
  });
};

updateHotspotServices(); // Automatically update the services when this module is loaded
