"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 121;
const BATCH_SIZE = 16;

const heroPhases = [
  {
    tag: "طراحی · ساخت · توسعه",
    title: <>فضا می‌سازیم که <em>آینده</em> را شکل می‌دهند.</>,
    text: "کنزا یک مجموعه یکپارچه برای طراحی، مدیریت و اجرای پروژه‌های ماندگار در اصفهان و سراسر ایران است.",
    start: 0,
    end: 0.23,
  },
  {
    tag: "نگاه ۳۶۰ درجه",
    title: <>هر زاویه، یک <em>تصمیم دقیق.</em></>,
    text: "ساختمان را از همه زاویه‌ها می‌بینیم؛ از کیفیت زندگی و منطق سازه تا اقتصاد و آینده سرمایه.",
    start: 0.27,
    end: 0.48,
  },
  {
    tag: "یک تیم، یک مسیر",
    title: <>از اولین خط تا <em>آخرین جزئیات.</em></>,
    text: "طراحی و اجرا در کنزا از هم جدا نیستند. یک تیم، مسئولیت تمام مسیر را بر عهده می‌گیرد.",
    start: 0.52,
    end: 0.73,
  },
  {
    tag: "KENZA / 2026",
    title: <>برای <em>ماندن</em> می‌سازیم.</>,
    text: "نتیجه باید امروز زیبا باشد، فردا درست کار کند و سال‌ها بعد همچنان ارزشمند بماند.",
    start: 0.77,
    end: 1,
  },
];

function getFramePath(index: number, mobile: boolean) {
  return `/frames/${mobile ? "mobile" : "desktop"}/frame-${String(index).padStart(4, "0")}.webp`;
}

export function HeroExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const framesRef = useRef<Array<HTMLImageElement | null>>([]);
  const targetFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);
  const phaseRef = useRef(0);
  const [phase, setPhase] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animationFrame = 0;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frameCount = reduceMotion ? 1 : TOTAL_FRAMES;

    document.documentElement.dataset.premiumLoading = "true";

    function loadImage(index: number) {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = getFramePath(index, mobile);
      });
    }

    async function preload() {
      const loaded: Array<HTMLImageElement | null> = new Array(frameCount).fill(null);
      let completed = 0;

      for (let start = 0; start < frameCount; start += BATCH_SIZE) {
        const indexes = Array.from(
          { length: Math.min(BATCH_SIZE, frameCount - start) },
          (_, offset) => start + offset,
        );
        const batch = await Promise.allSettled(indexes.map(loadImage));
        batch.forEach((result, index) => {
          if (result.status === "fulfilled") loaded[indexes[index]] = result.value;
          completed += 1;
        });
        if (!cancelled) setLoadProgress(Math.round((completed / frameCount) * 100));
      }

      if (!cancelled && loaded.some(Boolean)) {
        framesRef.current = loaded;
        drawnFrameRef.current = -1;
        setReady(true);
        delete document.documentElement.dataset.premiumLoading;
      }
    }

    function findFrame(index: number) {
      const frames = framesRef.current;
      if (frames[index]) return frames[index];
      for (let offset = 1; offset < frames.length; offset += 1) {
        if (frames[index - offset]) return frames[index - offset];
        if (frames[index + offset]) return frames[index + offset];
      }
      return null;
    }

    function draw() {
      const canvas = canvasRef.current;
      const image = findFrame(targetFrameRef.current);
      if (!canvas || !image) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const context = canvas.getContext("2d");
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;
      context.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);
      drawnFrameRef.current = targetFrameRef.current;
    }

    function updateFromScroll() {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      targetFrameRef.current = reduceMotion ? 0 : Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;

      const nextPhase = heroPhases.findIndex((item) => progress >= item.start && progress <= item.end);
      const safePhase = nextPhase === -1 ? phaseRef.current : nextPhase;
      if (safePhase !== phaseRef.current) {
        phaseRef.current = safePhase;
        setPhase(safePhase);
      }
    }

    function tick() {
      if (drawnFrameRef.current !== targetFrameRef.current) draw();
      animationFrame = window.requestAnimationFrame(tick);
    }

    function onResize() {
      drawnFrameRef.current = -1;
      updateFromScroll();
    }

    preload();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    updateFromScroll();
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      delete document.documentElement.dataset.premiumLoading;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className={`p-loader ${ready ? "is-ready" : ""}`} aria-hidden={ready} aria-live="polite">
        <div className="p-loader-top"><strong>کنزا</strong><span lang="en">DESIGNING THE FUTURE</span></div>
        <div className="p-loader-center">
          <span>در حال آماده‌سازی تجربه</span>
          <strong>{loadProgress.toLocaleString("fa-IR")}٪</strong>
        </div>
        <div className="p-loader-track"><span style={{ transform: `scaleX(${loadProgress / 100})` }} /></div>
      </div>

      <section className="p-hero-scroll" id="top" ref={rootRef}>
        <div className="p-hero-sticky">
          <div className="p-hero-card">
            <div className="p-hero-orbit p-hero-orbit-one" aria-hidden="true" />
            <div className="p-hero-orbit p-hero-orbit-two" aria-hidden="true" />

            <picture className="p-hero-poster">
              <source media="(max-width: 760px)" srcSet="/frames/mobile/frame-0000.webp" />
              <img src="/frames/desktop/frame-0000.webp" alt="" />
            </picture>
            <canvas ref={canvasRef} className="p-hero-canvas" aria-label="نمای ۳۶۰ درجه پروژه معماری کنزا" />

            <div className="p-hero-copy-stack">
              {heroPhases.map((item, index) => (
                <article key={item.tag} className={`p-hero-copy ${phase === index ? "is-active" : ""}`}>
                  <span className="p-chip"><i />{item.tag}</span>
                  <h1>{item.title}</h1>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="p-hero-actions">
              <a className="p-button p-button-primary" href="#contact">شروع یک پروژه <span>↙</span></a>
              <a className="p-button p-button-ghost" href="tel:+983136200000">تماس مستقیم</a>
            </div>

            <div className="p-hero-location"><span>اصفهان</span><i /><span>سراسر ایران</span></div>
            <div className="p-hero-step" aria-hidden="true"><strong>۰{phase + 1}</strong><span>/ ۰۴</span></div>
            <div className="p-hero-progress" aria-hidden="true"><span ref={progressRef} /></div>
            <div className="p-scroll-pill"><i>↓</i><span>برای کشف پروژه اسکرول کنید</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
