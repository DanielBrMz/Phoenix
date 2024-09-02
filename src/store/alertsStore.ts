import { create } from "zustand";

interface AlertsState {
  alertsVisible: boolean;
  toggleAlertsVisible: () => void;
  setAlertsVisible: (visible: boolean) => void; // Add this function
}

const alertsStore = create<AlertsState>((set) => ({
  alertsVisible: false,
  toggleAlertsVisible: () =>
    set((state) => ({ alertsVisible: !state.alertsVisible })),
  setAlertsVisible: (visible) => set(() => ({ alertsVisible: visible })), // Add this function
}));

export default alertsStore;
