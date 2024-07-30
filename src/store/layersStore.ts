import create from "zustand";

interface Layer {
  id: string;
  name: string;
  coordinates: [number, number];
  icon: { src: string }; // Asegúrate de que el icono sea un objeto con una propiedad src
}

interface LayersState {
  selectedLayers: Layer[];
  addLayer: (layer: Layer) => void;
  removeLayer: (id: string) => void;
}

const useLayersStore = create<LayersState>((set) => ({
  selectedLayers: [],
  addLayer: (layer) =>
    set((state) => ({
      selectedLayers: [...state.selectedLayers, layer],
    })),
  removeLayer: (id) =>
    set((state) => ({
      selectedLayers: state.selectedLayers.filter((layer) => layer.id !== id),
    })),
}));

export default useLayersStore;
