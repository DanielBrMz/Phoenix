import create from "zustand";

interface SettingsState {
  activeStep: number;
  inPredictionStep: boolean;
  setActiveStep: (step: number) => void;
  stayInPredictionStep: () => void;
  leavePredictionStep: () => void;
  resetStep: () => void;
}

const useStore = create<SettingsState>((set) => ({
  activeStep: 0,
  inPredictionStep: false,
  setActiveStep: (step: number) => set({ activeStep: step }),
  stayInPredictionStep: () => set({ inPredictionStep: true }),
  leavePredictionStep: () => set({ inPredictionStep: false }),
  resetStep: () => set({ activeStep: 0, inPredictionStep: false }),
}));

export default useStore;
