// hospitals.ts, dsda
export type Hospital = {
    id: string;
    name: string;
    coords: [number, number];
};

export const generateMockHospitals = (): Hospital[] => {
  return [
    { id: '1', name: 'Hospital A', coords: [-110.8838082457804, 31.27633620026809] },
    { id: '2', name: 'Hospital B', coords: [-110.8968082457804, 31.30933620026809] },
    { id: '3', name: 'Hospital C', coords: [-110.9168082457804, 31.28933620026809] },
    { id: '4', name: 'Hospital D', coords: [-110.8968082457804, 31.25933620026809] }
  ];
};
