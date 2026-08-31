import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";
import "./admin.css";
import "./admin-extra.css";
import "./admin-charts.css";
import "./admin-geometry.css";

export const metadata: Metadata = {
  title: "پنل دمو",
  description: "پنل نمایشی مدیریت کنزا",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
