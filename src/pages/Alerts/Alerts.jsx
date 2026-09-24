import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Siren, CheckCircle2, Wrench } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import StatusBadge from "../../components/common/StatusBadge";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import usePolling from "../../hooks/usePolling";
import { getAlerts, updateAlertStatus, scheduleMaintenanceFromAlert } from "../../services/api";

const STATUS_FILTERS = ["All", "Active", "Acknowledged", "Resolved"];

export default function Alerts() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Active");
  const { data: alerts, loading, error, refetch } = usePolling(
    () => getAlerts(filter === "All" ? {} : { status: filter }),
    [filter],
    8000
  );

  return (
    <div className="min-h-screen">
      <Navbar title="Alerts" subtitle="Every anomaly your ML model has flagged" />

      <div className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                filter === s
                  ? "bg-primary text-white"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading && <LoadingState label="Loading alerts..." />}
        {error && <ErrorState message={error} onRetry={refetch} />}

        {alerts && alerts.length === 0 && (
          <EmptyState
            icon={Siren}
            title={`No ${filter === "All" ? "" : filter.toLowerCase()} alerts`}
            description="Alerts are created automatically when a prediction crosses the High or Critical risk threshold."
          />
        )}

        {alerts && alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="mb-1.5 flex items-center gap-2">
                      <StatusBadge value={a.severity} />
                      <StatusBadge value={a.status} />
                      <span className="text-[11px] text-on-surface-variant">
                        {new Date(a.created_at).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/dashboard/machines/${a.machine_id}`)}
                      className="text-sm font-bold text-on-surface hover:underline"
                    >
                      {a.title}
                    </button>
                    <p className="mt-0.5 text-xs text-on-surface-variant">{a.message}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {a.status === "Active" && (
                      <>
                        <button
                          onClick={async () => {
                            await updateAlertStatus(a.id, "Acknowledged");
                            refetch();
                          }}
                          className="flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-2 text-xs font-bold text-on-surface hover:bg-surface-container"
                        >
                          <CheckCircle2 size={14} /> Acknowledge
                        </button>
                        <button
                          onClick={async () => {
                            await scheduleMaintenanceFromAlert(a.id);
                            refetch();
                          }}
                          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-tertiary"
                        >
                          <Wrench size={14} /> Schedule maintenance
                        </button>
                      </>
                    )}
                    {a.status === "Acknowledged" && (
                      <button
                        onClick={async () => {
                          await updateAlertStatus(a.id, "Resolved");
                          refetch();
                        }}
                        className="flex items-center gap-1.5 rounded-lg bg-secondary/10 px-3 py-2 text-xs font-bold text-secondary hover:bg-secondary/20"
                      >
                        <CheckCircle2 size={14} /> Mark resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
