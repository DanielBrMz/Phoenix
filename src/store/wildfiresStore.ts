// store/wildfiresStore.ts
import create from "zustand";

interface WildfireState {
  selectedWildfireId: string | null;
  setSelectedWildfireId: (id: string | null) => void;
}

export const wildfiresStore = create<WildfireState>((set) => ({
  selectedWildfireId: null,
  setSelectedWildfireId: (id: string | null) => set({ selectedWildfireId: id }),
}));
