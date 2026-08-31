"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import demo from "@/data/admin-demo.json";
import { AdminWorkspace, type WorkspaceId } from "./AdminWorkspace";

type NavId = "overview" | WorkspaceId;

const navItems: { id: NavId; label: string; caption: string; badge?: string }[] = [
  { id: "overview", label: "نمای کلی", caption: "مرکز عملیات" },
  { id: "customers", label: "لیست مشتری‌ها", caption: "فروش و ارتباط" },
  { id: "projects", label: "پروژه‌ها", caption: "کنترل اجرا", badge: "۵" },
  { id: "inventory", label: "انبارداری", caption: "موجودی و تأمین", badge: "۲" },
  { id: "accounting", label: "حسابداری", caption: "جریان مالی" },
  { id: "employees", label: "لیست کارمندان", caption: "منابع انسانی" },
  { id: "missions", label: "مأموریت‌ها", caption: "برنامه امروز", badge: "۴" },
  { id: "team", label: "اعضای تیم", caption: "نقش و دسترسی" }
];

export const AdminIcon = ({ name, className }: { name: string; className?: string }) => {
  const paths: Record<string, string> = {
    overview: "M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Z",
    customers: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    projects: "M4 7.5 12 3l8 4.5V17L12 21l-8-4V7.5ZM4 8l8 4 8-4M12 12v9",
    inventory: "M3 6.5 12 2l9 4.5-9 4.5-9-4.5ZM3 12l9 4.5 9-4.5M3 17l9 4.5 9-4.5",
    accounting: "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-8M20 7l-3-3-3 3",
    employees: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    missions: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2M19 5l2-2M5 5 3 8",
    team: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75",
    search: "m21 21-4.5-4.5M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4",
    menu: "M4 7h16M4 12h16M4 17h16",
    chevron: "m9 18 6-6-6-6",
    close: "M6 6l12 12M18 6 6 18",
    command: "M8 9h8M8 13h5M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z",
    arrow: "m15 18-6-6 6-6"
  };
  return <svg className={className} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.overview} /></svg>;
};

export function AdminDashboard() {
  const [active, setActive] = useState<NavId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const activeItem = useMemo(() => navItems.find((item) => item.id === active) ?? navItems[0], [active]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        if (window.innerWidth < 780) setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectTab = (id: NavId) => {
    setActive(id);
    setQuery("");
    setNotificationsOpen(false);
    if (window.innerWidth < 780) setSidebarOpen(false);
  };

  return (
    <main className={`ka-shell ${sidebarOpen ? "is-sidebar-open" : "is-sidebar-closed"}`} dir="rtl">
      <button className="ka-mobile-overlay" aria-label="بستن منو" onClick={() => setSidebarOpen(false)} />
      <aside className="ka-sidebar" aria-label="منوی اصلی مدیریت">
        <div className="ka-sidebar-glow" />
        <div className="ka-brand">
          <span className="ka-brand-mark">ک</span>
          <div className="ka-brand-copy"><strong>{demo.company.name}</strong><small>KENZA ADMIN</small></div>
          <span className="ka-demo-label">نسخه دمو</span>
        </div>
        <div className="ka-workspace-switcher">
          <span className="ka-workspace-icon"><AdminIcon name="command" /></span>
          <div><small>فضای کاری فعال</small><strong>{demo.company.workspace}</strong></div>
          <AdminIcon name="chevron" />
        </div>
        <nav className="ka-nav">
          <span className="ka-nav-title">فضای مدیریت</span>
          {navItems.map((item) => (
            <button key={item.id} type="button" className={active === item.id ? "is-active" : ""} onClick={() => selectTab(item.id)} aria-current={active === item.id ? "page" : undefined} title={item.label}>
              <span className="ka-nav-icon"><AdminIcon name={item.id} /></span>
              <span className="ka-nav-copy"><strong>{item.label}</strong><small>{item.caption}</small></span>
              {item.badge && <b>{item.badge}</b>}
            </button>
          ))}
        </nav>
        <div className="ka-sidebar-status">
          <span><i />سامانه در دسترس</span>
          <small>داده‌ها فقط از JSON محلی</small>
        </div>
        <div className="ka-profile">
          <span className="ka-profile-avatar">ک ک<i /></span>
          <div><strong>{demo.company.manager}</strong><small>{demo.company.managerRole}</small></div>
          <button type="button" aria-label="تنظیمات پروفایل">•••</button>
        </div>
        <button type="button" className="ka-sidebar-handle" onClick={() => setSidebarOpen((open) => !open)} aria-label={sidebarOpen ? "جمع کردن منو" : "باز کردن منو"} aria-expanded={sidebarOpen}>
          <AdminIcon name="arrow" />
        </button>
      </aside>
      <section className="ka-main">
        <header className="ka-topbar">
          <div className="ka-breadcrumb">
            <button className="ka-mobile-menu" type="button" onClick={() => setSidebarOpen(true)} aria-label="باز کردن منو"><AdminIcon name="menu" /></button>
            <div><small>پنل مدیریت / {activeItem.caption}</small><strong>{activeItem.label}</strong></div>
          </div>
          <div className="ka-top-actions">
            <label className="ka-global-search">
              <AdminIcon name="search" />
              <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`جست‌وجو در ${activeItem.label}...`} />
              <kbd>Ctrl K</kbd>
              {query && <button type="button" onClick={() => setQuery("")} aria-label="پاک کردن جست‌وجو"><AdminIcon name="close" /></button>}
            </label>
            <div className="ka-notification-wrap">
              <button type="button" className={`ka-icon-button ${notificationsOpen ? "is-active" : ""}`} onClick={() => setNotificationsOpen((open) => !open)} aria-label="اعلان‌ها" aria-expanded={notificationsOpen}><AdminIcon name="bell" /><b>۳</b></button>
              {notificationsOpen && <div className="ka-notification-panel"><header><div><strong>اعلان‌ها</strong><small>۳ مورد تازه</small></div><button onClick={() => setNotificationsOpen(false)}>بستن</button></header>{demo.notifications.map((item) => <button type="button" key={item.id} className="ka-notification-item" onClick={() => setNotificationsOpen(false)}><i className={`is-${item.tone}`} /><div><strong>{item.title}</strong><small>{item.meta}</small></div><AdminIcon name="chevron" /></button>)}<footer>مشاهده همه اعلان‌ها</footer></div>}
            </div>
            <span className="ka-today"><i />{demo.company.today}</span>
          </div>
        </header>
        <div className="ka-content" key={active}>
          <AdminWorkspace active={active} query={query} onQuery={setQuery} onNavigate={(id) => selectTab(id)} />
        </div>
      </section>
    </main>
  );
}
