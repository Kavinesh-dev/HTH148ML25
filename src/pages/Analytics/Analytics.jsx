import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { BarChart3 } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import usePolling from "../../hooks/usePolling";
import { loadMachineSummaries } from "../../utils/enrich";
import { getAlerts, getMaintenanceRecords } from "../../services/api";

const RISK_COLORS = { Low: "#10b981", Medium: "#f59e0b", High: "#f97316", Critical: "#ef4444", Unknown: "#94a3b8" };

async function loadAnalytics() {
  const [machines, alerts, maintenance] = await Promise.all([
    loadMachineSummaries(),
    getAlerts(),
    getMaintenanceRecords(),
  ]);
  return { machines, alerts, maintenance };
}

function countBy(list, key) {
  const counts = {};
  list.forEach((item) => {
    const k = item[key] || "Unknown";
    counts[k] = (counts[k] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export default function Analytics() {
  const { data, loading, error, refetch } = usePolling(loadAnalytics, [], 15000);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar title="Analytics" subtitle="Fleet-wide trends" />
        <LoadingState label="Crunching plant analytics..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar title="Analytics" subtitle="Fleet-wide trends" />
        <div className="p-6"><ErrorState message={error} onRetry={refetch} /></div>
      </div>
    );
  }

  const { machines, alerts, maintenance } = data;

  if (machines.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar title="Analytics" subtitle="Fleet-wide trends" />
        <div className="p-6">
          <EmptyState icon={BarChart3} title="Nothing to analyze yet" description="Add machines and start logging sensor data to see fleet-wide trends." />
        </div>
      </div>
    );
  }

  const riskData = countBy(machines, "riskLevel");
  const typeData = countBy(machines, "machine_type");
  const alertSeverityData = countBy(alerts, "severity");
  const maintenanceStatusData = countBy(maintenance, "status");

  const avgFailureProb =
    machines.filter((m) => m.failureProbability != null).reduce((sum, m) => sum + m.failureProbability, 0) /
    (machines.filter((m) => m.failureProbability != null).length || 1);

  return (
    <div className="min-h-screen">
      <Navbar title="Analytics" subtitle="Fleet-wide risk, alerts and maintenance trends" />

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard label="Avg. failure probability" value={`${avgFailureProb.toFixed(1)}%`} />
          <SummaryCard label="Total alerts raised" value={alerts.length} />
          <SummaryCard label="Maintenance jobs" value={maintenance.length} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Risk distribution across fleet">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {riskData.map((entry) => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name] || "#94a3b8"} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Machines by type">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ff" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9497a8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#9497a8" allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="value" fill="#00288e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Alerts by severity">
            {alertSeverityData.length === 0 ? (
              <EmptyState title="No alerts logged yet" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={alertSeverityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ff" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9497a8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#9497a8" allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {alertSeverityData.map((entry) => (
                      <Cell key={entry.name} fill={RISK_COLORS[entry.name] || "#94a3b8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Maintenance by status">
            {maintenanceStatusData.length === 0 ? (
              <EmptyState title="No maintenance jobs yet" />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={maintenanceStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e7ff" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9497a8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#9497a8" allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                  <Bar dataKey="value" fill="#00687a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-on-surface">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-bold text-on-surface">{title}</h3>
      {children}
    </div>
  );
}
