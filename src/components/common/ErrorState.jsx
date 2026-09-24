import { AlertTriangle, RotateCw } from "lucide-react";

export default function ErrorState({
  message = "Couldn't reach the backend.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-error/20 bg-error/5 py-14 text-center">
      <div className="rounded-full bg-error/10 p-3 text-error">
        <AlertTriangle size={22} />
      </div>
      <p className="max-w-sm text-sm font-semibold text-error">{message}</p>
      <p className="max-w-sm text-xs text-on-surface-variant">
        Check that the FastAPI server is running and reachable at the
        configured API URL.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-error/10 px-4 py-2 text-xs font-bold text-error hover:bg-error/20"
        >
          <RotateCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
