"use client";

import demo from "@/data/admin-demo.json";

const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];
const income = [42, 55, 49, 68, 63, 86];
const expense = [28, 34, 39, 43, 51, 48];

export function AdminModernCharts() {
  return (
    <section className="ka-modern-analytics" aria-label="نمودارهای مدیریتی">
      <article className="ka-card ka-area-chart-card">
        <header className="ka-chart-head">
          <div><span>تحلیل عملکرد مالی</span><h3>روند درآمد و هزینه</h3></div>
          <div className="ka-chart-period"><button className="is-active">۶ ماه</button><button>سالانه</button></div>
        </header>
        <div className="ka-chart-totals">
          <div><i className="is-income" /><span>درآمد تجمیعی</span><strong>۳۶۳ <small>میلیارد</small></strong><b>+۱۸.۶٪</b></div>
          <div><i className="is-expense" /><span>هزینه تجمیعی</span><strong>۲۴۳ <small>میلیارد</small></strong><b>+۷.۲٪</b></div>
        </div>
        <div className="ka-area-chart-wrap">
          <svg viewBox="0 0 720 230" role="img" aria-label="نمودار درآمد و هزینه شش ماه اخیر" preserveAspectRatio="none">
            <defs>
              <linearGradient id="kaIncomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bb8050" stopOpacity=".32" /><stop offset="1" stopColor="#bb8050" stopOpacity="0" /></linearGradient>
              <linearGradient id="kaExpenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#55738c" stopOpacity=".2" /><stop offset="1" stopColor="#55738c" stopOpacity="0" /></linearGradient>
              <filter id="kaLineGlow"><feGaussianBlur stdDeviation="2.2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            {[30, 75, 120, 165, 210].map((y) => <line key={y} x1="0" x2="720" y1={y} y2={y} className="ka-chart-gridline" />)}
            <path d="M0 172 C55 164 85 128 144 136 S235 150 288 116 S382 74 432 88 S526 110 576 72 S665 44 720 28 L720 220 L0 220Z" fill="url(#kaIncomeFill)" />
            <path d="M0 184 C60 176 90 162 144 166 S236 150 288 154 S382 128 432 138 S520 110 576 118 S670 108 720 112 L720 220 L0 220Z" fill="url(#kaExpenseFill)" />
            <path d="M0 172 C55 164 85 128 144 136 S235 150 288 116 S382 74 432 88 S526 110 576 72 S665 44 720 28" className="ka-income-line" filter="url(#kaLineGlow)" />
            <path d="M0 184 C60 176 90 162 144 166 S236 150 288 154 S382 128 432 138 S520 110 576 118 S670 108 720 112" className="ka-expense-line" />
            <circle cx="720" cy="28" r="5" className="ka-income-point" /><circle cx="720" cy="112" r="5" className="ka-expense-point" />
          </svg>
          <div className="ka-area-tooltip"><span>شهریور</span><strong>۸۶ میلیارد</strong><small>۱۸.۶٪ رشد</small></div>
        </div>
        <footer>{months.map((month, index) => <span key={month}><b>{month}</b><small>{income[index]}/{expense[index]}</small></span>)}</footer>
      </article>

      <article className="ka-card ka-donut-card">
        <header className="ka-chart-head"><div><span>ترکیب سبد پروژه</span><h3>بودجه بر اساس نوع</h3></div><b>{demo.projects.length} پروژه</b></header>
        <div className="ka-donut-wrap">
          <div className="ka-donut"><span><strong>۴۲۵</strong><small>میلیارد تومان</small></span></div>
          <div className="ka-donut-legend">
            <span><i className="is-residential" /><div><b>مسکونی و ویلایی</b><small>۴۷٪ · ۱۹۹ میلیارد</small></div><strong>۲</strong></span>
            <span><i className="is-commercial" /><div><b>اداری و تجاری</b><small>۳۴٪ · ۱۴۴ میلیارد</small></div><strong>۲</strong></span>
            <span><i className="is-renovation" /><div><b>مرمت و بازآفرینی</b><small>۱۹٪ · ۸۲ میلیارد</small></div><strong>۱</strong></span>
          </div>
        </div>
        <div className="ka-donut-note"><span>بیشترین سهم بودجه</span><strong>مجموعه اداری صفه</strong><b>۲۴۰ میلیارد</b></div>
      </article>

      <article className="ka-card ka-goal-card">
        <header className="ka-chart-head"><div><span>هدف ماهانه</span><h3>پیشروی شهریور</h3></div><b>۲۱ روز مانده</b></header>
        <div className="ka-goal-ring"><span><strong>۷۴٪</strong><small>تحقق هدف</small></span></div>
        <div className="ka-goal-values"><span><small>محقق‌شده</small><strong>۲۶.۲ میلیارد</strong></span><span><small>هدف ماه</small><strong>۳۵.۴ میلیارد</strong></span></div>
        <div className="ka-goal-sparks">{[38, 54, 46, 63, 58, 78, 70, 88, 82, 96].map((height, index) => <i key={index} className={index > 7 ? "is-projected" : ""} style={{ height: `${height}%` }} />)}</div>
        <p><i />با روند فعلی، هدف در روز ۲۵ شهریور تکمیل می‌شود.</p>
      </article>
    </section>
  );
}
