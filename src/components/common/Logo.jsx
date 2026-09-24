import { Cpu } from "lucide-react";

export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-md shadow-primary/20 shrink-0">
        <Cpu size={18} strokeWidth={2.3} />
      </div>
      {!compact && (
        <div className="leading-none">
          <p className="text-sm font-extrabold tracking-[0.14em] text-primary">
            MACHINOVA
          </p>
          <p className="mt-0.5 text-[9px] font-semibold tracking-[0.2em] text-on-surface-variant">
            Predictive Maintenance
          </p>
        </div>
      )}
    </div>
  );
}
