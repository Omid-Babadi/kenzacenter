"use client";

import { useMemo, useState } from "react";
import { CoolOverview } from "./AdminOverview";
import { DemoWorkspace, type WorkspaceId } from "./AdminWorkspace";

type NavId = "overview" | WorkspaceId | "settings";

const navItems: { id: NavId; label: string; group: "main" | "manage"; badge?: string }[] = [
  { id: "overview", label: "نمای کلی", group: "main" }, { id: "customers", label: "مشتریان", group: "main" }, { id: "accounting", label: "حسابداری", group: "main" }, { id: "projects", label: "پروژه‌ها", group: "main", badge: "۱۲" }, { id: "blogs", label: "بلاگ‌ها", group: "main" }, { id: "inventory", label: "انبارداری", group: "main", badge: "۳" }, { id: "users", label: "کاربران", group: "main" }, { id: "contracts", label: "قراردادها", group: "manage" }, { id: "messages", label: "پیام‌ها", group: "manage", badge: "۸" }, { id: "reports", label: "گزارش‌ها", group: "manage" }, { id: "settings", label: "تنظیمات", group: "manage" },
];

const Icon = ({ name }: { name: string }) => {
  const paths: Record<string, string> = {
    overview: "M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Z", customers: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", accounting: "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-8", projects: "m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-5", blogs: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Zm0 0v6h6M8 13h8M8 17h5", inventory: "m21 8-9-5-9 5 9 5 9-5ZM3 8v10l9 5 9-5V8M12 13v10", users: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", contracts: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Zm0 0v6h6M8 13h8M8 17h5", messages: "M4 4h16v13H4zM4 13h4l2 3h4l2-3h4", reports: "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-8", settings: "M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2 2-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V20h-3v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06-2-2 .06-.06A1.65 1.65 0 0 0 7.46 15a1.65 1.65 0 0 0-1.51-1H5.86v-3h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06 2-2 .06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V4.91h3V5a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06 2 2-.06.06A1.65 1.65 0 0 0 19.4 10v.01a1.65 1.65 0 0 0 1.51 1H21v3h-.09a1.65 1.65 0 0 0-1.51 1Z", search: "m21 21-4.5-4.5M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z", bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4", menu: "M4 7h16M4 12h16M4 17h16", check: "m5 12 4 4L19 6",
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.overview} /></svg>;
};

function SettingsPanel() {
  const [saved, setSaved] = useState(false);
  const [alerts, setAlerts] = useState({ finance: true, project: true, weekly: false });
  const toggle = (name: keyof typeof alerts) => setAlerts((value) => ({ ...value, [name]: !value[name] }));
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 2800); };
  const notificationOptions: { id: keyof typeof alerts; label: string }[] = [
    { id: "finance", label: "سررسیدهای مالی و پرداخت" }, { id: "project", label: "تغییر وضعیت پروژه‌ها" }, { id: "weekly", label: "گزارش هفتگی مدیریت" },
  ];
  return <section className="ad-settings-workspace ad-workspace-view">
    <header className="ad-page-intro ad-workspace-heading"><div><span>پیکربندی فضای کاری</span><h1>تنظیمات پنل</h1><p>ظاهر، اعلان‌ها و اطلاعات برند را در این نسخه‌ی نمایشی شخصی‌سازی کنید.</p></div><button className="ad-primary-button" onClick={save}><Icon name="check" />ذخیره‌ی تغییرات</button></header>
    <div className="ad-settings-grid"><article className="ad-card ad-settings-card"><div className="ad-settings-title"><Icon name="overview" /><div><h2>هویت فضای کاری</h2><p>این اطلاعات فقط در همین مرورگر و برای نمایش دمو تغییر می‌کنند.</p></div></div><div className="ad-form-grid"><label><span>نام مجموعه</span><input defaultValue="کنزا" /></label><label><span>شهر اصلی فعالیت</span><input defaultValue="اصفهان" /></label><label><span>نام مدیر</span><input defaultValue="کیارش کیانی" /></label><label><span>شماره تماس</span><input defaultValue="۰۳۱ ۳۶۶۱ ۲۴۰۰" /></label></div></article><article className="ad-card ad-settings-card"><div className="ad-settings-title"><Icon name="bell" /><div><h2>اعلان‌ها و پیگیری</h2><p>انتخاب کنید کدام رویدادها در پنل به شما یادآوری شوند.</p></div></div><div className="ad-toggle-list">{notificationOptions.map((option) => <label key={option.id}><span>{option.label}</span><input type="checkbox" checked={alerts[option.id]} onChange={() => toggle(option.id)} /><i /></label>)}</div></article></div>
    <article className="ad-card ad-settings-card ad-settings-note"><span className="ad-card-kicker">حالت دمو</span><h2>همه‌چیز برای ارائه آماده است.</h2><p>دکمه‌ها، فیلترها و فرم‌ها واکنش محلی دارند، اما هیچ حساب کاربری یا پایگاه داده‌ای در این نسخه متصل نیست.</p><div><span><i />ذخیره‌سازی محلی</span><span><i />بدون ورود به حساب</span><span><i />آماده‌ی نمایش موبایل</span></div></article>{saved && <div className="ad-demo-toast" role="status"><Icon name="check" />تنظیمات نمونه با موفقیت به‌روزرسانی شد.</div>}
  </section>;
}

export function AdminDashboard() {
  const [active, setActive] = useState<NavId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const activeLabel = useMemo(() => navItems.find((item) => item.id === active)?.label ?? "نمای کلی", [active]);
  const selectTab = (id: NavId) => { setActive(id); setSidebarOpen(false); setQuery(""); };
  const mainItems = navItems.filter((item) => item.group === "main");
  const manageItems = navItems.filter((item) => item.group === "manage");
  return <main className="ad-shell"><button className={`ad-overlay ${sidebarOpen ? "is-visible" : ""}`} aria-label="بستن منو" onClick={() => setSidebarOpen(false)} /><aside className={`ad-sidebar ${sidebarOpen ? "is-open" : ""}`}><div className="ad-brand"><div><strong>کنزا</strong><span>KENZA</span></div><small>پنل دمو</small></div><div className="ad-workspace"><span className="ad-workspace-mark">ک</span><div><strong>فضای مدیریت</strong><span>اصفهان · ایران</span></div><span>⌄</span></div><nav className="ad-nav"><span className="ad-nav-label">منوی اصلی</span>{mainItems.map((item) => <button type="button" key={item.id} onClick={() => selectTab(item.id)} className={active === item.id ? "is-active" : ""} aria-current={active === item.id ? "page" : undefined}><Icon name={item.id} /><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</button>)}<span className="ad-nav-label ad-nav-label-second">مدیریت</span>{manageItems.map((item) => <button type="button" key={item.id} onClick={() => selectTab(item.id)} className={active === item.id ? "is-active" : ""} aria-current={active === item.id ? "page" : undefined}><Icon name={item.id} /><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</button>)}</nav><div className="ad-sidebar-foot"><span className="ad-admin-avatar">ک</span><div><strong>کیارش کیانی</strong><span>مدیر ارشد</span></div><button type="button" onClick={() => selectTab("settings")} aria-label="تنظیمات حساب">•••</button></div></aside><div className="ad-main"><header className="ad-topbar"><div className="ad-topbar-title"><button type="button" className="ad-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="باز کردن منو"><Icon name="menu" /></button><div><small>داشبورد کنزا /</small><strong>{activeLabel}</strong></div></div><div className="ad-topbar-actions"><label className="ad-global-search"><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی سریع…" /><kbd>⌘ K</kbd></label><button type="button" className="ad-icon-button" aria-label="اعلان‌ها"><Icon name="bell" /><i /></button><span className="ad-demo-chip"><i />دموی تعاملی</span></div></header><div className="ad-content" key={active}>{active === "overview" && <CoolOverview />}{active === "settings" && <SettingsPanel />}{active !== "overview" && active !== "settings" && <DemoWorkspace active={active} query={query} onQuery={setQuery} />}</div></div><div className="ad-grain" aria-hidden="true" /></main>;
}
