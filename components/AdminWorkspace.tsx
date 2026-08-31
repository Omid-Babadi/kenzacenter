"use client";

import { useMemo, useState } from "react";

export type WorkspaceId =
  | "customers"
  | "accounting"
  | "projects"
  | "blogs"
  | "inventory"
  | "users"
  | "contracts"
  | "messages"
  | "reports";

type Props = {
  active: WorkspaceId;
  query: string;
  onQuery: (value: string) => void;
};

type Notice = { text: string; tone?: "success" | "warm" } | null;

const Icon = ({ name }: { name: string }) => {
  const paths: Record<string, string> = {
    plus: "M12 5v14M5 12h14", search: "m21 21-4.5-4.5M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    arrow: "m9 18 6-6-6-6", check: "m5 12 4 4L19 6", dots: "M5 12h.01M12 12h.01M19 12h.01",
    paper: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Zm0 0v6h6M8 13h8M8 17h5",
    inbox: "M4 4h16v13H4zM4 13h4l2 3h4l2-3h4", box: "m21 8-9-5-9 5 9 5 9-5ZM3 8v10l9 5 9-5V8M12 13v10",
    user: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    chart: "M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-8", calendar: "M7 3v3M17 3v3M4 9h16M5 5h14v16H5z",
    filter: "M4 5h16M7 12h10M10 19h4", send: "m22 2-7 20-4-9-9-4Z",
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.paper} /></svg>;
};

const statusClass = (label: string) => {
  if (/فعال|منتشر|آماده|تأیید|وصول|پاسخ/.test(label)) return "is-good";
  if (/کمبود|تاخیر|بررسی|نیازمند/.test(label)) return "is-alert";
  if (/پیگیری|مذاکره|انتظار|پیش/.test(label)) return "is-wait";
  return "is-neutral";
};

function Heading({ eyebrow, title, description, action, onAction }: { eyebrow: string; title: string; description: string; action: string; onAction: () => void }) {
  return <header className="ad-page-intro ad-workspace-heading">
    <div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
    <button className="ad-primary-button" onClick={onAction}><Icon name="plus" />{action}</button>
  </header>;
}

function Segment({ items, value, onChange }: { items: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="ad-segment" role="tablist">{items.map((item) => <button key={item} className={item === value ? "is-active" : ""} onClick={() => onChange(item)}>{item}</button>)}</div>;
}

function Stat({ label, value, note, tone = "copper" }: { label: string; value: string; note: string; tone?: "copper" | "green" | "dark" }) {
  return <article className={`ad-card ad-mini-stat ad-stagger ad-tone-${tone}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}

function SearchBox({ value, onChange, placeholder = "جست‌وجو در این بخش" }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="ad-workspace-search"><Icon name="search" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

function Empty({ title }: { title: string }) {
  return <div className="ad-workspace-empty"><span>✦</span><strong>{title}</strong><p>می‌توانید نمونه‌ی تازه‌ای ایجاد کنید یا عبارت دیگری را جست‌وجو کنید.</p></div>;
}

function Modal({ title, text, onClose, onConfirm, confirm = "ثبت نمونه" }: { title: string; text: string; onClose: () => void; onConfirm: () => void; confirm?: string }) {
  return <div className="ad-demo-modal" role="dialog" aria-modal="true" aria-label={title}>
    <button className="ad-demo-modal-backdrop" aria-label="بستن" onClick={onClose} />
    <div className="ad-demo-dialog"><button className="ad-dialog-close" onClick={onClose}>×</button><span className="ad-card-kicker">دموی تعاملی</span><h2>{title}</h2><p>{text}</p>
      <label className="ad-dialog-field"><span>عنوان نمونه</span><input defaultValue="مورد جدید کنزا" /></label>
      <div className="ad-dialog-actions"><button className="ad-text-button" onClick={onClose}>انصراف</button><button className="ad-primary-button" onClick={onConfirm}><Icon name="check" />{confirm}</button></div>
    </div>
  </div>;
}

function Customers({ query, onQuery, notify }: { query: string; onQuery: Props["onQuery"]; notify: (text: string) => void }) {
  const [stage, setStage] = useState("همه");
  const [dialog, setDialog] = useState(false);
  const [leads, setLeads] = useState([
    { name: "آرمان نیک‌فر", project: "رزیدنس چهارباغ", value: "۲۸ میلیارد", stage: "جلسه", initials: "آ ن" },
    { name: "شرکت توسعه سپاهان", project: "مجموعه صفه", value: "۱۲۰ میلیارد", stage: "پیگیری", initials: "ت س" },
    { name: "سارا رستگار", project: "خانه جلفا", value: "۴۶ میلیارد", stage: "جدید", initials: "س ر" },
    { name: "کیوان پارسامَنش", project: "ویلای باغ‌بهادران", value: "۳۲ میلیارد", stage: "برآورد", initials: "ک پ" },
  ]);
  const filtered = useMemo(() => leads.filter((lead) => (stage === "همه" || lead.stage === stage) && `${lead.name} ${lead.project}`.includes(query)), [leads, stage, query]);
  const addLead = () => { setLeads((items) => [{ name: "پرهام آذر", project: "بازطراحی دفتر مرکزی", value: "۱۸ میلیارد", stage: "جدید", initials: "پ آ" }, ...items]); setDialog(false); notify("سرنخ نمونه به فهرست مشتریان اضافه شد."); };
  return <><Heading eyebrow="ارتباط با مشتری" title="میز کار مشتریان" description="هر سرنخ را از اولین تماس تا قرارداد، در یک نمای متمرکز دنبال کنید." action="سرنخ جدید" onAction={() => setDialog(true)} />
    <div className="ad-mini-stat-grid"><Stat label="سرنخ‌های این ماه" value="۲۸" note="۶ مورد آماده‌ی جلسه" /><Stat label="ارزش فرصت‌ها" value="۲۴۶ میلیارد" note="تا پایان پاییز" tone="dark" /><Stat label="نرخ تبدیل" value="۳۶٪" note="۵٪ بهتر از ماه قبل" tone="green" /></div>
    <section className="ad-card ad-workspace-card"><div className="ad-workspace-toolbar"><Segment items={["همه", "جدید", "پیگیری", "جلسه", "برآورد"]} value={stage} onChange={setStage} /><SearchBox value={query} onChange={onQuery} placeholder="نام مشتری یا پروژه" /></div>
      <div className="ad-lead-grid">{filtered.map((lead, index) => <article className="ad-lead-card ad-stagger" style={{ "--delay": `${index * 45}ms` } as React.CSSProperties} key={`${lead.name}-${lead.project}`}><div className="ad-lead-top"><span className="ad-initials">{lead.initials}</span><span className={`ad-status ${statusClass(lead.stage)}`}>{lead.stage}</span></div><h2>{lead.name}</h2><p>{lead.project}</p><div><span>برآورد همکاری</span><strong>{lead.value}</strong></div><button className="ad-text-button" onClick={() => notify(`کارت «${lead.name}» برای پیگیری انتخاب شد.`)}>مشاهده‌ی پرونده <Icon name="arrow" /></button></article>)}</div>{!filtered.length && <Empty title="مشتری مطابق جست‌وجو پیدا نشد" />}
    </section>{dialog && <Modal title="ثبت سرنخ جدید" text="با ثبت این فرم، یک مشتری ساختگی برای نمایش جریان کاری پنل ایجاد می‌شود." onClose={() => setDialog(false)} onConfirm={addLead} />}</>;
}

function Accounting({ notify }: { notify: (text: string) => void }) {
  const [range, setRange] = useState("ماه جاری");
  const [docs, setDocs] = useState([
    ["KNZ-۱۴۰۵-۲۸۱", "صورت‌وضعیت اجرای نما", "۴٫۸ میلیارد", "تأیید شده"],
    ["KNZ-۱۴۰۵-۲۸۰", "خرید پروفیل و اتصالات", "۱٫۳ میلیارد", "در انتظار"],
    ["KNZ-۱۴۰۵-۲۷۹", "پیش‌پرداخت پیمانکار برق", "۸۷۰ میلیون", "پرداخت شده"],
  ]);
  const addDocument = () => { setDocs((rows) => [["KNZ-۱۴۰۵-۲۸۲", "هزینه‌ی نمونه‌ی جدید", "۳۴۰ میلیون", "در انتظار"], ...rows]); notify("سند نمونه ثبت شد؛ در این نسخه داده‌ها دائمی نیستند."); };
  return <><Heading eyebrow="مالی و پرداخت‌ها" title="جریان نقدی پروژه‌ها" description="دریافت‌ها، تعهدات و اسناد اجرایی را به‌صورت زنده در کنار هم مرور کنید." action="ثبت سند" onAction={addDocument} />
    <div className="ad-mini-stat-grid"><Stat label="دریافت نقدی" value="۱۲٫۸ میلیارد" note="۱۸٫۴٪ رشد ماهانه" tone="green" /><Stat label="پرداخت برنامه‌ریزی‌شده" value="۶٫۱ میلیارد" note="تا ۱۰ روز آینده" /><Stat label="مطالبات جاری" value="۴٫۲ میلیارد" note="۳ سند نیازمند پیگیری" tone="dark" /></div>
    <div className="ad-finance-grid"><section className="ad-card ad-finance-chart"><div className="ad-card-head"><div><span className="ad-card-kicker">خلاصه‌ی مالی</span><h2>{range === "ماه جاری" ? "۱۲٫۸ میلیارد تومان" : range === "سه‌ماهه" ? "۳۴٫۶ میلیارد تومان" : "۱۰۴٫۲ میلیارد تومان"}</h2><p>دریافت نقدی <b>+۱۸٫۴٪</b></p></div><Segment items={["ماه جاری", "سه‌ماهه", "سال"]} value={range} onChange={setRange} /></div><div className="ad-bars" aria-label="نمودار درآمد"><i style={{ height: "34%" }} /><i style={{ height: "53%" }} /><i style={{ height: "44%" }} /><i style={{ height: "68%" }} /><i style={{ height: "58%" }} /><i style={{ height: "84%" }} /><i className="is-last" style={{ height: "72%" }} /></div><div className="ad-bars-labels"><span>فروردین</span><span>اردیبهشت</span><span>خرداد</span><span>تیر</span><span>مرداد</span><span>شهریور</span><span>مهر</span></div></section>
      <section className="ad-card ad-finance-summary"><span className="ad-card-kicker">تقویم پرداخت</span><h3>۲ پرداخت در این هفته</h3><ul><li><i /><div><strong>تأمین سنگ آریا</strong><span>سه‌شنبه، ۱۶ شهریور</span></div><b>۸۶۰ میلیون</b></li><li><i /><div><strong>پیمانکار تأسیسات</strong><span>پنج‌شنبه، ۱۸ شهریور</span></div><b>۳۲۰ میلیون</b></li></ul><button className="ad-text-button" onClick={() => notify("تقویم پرداخت دموی کنزا به‌روزرسانی شد.")}>مشاهده‌ی تقویم <Icon name="arrow" /></button></section></div>
    <section className="ad-card ad-workspace-card ad-records"><div className="ad-records-title"><div><span className="ad-card-kicker">آخرین اسناد</span><h2>گردش حساب‌ها</h2></div><span className="ad-live-dot">آخرین همگام‌سازی: همین حالا</span></div>{docs.map((doc) => <button className="ad-record-row" key={doc[0]} onClick={() => notify(`جزئیات سند ${doc[0]} باز شد.`)}><span><Icon name="paper" /></span><div><strong>{doc[1]}</strong><small>{doc[0]} · رزیدنس چهارباغ</small></div><b>{doc[2]}</b><em className={`ad-status ${statusClass(doc[3])}`}>{doc[3]}</em><Icon name="arrow" /></button>)}</section></>;
}

function Projects({ notify }: { notify: (text: string) => void }) {
  const [filter, setFilter] = useState("همه");
  const [selected, setSelected] = useState<string | null>(null);
  const [items, setItems] = useState([
    { name: "رزیدنس چهارباغ", type: "مسکونی", progress: 72, owner: "مهندس مرادی", status: "طبق برنامه", milestone: "اتمام پوسته‌ی نما" },
    { name: "مجموعه صفه", type: "تجاری ـ اداری", progress: 48, owner: "مهندس زمانی", status: "نیازمند بررسی", milestone: "تأیید نقشه‌های سازه" },
    { name: "خانه جلفا", type: "بازآفرینی", progress: 89, owner: "مهندس نیک‌پی", status: "طبق برنامه", milestone: "نصب روشنایی حیاط" },
    { name: "برج باغ نور", type: "مسکونی", progress: 34, owner: "مهندس کیانی", status: "در حال اجرا", milestone: "بتن‌ریزی طبقه هفتم" },
  ]);
  const filtered = items.filter((project) => filter === "همه" || (filter === "طبق برنامه" ? project.status === "طبق برنامه" : project.status !== "طبق برنامه"));
  const addProject = () => { setItems((value) => [{ name: "خانه‌ی باغ نقش‌جهان", type: "مسکونی", progress: 8, owner: "مهندس کیانی", status: "در حال اجرا", milestone: "تکمیل مطالعات اولیه" }, ...value]); notify("پروژه‌ی نمونه ایجاد شد."); };
  return <><Heading eyebrow="کنترل اجرا" title="برد پروژه‌های کنزا" description="هر پروژه یک پرونده‌ی زنده است؛ وضعیت، گام بعدی و تیم مسئول را از همین‌جا مرور کنید." action="پروژه جدید" onAction={addProject} />
    <section className="ad-card ad-workspace-card"><div className="ad-workspace-toolbar"><Segment items={["همه", "طبق برنامه", "نیازمند توجه"]} value={filter} onChange={setFilter} /><span className="ad-project-count">{items.length} پروژه‌ی فعال</span></div><div className="ad-project-board">{filtered.map((project, index) => <button className="ad-project-tile ad-stagger" style={{ "--delay": `${index * 50}ms` } as React.CSSProperties} key={project.name} onClick={() => setSelected(project.name)}><div><span className={`ad-status ${statusClass(project.status)}`}>{project.status}</span><span className="ad-tile-index">۰{index + 1}</span></div><h2>{project.name}</h2><p>{project.type} · {project.owner}</p><div className="ad-tile-progress"><span><i style={{ width: `${project.progress}%` }} /></span><b>{project.progress}٪</b></div><small>گام بعدی: {project.milestone}</small></button>)}</div></section>
    {selected && <aside className="ad-project-drawer"><button className="ad-demo-modal-backdrop" onClick={() => setSelected(null)} aria-label="بستن" /><div><button className="ad-dialog-close" onClick={() => setSelected(null)}>×</button><span className="ad-card-kicker">پرونده‌ی پروژه</span><h2>{selected}</h2><p>نمای تفصیلی این پروژه برای دمو آماده است؛ پیشرفت‌ها و تصمیم‌های اخیر در اینجا دیده می‌شوند.</p><div className="ad-drawer-progress"><strong>{items.find((item) => item.name === selected)?.progress}٪</strong><span>پیشرفت اجرایی</span></div><ul className="ad-drawer-list"><li><i />بازدید ناظر برای فردا ثبت شده است.</li><li><i />آخرین گزارش کارگاهی بارگذاری شد.</li><li><i />بودجه با برنامه‌ی مصوب هم‌راستا است.</li></ul><button className="ad-primary-button" onClick={() => { setSelected(null); notify("یادآور جلسه‌ی پروژه ثبت شد."); }}><Icon name="calendar" />ثبت یادآور جلسه</button></div></aside>}</>;
}

function Blogs({ notify }: { notify: (text: string) => void }) {
  const [view, setView] = useState("همه");
  const [posts, setPosts] = useState([
    { title: "چطور هزینه‌ی ساخت را کنترل کنیم؟", category: "مدیریت ساخت", state: "منتشر شده", views: "۲٬۴۸۰", color: "sand" },
    { title: "جزئیات اجرای نمای سنگ خشک", category: "جزئیات اجرایی", state: "منتشر شده", views: "۱٬۷۹۰", color: "ink" },
    { title: "بازآفرینی خانه‌های تاریخی جلفا", category: "بازسازی", state: "پیش‌نویس", views: "—", color: "olive" },
    { title: "معماری و ارزش ماندگار", category: "دیدگاه", state: "در بازبینی", views: "—", color: "clay" },
  ]);
  const visible = posts.filter((post) => view === "همه" || (view === "منتشر شده" ? post.state === "منتشر شده" : post.state !== "منتشر شده"));
  const addPost = () => { setPosts((items) => [{ title: "یادداشت تازه‌ی کنزا", category: "دیدگاه", state: "پیش‌نویس", views: "—", color: "sand" }, ...items]); notify("پیش‌نویس تازه به تقویم محتوا اضافه شد."); };
  return <><Heading eyebrow="رسانه‌ی کنزا" title="اتاق محتوا" description="مقاله‌ها، یادداشت‌های کارگاهی و روایت پروژه‌ها را در یک تقویم سبک مدیریت کنید." action="مطلب جدید" onAction={addPost} />
    <section className="ad-card ad-workspace-card"><div className="ad-workspace-toolbar"><Segment items={["همه", "منتشر شده", "پیش‌نویس‌ها"]} value={view} onChange={setView} /><button className="ad-quiet-action" onClick={() => notify("تقویم انتشار برای این هفته مرتب شد.")}><Icon name="calendar" />تقویم انتشار</button></div><div className="ad-post-grid">{visible.map((post, index) => <article className={`ad-post-card ad-post-${post.color} ad-stagger`} style={{ "--delay": `${index * 55}ms` } as React.CSSProperties} key={`${post.title}-${index}`}><div className="ad-post-cover"><span>{post.category}</span><i /></div><div className="ad-post-copy"><span className={`ad-status ${statusClass(post.state)}`}>{post.state}</span><h2>{post.title}</h2><p>ویرایش امروز · {post.views} بازدید</p><button className="ad-text-button" onClick={() => notify(`ویرایشگر دموی «${post.title}» باز شد.`)}>باز کردن و ویرایش <Icon name="arrow" /></button></div></article>)}</div></section></>;
}

function Inventory({ notify }: { notify: (text: string) => void }) {
  const [items, setItems] = useState([
    { code: "MAT-۰۱۲۸", name: "سنگ تراورتن عباس‌آباد", stock: "۲٬۴۸۰ مترمربع", location: "انبار مرکزی", state: "موجود" },
    { code: "MAT-۰۱۸۴", name: "پروفیل ۴۰×۸۰", stock: "۱۸۶ شاخه", location: "کارگاه صفه", state: "کمبود موجودی" },
    { code: "MAT-۰۲۲۱", name: "چسب اپوکسی سنگ", stock: "۳۸ سطل", location: "کارگاه چهارباغ", state: "سفارش‌گذاری" },
  ]);
  const register = () => { setItems((rows) => [{ code: "MAT-۰۲۴۰", name: "اتصالات گالوانیزه", stock: "۱۲۰ بسته", location: "انبار مرکزی", state: "موجود" }, ...rows]); notify("ورود کالای نمونه ثبت و موجودی به‌روز شد."); };
  return <><Heading eyebrow="مصالح و تجهیزات" title="دیدبان انبار" description="موجودی‌های حساس، ورودی‌ها و نیازهای تأمین را پیش از اثرگذاری بر کارگاه ببینید." action="ثبت ورود کالا" onAction={register} />
    <div className="ad-mini-stat-grid"><Stat label="ارزش موجودی" value="۱۸٫۲ میلیارد" note="در ۳ محل نگهداری" /><Stat label="اقلام حساس" value="۳ مورد" note="نیازمند تأمین تا پنج روز" tone="dark" /><Stat label="ورود امروز" value="۱۱ قلم" note="آخرین ثبت: ۱۱:۴۰" tone="green" /></div>
    <section className="ad-card ad-workspace-card ad-inventory-card"><div className="ad-warehouse-strip"><span className="ad-card-kicker">محل نگهداری</span><button className="is-active">انبار مرکزی <b>۲۸</b></button><button onClick={() => notify("موجودی کارگاه صفه: ۱۴ قلم فعال")}>کارگاه صفه <b>۱۴</b></button><button onClick={() => notify("موجودی کارگاه چهارباغ: ۱۹ قلم فعال")}>کارگاه چهارباغ <b>۱۹</b></button></div><div className="ad-stock-list">{items.map((item, index) => <button key={item.code} className="ad-stock-row ad-stagger" style={{ "--delay": `${index * 40}ms` } as React.CSSProperties} onClick={() => notify(`کارت موجودی «${item.name}» انتخاب شد.`)}><span className="ad-stock-icon"><Icon name="box" /></span><div><strong>{item.name}</strong><small>{item.code} · {item.location}</small></div><b>{item.stock}</b><em className={`ad-status ${statusClass(item.state)}`}>{item.state}</em><Icon name="arrow" /></button>)}</div></section></>;
}

function Users({ notify }: { notify: (text: string) => void }) {
  const [group, setGroup] = useState("همه");
  const people = [
    { name: "نیما سعیدی", role: "مشتری ویژه", initials: "ن س", project: "رزیدنس چهارباغ", last: "امروز، ۱۰:۴۵" },
    { name: "مهسا شریفی", role: "سرمایه‌گذار", initials: "م ش", project: "برج باغ نور", last: "دیروز" },
    { name: "آرین زمانی", role: "پیمانکار", initials: "آ ز", project: "مجموعه صفه", last: "۳ روز پیش" },
    { name: "سحر موسوی", role: "مالک", initials: "س م", project: "خانه جلفا", last: "۵ روز پیش" },
  ];
  const visible = people.filter((person) => group === "همه" || person.role === group);
  return <><Heading eyebrow="باشگاه مشتریان" title="جامعه‌ی کنزا" description="پروفایل افراد، نقش آن‌ها و آخرین نقطه‌ی تماس را در یک نگاه در اختیار داشته باشید." action="کاربر جدید" onAction={() => notify("فرم ایجاد کاربر نمونه آماده شد.")} />
    <section className="ad-card ad-workspace-card"><div className="ad-workspace-toolbar"><Segment items={["همه", "مشتری ویژه", "سرمایه‌گذار", "پیمانکار", "مالک"]} value={group} onChange={setGroup} /><span className="ad-project-count">۴۸۲ کاربر ثبت‌شده</span></div><div className="ad-user-grid">{visible.map((person, index) => <article className="ad-user-card ad-stagger" style={{ "--delay": `${index * 50}ms` } as React.CSSProperties} key={person.name}><div><span className="ad-user-avatar">{person.initials}</span><button aria-label="گزینه‌های کاربر" onClick={() => notify(`گزینه‌های «${person.name}» باز شد.`)}><Icon name="dots" /></button></div><h2>{person.name}</h2><span className="ad-status is-neutral">{person.role}</span><p><Icon name="paper" />{person.project}</p><small>آخرین فعالیت: {person.last}</small></article>)}</div></section></>;
}

function Contracts({ notify }: { notify: (text: string) => void }) {
  const [signed, setSigned] = useState<string[]>(["K-C-۱۴۰۵-۰۴۲", "K-C-۱۴۰۵-۰۳۸"]);
  const rows = [["K-C-۱۴۰۵-۰۴۲", "توسعه سپاهان", "اجرای کامل مجموعه صفه", "۲۴۰ میلیارد", "فعال"], ["K-C-۱۴۰۵-۰۳۸", "سنگ آریا", "تأمین سنگ نما", "۱۸ میلیارد", "فعال"], ["K-C-۱۴۰۴-۱۱۲", "خانواده رستگار", "بازآفرینی خانه جلفا", "۴۶ میلیارد", "نزدیک سررسید"], ["K-C-۱۴۰۵-۰۲۹", "نیروی دقیق", "تأسیسات مکانیکی", "۱۲ میلیارد", "در بازبینی"]];
  return <><Heading eyebrow="اسناد حقوقی" title="اتاق قراردادها" description="در هر لحظه بدانید کدام قرارداد امضا شده، در کدام مرحله است و چه تصمیمی لازم دارد." action="قرارداد جدید" onAction={() => notify("پیش‌نویس قرارداد نمونه ایجاد شد.")} />
    <div className="ad-contract-layout"><section className="ad-card ad-contract-timeline"><span className="ad-card-kicker">مسیر قرارداد نمونه</span><h2>رزیدنس چهارباغ</h2><ol><li className="is-done"><i><Icon name="check" /></i><div><strong>پیش‌نویس و بررسی حقوقی</strong><span>۱۰ شهریور · تکمیل شد</span></div></li><li className="is-done"><i><Icon name="check" /></i><div><strong>تأیید طرفین</strong><span>۱۲ شهریور · تکمیل شد</span></div></li><li><i>۳</i><div><strong>پرداخت مرحله‌ی نخست</strong><span>سررسید ۱۸ شهریور</span></div></li></ol><button className="ad-text-button" onClick={() => notify("چک‌لیست مرحله‌ی بعد باز شد.")}>مشاهده‌ی چک‌لیست <Icon name="arrow" /></button></section>
      <section className="ad-card ad-workspace-card ad-contract-list"><div className="ad-records-title"><div><span className="ad-card-kicker">فهرست اسناد</span><h2>۴ قرارداد فعال</h2></div><button className="ad-quiet-action" onClick={() => notify("فیلتر قراردادها اعمال شد.")}><Icon name="filter" />فیلتر</button></div>{rows.map((row) => <div className="ad-contract-row" key={row[0]}><div><strong>{row[1]}</strong><small>{row[0]} · {row[2]}</small></div><b>{row[3]}</b>{signed.includes(row[0]) ? <span className="ad-status is-good">امضا شده</span> : <button className="ad-status is-wait" onClick={() => { setSigned((items) => [...items, row[0]]); notify(`قرارداد ${row[0]} در دمو امضا شد.`); }}>تأیید امضا</button>}<em className={`ad-status ${statusClass(row[4])}`}>{row[4]}</em></div>)}</section></div></>;
}

function Messages({ notify }: { notify: (text: string) => void }) {
  const [selected, setSelected] = useState(0);
  const [answered, setAnswered] = useState<number[]>([]);
  const messages = [{ from: "مهدی موسوی", subject: "درخواست جلسه‌ی مشارکت", time: "۱۲ دقیقه پیش", body: "سلام، برای بررسی امکان مشارکت در پروژه‌ی مسکونی اصفهان مایل هستم جلسه‌ای داشته باشیم. لطفاً زمان‌های پیشنهادی را ارسال کنید.", channel: "وب‌سایت" }, { from: "مهندس زمانی", subject: "گزارش روزانه‌ی کارگاه", time: "۴۵ دقیقه پیش", body: "گزارش امروز کارگاه صفه آماده و پیوست شده است. عملیات بتن‌ریزی طبق برنامه به پایان رسید.", channel: "داخلی" }, { from: "شرکت سنگ آریا", subject: "اصلاح پیش‌فاکتور", time: "دیروز", body: "نسخه‌ی به‌روزشده‌ی پیش‌فاکتور سنگ نما با نرخ‌های جدید برای تأیید ارسال شد.", channel: "ایمیل" }];
  const activeMessage = messages[selected];
  const respond = () => { setAnswered((items) => [...new Set([...items, selected])]); notify("یک پاسخ نمونه ارسال شد و پیام بایگانی گردید."); };
  return <><Heading eyebrow="صندوق ارتباطات" title="پیام‌های ورودی" description="درخواست‌های سایت، گزارش‌های کارگاهی و مکاتبات را بدون خروج از پنل پاسخ دهید." action="پیام جدید" onAction={() => notify("پنجره‌ی پیام جدید در نسخه‌ی نمایشی باز شد.")} />
    <section className="ad-card ad-inbox"><div className="ad-inbox-list">{messages.map((message, index) => <button key={message.subject} className={`${index === selected ? "is-active" : ""} ${answered.includes(index) ? "is-read" : ""}`} onClick={() => setSelected(index)}><span className="ad-message-avatar">{message.from.slice(0, 1)}</span><div><strong>{message.from}</strong><b>{message.subject}</b><small>{message.time}</small></div>{!answered.includes(index) && <i />}</button>)}</div><article className="ad-inbox-detail"><div className="ad-inbox-detail-head"><div><span className="ad-card-kicker">{activeMessage.channel}</span><h2>{activeMessage.subject}</h2><p>{activeMessage.from} · {activeMessage.time}</p></div><button className="ad-icon-button" aria-label="گزینه‌ها"><Icon name="dots" /></button></div><div className="ad-message-body"><p>{activeMessage.body}</p><span>این بخش برای نمایش تجربه‌ی واقعی پاسخ‌گویی طراحی شده است.</span></div><div className="ad-reply-box"><input placeholder="پاسخ کوتاه خود را بنویسید…" /><button className="ad-primary-button" onClick={respond}><Icon name="send" />ارسال پاسخ</button></div></article></section></>;
}

function Reports({ notify }: { notify: (text: string) => void }) {
  const [range, setRange] = useState("شهریور ۱۴۰۵");
  const [generated, setGenerated] = useState(false);
  const reports = [{ name: "گزارش تجمیعی پروژه‌ها", owner: "دفتر PMO", format: "PDF", color: "copper" }, { name: "جریان نقدی و تعهدات", owner: "واحد مالی", format: "Excel", color: "ink" }, { name: "تحلیل تأخیرات کارگاهی", owner: "کنترل پروژه", format: "Dashboard", color: "olive" }];
  return <><Heading eyebrow="هوش مدیریتی" title="گزارش‌ها و بینش‌ها" description="گزارش‌های کلیدی را با یک ساختار خوانا برای جلسه‌های تصمیم‌گیری آماده کنید." action="ساخت گزارش" onAction={() => { setGenerated(true); notify("گزارش نمونه در صف تولید قرار گرفت."); }} />
    <section className="ad-card ad-report-hero"><div><span className="ad-card-kicker">نمای مدیریتی</span><h2>۴ تصمیم برای این هفته</h2><p>۳ پروژه طبق برنامه‌اند؛ مجموعه‌ی صفه برای تأیید نقشه‌های سازه نیازمند پیگیری است.</p><div className="ad-report-tags"><span>پروژه‌ها</span><span>نقدینگی</span><span>تأمین</span></div></div><div className="ad-report-gauge"><b>۸۷٪</b><span>شاخص سلامت اجرا</span></div></section>
    <section className="ad-card ad-workspace-card"><div className="ad-workspace-toolbar"><Segment items={["شهریور ۱۴۰۵", "سه‌ماهه‌ی دوم", "سال ۱۴۰۵"]} value={range} onChange={setRange} /><button className="ad-quiet-action" onClick={() => notify(`${range} به‌عنوان بازه‌ی گزارش انتخاب شد.`)}><Icon name="calendar" />بازه‌ی گزارش</button></div><div className="ad-report-grid">{reports.map((report, index) => <article className={`ad-report-card ad-report-${report.color} ad-stagger`} style={{ "--delay": `${index * 60}ms` } as React.CSSProperties} key={report.name}><span className="ad-report-icon"><Icon name="chart" /></span><span className="ad-status is-good">آماده</span><h2>{report.name}</h2><p>{range} · {report.owner}</p><div><button className="ad-text-button" onClick={() => notify(`پیش‌نمایش «${report.name}» آماده شد.`)}>پیش‌نمایش <Icon name="arrow" /></button><b>{report.format}</b></div></article>)}</div>{generated && <div className="ad-generated-note"><Icon name="check" />گزارش «عملکرد هفتگی» ساخته شد و در فهرست نمونه‌ها قابل مشاهده است.</div>}</section></>;
}

export function DemoWorkspace({ active, query, onQuery }: Props) {
  const [notice, setNotice] = useState<Notice>(null);
  const notify = (text: string, tone: Notice extends infer T ? T extends { tone?: infer U } ? U : never : never = "success") => { setNotice({ text, tone: tone as "success" | "warm" }); window.setTimeout(() => setNotice(null), 3300); };
  const panel = active === "customers" ? <Customers query={query} onQuery={onQuery} notify={notify} />
    : active === "accounting" ? <Accounting notify={notify} />
    : active === "projects" ? <Projects notify={notify} />
    : active === "blogs" ? <Blogs notify={notify} />
    : active === "inventory" ? <Inventory notify={notify} />
    : active === "users" ? <Users notify={notify} />
    : active === "contracts" ? <Contracts notify={notify} />
    : active === "messages" ? <Messages notify={notify} />
    : <Reports notify={notify} />;
  return <><div className="ad-workspace-view">{panel}</div>{notice && <div className={`ad-demo-toast ${notice.tone === "warm" ? "is-warm" : ""}`} role="status"><Icon name="check" />{notice.text}</div>}</>;
}
