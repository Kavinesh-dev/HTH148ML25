import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Factory, X, MapPin } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import usePolling from "../../hooks/usePolling";
import { loadMachineSummaries } from "../../utils/enrich";
import { createMachine } from "../../services/api";

const MACHINE_TYPES = ["Compressor", "Loom", "CNC Lathe", "Turbine", "Conveyor", "Pump", "Motor"];

export default function Machines() {
  const navigate = useNavigate();
  const { data: machines, loading, error, refetch } = usePolling(loadMachineSummaries, [], 15000);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar title="Machines" subtitle="Every connected asset across your plant" />

      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-on-surface-variant">
            {machines ? `${machines.length} machine${machines.length === 1 ? "" : "s"} connected` : ""}
          </p>
          <Button icon={Plus} onClick={() => setShowForm(true)}>
            Add machine
          </Button>
        </div>

        {loading && <LoadingState label="Loading machines..." />}
        {error && <ErrorState message={error} onRetry={refetch} />}

        {machines && machines.length === 0 && (
          <EmptyState
            icon={Factory}
            title="No machines connected yet"
            description="Add your first machine to start streaming sensor data and predictions."
            action={
              <Button icon={Plus} onClick={() => setShowForm(true)}>
                Add machine
              </Button>
            }
          />
        )}

        {machines && machines.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {machines.map((m) => (
              <button
                key={m.id}
                onClick={() => navigate(`/dashboard/machines/${m.id}`)}
                className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-on-surface">{m.machine_name}</p>
                    <p className="text-xs text-on-surface-variant">{m.machine_type}</p>
                  </div>
                  <StatusBadge value={m.riskLevel} />
                </div>

                <div className="mb-3 flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <MapPin size={12} />
                  {m.location}
                </div>

                <div className="flex items-center justify-between rounded-xl bg-surface-container-low px-3 py-2 text-xs">
                  <span className="text-on-surface-variant">Failure risk</span>
                  <span className="font-bold text-on-surface">
                    {m.failureProbability != null ? `${m.failureProbability}%` : "—"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <AddMachineModal
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}

function AddMachineModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    machine_name: "",
    machine_type: MACHINE_TYPES[0],
    location: "",
    machine_age: 1,
    previous_failures: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      await createMachine(form);
      onCreated();
    } catch (e2) {
      setErr(e2?.response?.data?.detail || "Couldn't create the machine.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-bold text-on-surface">Add machine</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container-low">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Machine name">
            <input
              required
              value={form.machine_name}
              onChange={(e) => setForm({ ...form, machine_name: e.target.value })}
              placeholder="Compressor-04"
              className="input"
            />
          </Field>

          <Field label="Type">
            <select
              value={form.machine_type}
              onChange={(e) => setForm({ ...form, machine_type: e.target.value })}
              className="input"
            >
              {MACHINE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Location">
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Plant A - Bay 3"
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Age (years)">
              <input
                type="number"
                min="0"
                value={form.machine_age}
                onChange={(e) => setForm({ ...form, machine_age: Number(e.target.value) })}
                className="input"
              />
            </Field>
            <Field label="Prior failures">
              <input
                type="number"
                min="0"
                value={form.previous_failures}
                onChange={(e) => setForm({ ...form, previous_failures: Number(e.target.value) })}
                className="input"
              />
            </Field>
          </div>

          {err && <p className="text-xs font-semibold text-error">{err}</p>}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Adding..." : "Add machine"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-on-surface-variant">{label}</span>
      {children}
    </label>
  );
}
