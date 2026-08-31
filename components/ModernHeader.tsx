"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "خدمات" },
  { href: "#gallery", label: "گالری" },
  { href: "#about", label: "درباره ما" },
  { href: "#contact", label: "تماس" },
];

export function ModernHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="p-header">
      <a className="p-logo" href="#top" onClick={() => setOpen(false)} aria-label="کنزا، صفحه اصلی">
        <span>کنزا</span>
        <small lang="en">KENZA</small>
      </a>

      <nav className="p-nav" aria-label="ناوبری اصلی">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>

      <a className="p-header-cta" href="#contact">
        مشاوره پروژه
        <span aria-hidden="true">↙</span>
      </a>

      <button
        type="button"
        className="p-menu-button"
        aria-label={open ? "بستن منو" : "باز کردن منو"}
        aria-expanded={open}
        aria-controls="p-mobile-menu"
        onClick={() => setOpen((current) => !current)}
      >
        <i />
        <i />
      </button>

      <div id="p-mobile-menu" className={`p-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav>
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <small>۰{index + 1}</small>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="p-mobile-call" href="tel:+983136200000" dir="ltr">+98 31 3620 0000</a>
      </div>
    </header>
  );
}
