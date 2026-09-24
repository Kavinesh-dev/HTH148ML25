import axios from "axios";

// Point this at your running FastAPI backend. Override with a .env
// file (VITE_API_BASE_URL=http://your-host:8000) for deployment.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// ---- Machines ----
export const getMachines = () => client.get("/machines/").then((r) => r.data);
export const getMachine = (id) =>
  client.get(`/machines/${id}`).then((r) => r.data);
export const createMachine = (payload) =>
  client.post("/machines/", payload).then((r) => r.data);

// ---- Machine Data (sensor readings) ----
export const getMachineData = (machineId) =>
  client.get(`/machine-data/${machineId}`).then((r) => r.data);
export const postMachineData = (payload, autoPredict = true) =>
  client
    .post(`/machine-data/?auto_predict=${autoPredict}`, payload)
    .then((r) => r.data);

// ---- Predictions ----
export const getPredictions = (machineId) =>
  client.get(`/predictions/${machineId}`).then((r) => r.data);
export const getLatestPrediction = (machineId) =>
  client
    .get(`/predictions/latest/${machineId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err?.response?.status === 404) return null;
      throw err;
    });
export const generatePrediction = (machineId) =>
  client.post(`/predictions/generate/${machineId}`).then((r) => r.data);

// ---- Alerts ----
export const getAlerts = (params = {}) =>
  client.get("/alerts/", { params }).then((r) => r.data);
export const getAlertsForMachine = (machineId) =>
  client.get(`/alerts/machine/${machineId}`).then((r) => r.data);
export const updateAlertStatus = (alertId, status) =>
  client.patch(`/alerts/${alertId}`, { status }).then((r) => r.data);

// ---- Maintenance ----
export const getMaintenanceRecords = (params = {}) =>
  client.get("/maintenance/", { params }).then((r) => r.data);
export const getMaintenanceForMachine = (machineId) =>
  client.get(`/maintenance/machine/${machineId}`).then((r) => r.data);
export const createMaintenance = (payload) =>
  client.post("/maintenance/", payload).then((r) => r.data);
export const scheduleMaintenanceFromAlert = (alertId) =>
  client.post(`/maintenance/from-alert/${alertId}`).then((r) => r.data);
export const updateMaintenance = (id, payload) =>
  client.patch(`/maintenance/${id}`, payload).then((r) => r.data);

// ---- Health ----
export const getHealth = () => client.get("/health").then((r) => r.data);

export default client;
