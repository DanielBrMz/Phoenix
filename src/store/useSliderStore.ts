import create from "zustand";

interface SliderStore {
  sliderValue: number;
  setSliderValue: (value: number) => void;
  wildfireVisible: boolean;
  setWildfireVisible: (visible: boolean) => void;
}

export const useSliderStore = create<SliderStore>((set) => ({
  sliderValue: 0,
  setSliderValue: (value) => set({ sliderValue: value }),
  wildfireVisible: true,
  setWildfireVisible: (visible) => set({ wildfireVisible: visible }),
}));
