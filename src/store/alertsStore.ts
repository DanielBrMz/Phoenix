import { create } from "zustand";

interface AlertsState {
  alertsVisible: boolean;
  toggleAlertsVisible: () => void;
}

const alertsStore = create<AlertsState>((set) => ({
  alertsVisible: false,
  toggleAlertsVisible: () =>
    set((state) => ({ alertsVisible: !state.alertsVisible })),
}));

export default alertsStore;
