export default function EmptyState({
  icon: Icon,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-outline-variant/60 bg-surface-container-low/40 py-14 text-center">
      {Icon && (
        <div className="rounded-full bg-surface-container p-3 text-on-surface-variant">
          <Icon size={22} />
        </div>
      )}
      <p className="text-sm font-bold text-on-surface">{title}</p>
      {description && (
        <p className="max-w-sm text-xs text-on-surface-variant">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
