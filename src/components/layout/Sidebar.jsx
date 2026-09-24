import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Factory,
  Siren,
  Wrench,
  BarChart3,
  LogOut,
} from "lucide-react";
import Logo from "../common/Logo";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/dashboard/machines", label: "Machines", icon: Factory },
  { to: "/dashboard/alerts", label: "Alerts", icon: Siren },
  { to: "/dashboard/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-outline-variant/40 bg-surface-container-lowest lg:flex">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-primary-fixed text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-outline-variant/40 p-3">
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
            AI Engine Online
          </span>
        </div>
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
        >
          <LogOut size={18} />
          Sign out
        </NavLink>
      </div>
    </aside>
  );
}
