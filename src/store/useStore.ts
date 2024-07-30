// useStore.ts
import create from "zustand";

interface SettingsState {
  startOver: boolean;
  stayInPredictionStep: () => void;
  leavePredictionStep: () => void;
}

const useStore = create<SettingsState>((set) => ({
  startOver: false,
  stayInPredictionStep: () => set({ startOver: false }),
  leavePredictionStep: () => set({ startOver: true }),
}));

export default useStore;
