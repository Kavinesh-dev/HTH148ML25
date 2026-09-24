import { useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Thermometer,
  Activity,
  Gauge,
  Zap,
  Sparkles,
  PlusCircle,
  X,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import MachineHealthChart from "../../components/dashboard/MachineHealthChart";
import usePolling from "../../hooks/usePolling";

const MachineViewer = lazy(() => import("../../components/three/MachineViewer"));
import {
  getMachine,
  getMachineData,
  getPredictions,
  getAlertsForMachine,
  getMaintenanceForMachine,
  postMachineData,
  generatePrediction,
  scheduleMaintenanceFromAlert,
} from "../../services/api";

async function loadDetail(id) {
  const [machine, readings, predictions, alerts, maintenance] = await Promise.all([
    getMachine(id),
    getMachineData(id),
    getPredictions(id),
    getAlertsForMachine(id),
    getMaintenanceForMachine(id),
  ]);
  return { machine, readings, predictions, alerts, maintenance };
}

const METRICS = [
  { key: "temperature", label: "Temperature", unit: "°C", color: "#f97316", icon: Thermometer },
  { key: "vibration", label: "Vibration", unit: " mm/s", color: "#00687a", icon: Activity },
  { key: "rpm", label: "RPM", unit: "", color: "#00288e", icon: Gauge },
  { key: "current", label: "Current", unit: " A", color: "#a855f7", icon: Zap },
];

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = usePolling(() => loadDetail(id), [id], 8000);
  const [showLogForm, setShowLogForm] = useState(false);
  const [predicting, setPredicting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar title="Machine" subtitle="Loading..." />
        <LoadingState label="Loading machine telemetry..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar title="Machine" subtitle="" />
        <div className="p-6">
          <ErrorState message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  const { machine, readings, predictions, alerts, maintenance } = data;
  const latestPrediction = predictions[0] || null;
  const latestReading = readings[0] || null;

  const handleRunPrediction = async () => {
    setPredicting(true);
    try {
      await generatePrediction(id);
      await refetch();
    } catch {
      // surfaced implicitly via the ErrorState on next poll if persistent
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar title={machine.machine_name} subtitle={`${machine.machine_type} · ${machine.location}`} />

      <div className="space-y-6 p-6">
        <button
          onClick={() => navigate("/dashboard/machines")}
          className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-on-surface"
        >
          <ArrowLeft size={14} /> All machines
        </button>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Digital twin */}
          <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm xl:col-span-1">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-on-surface">Digital twin</h2>
              <StatusBadge value={latestPrediction?.risk_level || "Unknown"} />
            </div>
            <div className="h-64">
              <Suspense fallback={<LoadingState label="Loading digital twin..." />}>
                <MachineViewer
                  riskLevel={latestPrediction?.risk_level}
                  rpm={latestReading?.rpm || 0}
                  vibration={latestReading?.vibration || 0}
                />
              </Suspense>
            </div>

            <div className="mt-4 rounded-xl bg-surface-container-low p-3 text-center">
              <p className="text-xs font-semibold text-on-surface-variant">Failure probability</p>
              <p className="text-2xl font-extrabold text-on-surface">
                {latestPrediction?.failure_probability != null ? `${latestPrediction.failure_probability}%` : "—"}
              </p>
              {latestPrediction?.prediction && (
                <p className="mt-1 text-[11px] text-on-surface-variant">{latestPrediction.prediction}</p>
              )}
            </div>

            <Button
              icon={Sparkles}
              onClick={handleRunPrediction}
              disabled={predicting || !latestReading}
              className="mt-4 w-full"
            >
              {predicting ? "Analyzing..." : "Run prediction now"}
            </Button>
            {!latestReading && (
              <p className="mt-2 text-center text-[11px] text-on-surface-variant">
                Log a sensor reading first to enable predictions.
              </p>
            )}
          </div>

          {/* Sensor charts */}
          <div className="space-y-4 xl:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-on-surface">Sensor telemetry</h2>
              <Button variant="secondary" icon={PlusCircle} onClick={() => setShowLogForm(true)}>
                Log reading
              </Button>
            </div>

            {readings.length === 0 ? (
              <EmptyState
                icon={Activity}
                title="No sensor readings yet"
                description="Log a reading manually below, or point your IoT ingestion pipeline at POST /machine-data/ for this machine."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {METRICS.map((metric) => (
                  <div key={metric.key} className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <metric.icon size={14} style={{ color: metric.color }} />
                      <span className="text-xs font-bold text-on-surface">{metric.label}</span>
                      <span className="ml-auto text-xs font-bold text-on-surface-variant">
                        {latestReading ? `${latestReading[metric.key]}${metric.unit}` : "—"}
                      </span>
                    </div>
                    <MachineHealthChart data={readings} metric={metric.key} color={metric.color} unit={metric.unit} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Panel title="Alerts">
            {alerts.length === 0 ? (
              <EmptyState icon={Sparkles} title="No alerts" description="This machine has no alert history." />
            ) : (
              <div className="space-y-2">
                {alerts.map((a) => (
                  <div key={a.id} className="rounded-xl border border-outline-variant/40 p-3">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <StatusBadge value={a.severity} />
                      <StatusBadge value={a.status} />
                    </div>
                    <p className="text-xs font-semibold text-on-surface">{a.title}</p>
                    <p className="mt-0.5 text-[11px] text-on-surface-variant">{a.message}</p>
                    {a.status === "Active" && (
                      <button
                        onClick={async () => {
                          await scheduleMaintenanceFromAlert(a.id);
                          refetch();
                        }}
                        className="mt-2 text-[11px] font-bold text-primary hover:underline"
                      >
                        Schedule maintenance from this alert →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Maintenance history">
            {maintenance.length === 0 ? (
              <EmptyState icon={Sparkles} title="No maintenance logged" description="Jobs scheduled from alerts will appear here." />
            ) : (
              <div className="space-y-2">
                {maintenance.map((m) => (
                  <div key={m.id} className="rounded-xl border border-outline-variant/40 p-3">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <StatusBadge value={m.status} />
                      <span className="text-[10px] text-on-surface-variant">{m.priority} priority</span>
                    </div>
                    <p className="text-xs font-semibold text-on-surface">{m.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      </div>

      {showLogForm && (
        <LogReadingModal
          machineId={id}
          onClose={() => setShowLogForm(false)}
          onSaved={() => {
            setShowLogForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-on-surface">{title}</h2>
      {children}
    </div>
  );
}

const DEFAULT_READING = {
  temperature: 70,
  vibration: 3,
  rpm: 1400,
  pressure: 4.5,
  power: 30,
  current: 10,
  operating_hours: 100,
};

function LogReadingModal({ machineId, onClose, onSaved }) {
  const [form, setForm] = useState(DEFAULT_READING);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      await postMachineData({ machine_id: Number(machineId), ...form });
      onSaved();
    } catch (e2) {
      setErr(e2?.response?.data?.detail || "Couldn't save this reading.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-base font-bold text-on-surface">Log sensor reading</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container-low">
            <X size={18} />
          </button>
        </div>
        <p className="mb-5 text-xs text-on-surface-variant">
          Manual entry point — saves through the same POST /machine-data/ endpoint your IoT
          pipeline would use, and automatically triggers a prediction.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          {Object.keys(DEFAULT_READING).map((key) => (
            <label key={key} className="block">
              <span className="mb-1 block text-[11px] font-bold capitalize text-on-surface-variant">
                {key.replace("_", " ")}
              </span>
              <input
                type="number"
                step="any"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                className="input"
              />
            </label>
          ))}

          {err && <p className="col-span-2 text-xs font-semibold text-error">{err}</p>}

          <Button type="submit" disabled={submitting} className="col-span-2 w-full">
            {submitting ? "Saving..." : "Save reading & analyze"}
          </Button>
        </form>
      </div>
    </div>
  );
}
