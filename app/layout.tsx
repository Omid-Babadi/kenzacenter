import type { Metadata, Viewport } from "next";
import "@fontsource-variable/estedad";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kenza.example"),
  title: {
    default: "کنزا | طراحی، ساخت و توسعه",
    template: "%s | کنزا",
  },
  description:
    "کنزا؛ مجموعه طراحی، پیمانکاری، مدیریت ساخت، بازسازی و مشارکت در ساخت با تمرکز بر اصفهان و فعالیت در سراسر ایران.",
  keywords: [
    "کنزا",
    "ساخت و ساز",
    "پیمانکاری",
    "طراحی معماری",
    "مدیریت ساخت",
    "بازسازی",
    "مشارکت در ساخت",
    "اصفهان",
  ],
  openGraph: {
    title: "کنزا | برای ماندن می‌سازیم",
    description: "از اولین خط طراحی تا آخرین جزئیات اجرا، کنار پروژه می‌مانیم.",
    locale: "fa_IR",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#e9e6de",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
