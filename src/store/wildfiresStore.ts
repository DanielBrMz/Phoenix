import create from "zustand";

interface WildfireState {
  selectedWildfireId: string | null;
  selectedCoordinates: [number, number] | null;
  setSelectedWildfireId: (
    id: string | null,
    coordinates: [number, number] | null,
  ) => void;
}

export const wildfiresStore = create<WildfireState>((set) => ({
  selectedWildfireId: null,
  selectedCoordinates: null,
  setSelectedWildfireId: (
    id: string | null,
    coordinates: [number, number] | null,
  ) => set({ selectedWildfireId: id, selectedCoordinates: coordinates }),
}));
