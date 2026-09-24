import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getAlerts } from "../../services/api";

export default function Navbar({ title, subtitle }) {
  const [activeAlertCount, setActiveAlertCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getAlerts({ status: "Active" })
      .then((alerts) => !cancelled && setActiveAlertCount(alerts.length))
      .catch(() => !cancelled && setActiveAlertCount(null));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-outline-variant/40 bg-surface-container-lowest/90 px-6 backdrop-blur-xl">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold text-on-surface">{title}</h1>
        {subtitle && (
          <p className="truncate text-xs text-on-surface-variant">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-outline-variant/50 bg-surface-container-low px-3 py-2 md:flex">
          <Search size={15} className="text-on-surface-variant" />
          <input
            placeholder="Search machines..."
            className="w-40 bg-transparent text-sm outline-none placeholder:text-on-surface-variant/70"
          />
        </div>

        <button className="relative rounded-lg p-2.5 text-on-surface-variant hover:bg-surface-container-low">
          <Bell size={18} />
          {activeAlertCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[9px] font-bold text-white">
              {activeAlertCount}
            </span>
          )}
        </button>

        <div className="h-9 w-9 rounded-full bg-primary-fixed flex items-center justify-center text-xs font-bold text-primary">
          OP
        </div>
      </div>
    </header>
  );
}
