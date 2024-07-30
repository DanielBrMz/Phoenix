import create from "zustand";

interface PredictionState {
  activeStep: number;
  inPredictionStep: boolean;
  setActiveStep: (step: number) => void;
  stayInPredictionStep: () => void;
  leavePredictionStep: () => void;
  resetStep: () => void;
}

const useStore = create<PredictionState>((set) => ({
  activeStep: 0,
  inPredictionStep: false,
  setActiveStep: (step: number) => set({ activeStep: step }),
  stayInPredictionStep: () => set({ inPredictionStep: true }),
  leavePredictionStep: () => set({ inPredictionStep: false }),
  resetStep: () => set({ activeStep: 0, inPredictionStep: false }),
}));

export default useStore;
