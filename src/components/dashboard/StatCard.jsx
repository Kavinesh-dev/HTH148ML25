export default function StatCard({ icon: Icon, label, value, hint, tone = "primary" }) {
  const toneStyles = {
    primary: "bg-primary-fixed text-primary",
    secondary: "bg-secondary/10 text-secondary",
    error: "bg-error/10 text-error",
    amber: "bg-amber-500/10 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
            {label}
          </p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-on-surface">
            {value}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-on-surface-variant">{hint}</p>
          )}
        </div>
        {Icon && (
          <div className={`rounded-xl p-2.5 ${toneStyles[tone]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
