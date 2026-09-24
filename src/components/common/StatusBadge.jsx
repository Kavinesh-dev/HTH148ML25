const RISK_STYLES = {
  Low: "bg-secondary/10 text-secondary border-secondary/30",
  Medium: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  High: "bg-orange-500/10 text-orange-600 border-orange-500/30",
  Critical: "bg-error/10 text-error border-error/30",
};

const GENERIC_STYLES = {
  Active: "bg-error/10 text-error border-error/30",
  Acknowledged: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Resolved: "bg-secondary/10 text-secondary border-secondary/30",
  Scheduled: "bg-primary/10 text-primary border-primary/30",
  InProgress: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Completed: "bg-secondary/10 text-secondary border-secondary/30",
  Cancelled: "bg-outline/10 text-outline border-outline/30",
  Active_status: "bg-secondary/10 text-secondary border-secondary/30",
};

export default function StatusBadge({ value }) {
  const style =
    RISK_STYLES[value] || GENERIC_STYLES[value] ||
    "bg-surface-container text-on-surface-variant border-outline-variant/40";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}
