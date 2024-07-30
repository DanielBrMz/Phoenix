import create from "zustand";

interface AlertsState {
  alertVisible: boolean;
  toggleAlertsVisible: () => void;
}

const isClient = typeof window !== "undefined";

const alertVisibleFromStorage = isClient
  ? localStorage.getItem("alertVisible") === "true"
  : false;

const alertStore = create<AlertsState>((set) => ({
  alertVisible: alertVisibleFromStorage,
  toggleAlertsVisible: () =>
    set((state) => {
      const newAlertVisible = !state.alertVisible;
      if (isClient) {
        localStorage.setItem("alertVisible", newAlertVisible.toString());
      }
      return { alertVisible: newAlertVisible };
    }),
}));

export default alertStore;
