import create from "zustand";

interface LayersState {
  hospitalsVisible: boolean;
  toggleHospitalsVisible: () => void;
  firefightersVisible: boolean;
  toggleFirefightersVisible: () => void;
  policeVisible: boolean;
  togglePoliceVisible: () => void;
  electricityPolesVisible: boolean;
  toggleElectricityPolesVisible: () => void;
}

const layersStore = create<LayersState>((set) => ({
  hospitalsVisible: false,
  toggleHospitalsVisible: () =>
    set((state) => ({ hospitalsVisible: !state.hospitalsVisible })),
  firefightersVisible: false,
  toggleFirefightersVisible: () =>
    set((state) => ({ firefightersVisible: !state.firefightersVisible })),
  policeVisible: false,
  togglePoliceVisible: () =>
    set((state) => ({ policeVisible: !state.policeVisible })),
  electricityPolesVisible: false,
  toggleElectricityPolesVisible: () =>
    set((state) => ({
      electricityPolesVisible: !state.electricityPolesVisible,
    })),
}));

export default layersStore;
