import create from "zustand";

interface Instance {
  id: string;
  coordinates: [number, number];
}

interface Layer {
  name: string;
  icon: string;
  instances: Instance[];
}

interface LayersState {
  selectedLayers: Layer[];
  toggleLayer: (layer: Layer) => void;
}

const useLayersStore = create<LayersState>((set) => ({
  selectedLayers: [],
  toggleLayer: (layer) =>
    set((state) => {
      const isSelected = state.selectedLayers.some(
        (selectedLayer) => selectedLayer.name === layer.name,
      );
      console.log("Toggling layer:", layer.name, "Selected:", !isSelected);
      return {
        selectedLayers: isSelected
          ? state.selectedLayers.filter(
              (selectedLayer) => selectedLayer.name !== layer.name,
            )
          : [...state.selectedLayers, layer],
      };
    }),
}));

export default useLayersStore;
