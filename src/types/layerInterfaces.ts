import { StaticImageData } from "next/image";

export interface Instance {
  id: string;
  coordinates: [number, number];
}

export interface Service {
  name: string;
  icon: StaticImageData;
  instances: Instance[];
}

export interface Category {
  type: string;
  services: Service[];
}
