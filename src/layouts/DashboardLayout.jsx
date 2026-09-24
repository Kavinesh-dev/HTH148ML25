import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-surface-container-low/40">
      <Sidebar />
      <div className="lg:pl-64">
        <Outlet />
      </div>
    </div>
  );
}
