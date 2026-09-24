import { useNavigate } from "react-router-dom";
import { Wrench, User, DollarSign } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import usePolling from "../../hooks/usePolling";
import { getMaintenanceRecords, updateMaintenance } from "../../services/api";

const COLUMNS = ["Scheduled", "InProgress", "Completed", "Cancelled"];
const NEXT_STATUS = {
  Scheduled: "InProgress",
  InProgress: "Completed",
};

export default function Maintenance() {
  const navigate = useNavigate();
  const { data: records, loading, error, refetch } = usePolling(getMaintenanceRecords, [], 8000);

  return (
    <div className="min-h-screen">
      <Navbar title="Maintenance" subtitle="Work scheduled from prediction alerts" />

      <div className="p-6">
        {loading && <LoadingState label="Loading maintenance board..." />}
        {error && <ErrorState message={error} onRetry={refetch} />}

        {records && records.length === 0 && (
          <EmptyState
            icon={Wrench}
            title="No maintenance jobs yet"
            description="Jobs appear here once you schedule maintenance from an alert."
          />
        )}

        {records && records.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((col) => {
              const items = records.filter((r) => r.status === col);
              return (
                <div key={col} className="rounded-2xl border border-outline-variant/40 bg-surface-container-low/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant">
                      {col}
                    </h3>
                    <span className="rounded-full bg-surface-container px-2 py-0.5 text-[11px] font-bold text-on-surface-variant">
                      {items.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {items.map((job) => (
                      <div key={job.id} className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-3 shadow-sm">
                        <button
                          onClick={() => navigate(`/dashboard/machines/${job.machine_id}`)}
                          className="text-left text-xs font-bold text-on-surface hover:underline"
                        >
                          {job.description}
                        </button>
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-on-surface-variant">
                          <span className="rounded-full bg-surface-container px-2 py-0.5 font-bold">
                            {job.priority}
                          </span>
                          {job.technician && (
                            <span className="flex items-center gap-1">
                              <User size={11} /> {job.technician}
                            </span>
                          )}
                          {job.cost != null && (
                            <span className="flex items-center gap-1">
                              <DollarSign size={11} /> {job.cost}
                            </span>
                          )}
                        </div>

                        {NEXT_STATUS[job.status] && (
                          <button
                            onClick={async () => {
                              await updateMaintenance(job.id, { status: NEXT_STATUS[job.status] });
                              refetch();
                            }}
                            className="mt-2 w-full rounded-lg bg-primary/10 py-1.5 text-[11px] font-bold text-primary hover:bg-primary/20"
                          >
                            Move to {NEXT_STATUS[job.status]} →
                          </button>
                        )}
                      </div>
                    ))}
                    {items.length === 0 && (
                      <p className="py-4 text-center text-[11px] text-on-surface-variant">Nothing here</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
