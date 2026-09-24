import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Factory, Siren, ShieldAlert, Wrench, ArrowRight } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import StatCard from "../../components/dashboard/StatCard";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import usePolling from "../../hooks/usePolling";

// Three.js scene is code-split into its own chunk so the rest of the
// dashboard stays fast to load even on the first visit.
const Factory3D = lazy(() => import("../../components/three/Factory3D"));
import { loadMachineSummaries } from "../../utils/enrich";
import { getAlerts, getMaintenanceRecords } from "../../services/api";

async function loadOverview() {
  const [machines, alerts, maintenance] = await Promise.all([
    loadMachineSummaries(),
    getAlerts({ status: "Active" }),
    getMaintenanceRecords({ status: "Scheduled" }),
  ]);
  return { machines, alerts, maintenance };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = usePolling(loadOverview, [], 10000);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar title="Overview" subtitle="Live plant status" />
        <LoadingState label="Loading plant telemetry..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar title="Overview" subtitle="Live plant status" />
        <div className="p-6">
          <ErrorState message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  const { machines, alerts, maintenance } = data;
  const criticalCount = machines.filter((m) => m.riskLevel === "Critical").length;

  return (
    <div className="min-h-screen">
      <Navbar title="Overview" subtitle="Live plant status across all connected assets" />

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Factory} label="Machines" value={machines.length} tone="primary" hint="Connected assets" />
          <StatCard icon={Siren} label="Active alerts" value={alerts.length} tone="error" hint="Needs attention" />
          <StatCard icon={ShieldAlert} label="Critical risk" value={criticalCount} tone="amber" hint="Failure imminent" />
          <StatCard icon={Wrench} label="Scheduled jobs" value={maintenance.length} tone="secondary" hint="Upcoming maintenance" />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-on-surface">Plant floor</h2>
                <p className="text-xs text-on-surface-variant">
                  Drag to orbit · click a machine to open its digital twin
                </p>
              </div>
            </div>

            {machines.length === 0 ? (
              <EmptyState
                icon={Factory}
                title="No machines yet"
                description="Add a machine from the Machines page to see it appear on the plant floor."
              />
            ) : (
              <div className="h-[420px]">
                <Suspense fallback={<LoadingState label="Loading 3D plant floor..." />}>
                  <Factory3D
                    machines={machines}
                    onSelect={(id) => navigate(`/dashboard/machines/${id}`)}
                  />
                </Suspense>
              </div>
            )}

            {machines.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-on-surface-variant">
                <LegendDot color="#10b981" label="Low" />
                <LegendDot color="#f59e0b" label="Medium" />
                <LegendDot color="#f97316" label="High" />
                <LegendDot color="#ef4444" label="Critical" />
                <LegendDot color="#64748b" label="No data yet" />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-on-surface">Recent alerts</h2>
              <button
                onClick={() => navigate("/dashboard/alerts")}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>

            {alerts.length === 0 ? (
              <EmptyState
                icon={Siren}
                title="No active alerts"
                description="Every connected machine is currently within safe operating limits."
              />
            ) : (
              <div className="space-y-3">
                {alerts.slice(0, 6).map((alert) => (
                  <button
                    key={alert.id}
                    onClick={() => navigate(`/dashboard/machines/${alert.machine_id}`)}
                    className="w-full rounded-xl border border-outline-variant/40 p-3 text-left transition-colors hover:bg-surface-container-low"
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <StatusBadge value={alert.severity} />
                      <span className="text-[10px] text-on-surface-variant">
                        {new Date(alert.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-on-surface">{alert.title}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
