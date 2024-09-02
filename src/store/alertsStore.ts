import { create } from "zustand";
import type { Alert } from "../Components/Alerts/EmergencyAlerts";

interface AlertsState {
  alertsVisible: boolean;
  toggleAlertsVisible: () => void;
  setAlertsVisible: (visible: boolean) => void;
  selectedAlert: Alert | null; // Add selectedAlert to the state
  setSelectedAlert: (alert: Alert | null) => void; // Add function to set selectedAlert
}

const alertsStore = create<AlertsState>((set) => ({
  alertsVisible: false,
  toggleAlertsVisible: () =>
    set((state) => ({ alertsVisible: !state.alertsVisible })),
  setAlertsVisible: (visible) => set(() => ({ alertsVisible: visible })),
  selectedAlert: null, // Initialize selectedAlert as null
  setSelectedAlert: (alert) => set(() => ({ selectedAlert: alert })), // Function to set selectedAlert
}));

export default alertsStore;
