import Image from "next/image";
import { HeroExperience } from "@/components/HeroExperience";
import { ModernContactForm } from "@/components/ModernContactForm";
import { ModernHeader } from "@/components/ModernHeader";
import { MotionManager } from "@/components/MotionManager";
import "./premium.css";
import "./landing-geometry.css";
import "./landing-geometry-v2.css";
import "./hero-mobile-fix.css";
import "./hero-cta-layout-fix.css";

const services = [
  { number: "۰۱", title: "طراحی معماری", text: "کانسپت، معماری و نقشه‌های اجرایی با تمرکز هم‌زمان بر تجربه فضا، منطق ساخت و اقتصاد پروژه.", accent: "طراحی" },
  { number: "۰۲", title: "پیمانکاری و اجرا", text: "اجرای یکپارچه با برنامه‌ریزی شفاف، کنترل کیفیت مستمر و هماهنگی کامل عوامل کارگاه.", accent: "اجرا" },
  { number: "۰۳", title: "مدیریت ساخت", text: "مدیریت زمان، بودجه، قراردادها و ریسک برای تبدیل پیچیدگی پروژه به یک مسیر قابل کنترل.", accent: "مدیریت" },
  { number: "۰۴", title: "بازسازی", text: "بازتعریف ساختمان موجود و ارتقای کیفیت فضایی، فنی و انرژی، بدون حذف شخصیت ارزشمند بنا.", accent: "نوسازی" },
  { number: "۰۵", title: "مشارکت در ساخت", text: "همکاری شفاف با مالکان و سرمایه‌گذاران؛ از امکان‌سنجی و طراحی تا ساخت، فروش و تحویل.", accent: "توسعه" },
];

const galleryItems = [
  { title: "رزیدنس چهارباغ", type: "مسکونی", place: "اصفهان / ۱۴۰۵", image: "/gallery/chaharbagh-residence.webp", size: "wide" },
  { title: "مجموعه صفه", type: "تجاری ـ اداری", place: "اصفهان / ۱۴۰۴", image: "/gallery/safavi-business-center.webp", size: "tall" },
  { title: "خانه جلفا", type: "بازآفرینی", place: "اصفهان / ۱۴۰۳", image: "/gallery/jolfa-courtyard.webp", size: "small" },
  { title: "برج باغ نور", type: "مسکونی", place: "تهران / ۱۴۰۵", image: "/gallery/alborz-terrace-tower.webp", size: "small" },
  { title: "مرکز آفتاب", type: "چندمنظوره", place: "شیراز / ۱۴۰۴", image: "/gallery/shiraz-cultural-complex.webp", size: "wide-bottom" },
];

const process = [
  { number: "۰۱", title: "شناخت", text: "اهداف، زمین، بودجه و محدودیت‌ها را دقیق می‌شنویم." },
  { number: "۰۲", title: "راه‌حل", text: "سناریوی طراحی و مدل همکاری را شفاف تعریف می‌کنیم." },
  { number: "۰۳", title: "توسعه", text: "معماری و مهندسی را تا پاسخ قابل اجرا پیش می‌بریم." },
  { number: "۰۴", title: "ساخت", text: "با کنترل مستمر زمان، هزینه و کیفیت، پروژه را تحویل می‌دهیم." },
];

function Arrow() {
  return <span aria-hidden="true">↙</span>;
}

export default function Home() {
  return (
    <div className="premium-page">
      <ModernHeader />
      <HeroExperience />

      <main>
        <section className="p-section p-intro" id="about">
          <div className="p-section-kicker" data-reveal>
            <span>چرا کنزا؟</span>
            <small lang="en">BUILT DIFFERENT</small>
          </div>
          <div className="p-intro-grid">
            <h2 data-reveal>ساختن را ساده نمی‌بینیم؛<br /><em>ساده مدیریت می‌کنیم.</em></h2>
            <div className="p-intro-copy" data-reveal>
              <p>کنزا طراحی، مهندسی، اجرا و توسعه را زیر یک سقف جمع کرده است؛ تا تصمیم‌ها سریع‌تر، مسئولیت‌ها روشن‌تر و نتیجه قابل پیش‌بینی‌تر باشد.</p>
              <a className="p-inline-link" href="#services">بیشتر درباره رویکرد ما <Arrow /></a>
            </div>
          </div>
          <div className="p-value-grid">
            <article data-reveal><span className="p-value-icon">✦</span><div><h3>دید یکپارچه</h3><p>یک تیم از ایده تا تحویل</p></div></article>
            <article data-reveal><span className="p-value-icon">◌</span><div><h3>شفافیت کامل</h3><p>زمان، هزینه و کیفیت قابل پیگیری</p></div></article>
            <article data-reveal><span className="p-value-icon">↗</span><div><h3>ارزش ماندگار</h3><p>طراحی برای امروز و فردا</p></div></article>
          </div>
        </section>

        <section className="p-section p-services" id="services">
          <div className="p-section-kicker" data-reveal>
            <span>خدمات ما</span>
            <small lang="en">WHAT WE DO</small>
          </div>
          <div className="p-section-heading">
            <h2 data-reveal>تمام آنچه یک پروژه<br /><em>برای ساخته‌شدن نیاز دارد.</em></h2>
            <p data-reveal>از یک خانه شخصی تا یک توسعه بزرگ؛ ساختار همکاری را متناسب با مقیاس و هدف پروژه تنظیم می‌کنیم.</p>
          </div>
          <div className="p-service-grid">
            {services.map((service) => (
              <article className="p-service-card" key={service.number} data-reveal>
                <div className="p-service-top"><span>{service.number}</span><i>{service.accent}</i></div>
                <div><h3>{service.title}</h3><p>{service.text}</p></div>
                <span className="p-round-arrow" aria-hidden="true">↙</span>
              </article>
            ))}
            <article className="p-service-card p-service-callout" data-reveal>
              <span>پروژه متفاوتی دارید؟</span>
              <h3>راه‌حل را با هم طراحی می‌کنیم.</h3>
              <a href="#contact">گفت‌وگو با کنزا <Arrow /></a>
            </article>
          </div>
        </section>

        <section className="p-section p-gallery" id="gallery">
          <div className="p-section-kicker" data-reveal>
            <span>گالری پروژه‌ها</span>
            <small lang="en">SELECTED WORK</small>
          </div>
          <div className="p-section-heading p-gallery-heading">
            <h2 data-reveal>پروژه‌هایی برای<br /><em>دیدن، لمس‌کردن و ماندن.</em></h2>
            <p data-reveal>تصاویر و عناوین این گالری فعلاً نمونه‌اند و با پروژه‌های واقعی کنزا جایگزین می‌شوند.</p>
          </div>
          <div className="p-gallery-grid">
            {galleryItems.map((item, index) => (
              <article className={`p-gallery-card p-gallery-${item.size}`} key={item.title} data-reveal>
                <Image src={item.image} alt={`نمای نمونه ${item.title}`} fill sizes="(max-width: 760px) 100vw, 60vw" unoptimized />
                <div className="p-gallery-shade" />
                <span className="p-gallery-number">۰{index + 1}</span>
                <div className="p-gallery-meta"><small>{item.type}</small><h3>{item.title}</h3><p>{item.place}</p></div>
                <span className="p-gallery-arrow" aria-hidden="true">↙</span>
              </article>
            ))}
          </div>
        </section>

        <section className="p-section p-founder" aria-labelledby="founder-title">
          <div className="p-founder-card" data-reveal>
            <div className="p-founder-glow" aria-hidden="true" />
            <span className="p-quote-mark" aria-hidden="true">“</span>
            <div className="p-founder-label"><i /><span>پیام بنیان‌گذار</span></div>
            <blockquote id="founder-title">
              در کنزا، ساختن فقط تحویل یک بنا نیست؛ تعهدی است به کیفیت زندگی، سرمایه و آینده‌ی شهری که در آن کار می‌کنیم. هر پروژه را طوری پیش می‌بریم که با اطمینان، نام‌مان پای آن بماند.
            </blockquote>
            <div className="p-founder-person">
              <div className="p-founder-avatar">ک</div>
              <div><strong>مهندس کیانی</strong><span>بنیان‌گذار و مدیرعامل کنزا</span></div>
            </div>
            <small className="p-founder-note">متن این پیام در نسخه فعلی پیشنهادی است.</small>
          </div>
        </section>

        <section className="p-section p-numbers" aria-label="کنزا در یک نگاه">
          <div className="p-number-intro" data-reveal><span>کنزا در یک نگاه</span><p>اعداد فعلی نمونه هستند و با اطلاعات واقعی شرکت جایگزین خواهند شد.</p></div>
          <div className="p-number-grid">
            <article data-reveal><strong>۱۲<sup>+</sup></strong><span>سال تجربه</span></article>
            <article data-reveal><strong>۳۴</strong><span>پروژه</span></article>
            <article data-reveal><strong>۲۸۰<sup>هزار</sup></strong><span>مترمربع زیربنا</span></article>
            <article data-reveal><strong>۹</strong><span>استان محل فعالیت</span></article>
          </div>
        </section>

        <section className="p-section p-process">
          <div className="p-process-shell">
            <div className="p-section-kicker" data-reveal><span>فرایند همکاری</span><small lang="en">HOW IT WORKS</small></div>
            <div className="p-section-heading">
              <h2 data-reveal>یک مسیر روشن،<br /><em>بدون پیچیدگی اضافه.</em></h2>
              <a className="p-button p-button-primary" href="#contact" data-reveal>شروع همکاری <Arrow /></a>
            </div>
            <ol className="p-process-grid">
              {process.map((item) => (
                <li key={item.number} data-reveal><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="p-section p-contact" id="contact">
          <div className="p-contact-shell">
            <div className="p-contact-copy" data-reveal>
              <span className="p-chip"><i />شروع یک همکاری تازه</span>
              <h2>پروژه‌ی بعدی<br />از یک <em>گفت‌وگو</em> شروع می‌شود.</h2>
              <p>برای طراحی، ساخت، بازسازی یا مشارکت، اطلاعات اولیه پروژه را برای ما بفرستید.</p>
              <div className="p-contact-options">
                <a href="tel:+983136200000"><small>تماس مستقیم</small><strong dir="ltr">+98 31 3620 0000</strong></a>
                <a href="https://wa.me/989130000000" target="_blank" rel="noreferrer"><small>پیام در واتساپ</small><strong>شروع گفت‌وگو ↙</strong></a>
              </div>
            </div>
            <div data-reveal><ModernContactForm /></div>
          </div>
        </section>
      </main>

      <footer className="p-footer">
        <div className="p-footer-top"><div><strong>کنزا</strong><span lang="en">KENZA</span></div><p>طراحی، ساخت و توسعه<br />اصفهان / سراسر ایران</p></div>
        <div className="p-footer-bottom"><span>© ۱۴۰۵ کنزا — تمام حقوق محفوظ است.</span><a href="#top">بازگشت به بالا ↑</a></div>
      </footer>
      <MotionManager />
    </div>
  );
}
