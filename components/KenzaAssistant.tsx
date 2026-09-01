"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./KenzaAssistant.module.css";

type AssistantVariant = "landing" | "admin";
type ChatRole = "user" | "assistant";
type ChatMessage = { id: string; role: ChatRole; content: string; error?: boolean };

const copy = {
  landing: {
    eyebrow: "دستیار هوشمند کنزا",
    title: "سلام، چطور می‌توانم کمک کنم؟",
    subtitle: "برای مشاوره طراحی، ساخت و شروع همکاری کنار شما هستم.",
    greeting: "سلام! من دستیار هوشمند کنزا هستم. درباره خدمات طراحی، اجرا، بازسازی یا شروع یک پروژه از من بپرسید.",
    placeholder: "پیام خود را بنویسید...",
    suggestions: ["خدمات کنزا چیست؟", "برای شروع پروژه چه کنم؟", "درباره بازسازی راهنمایی‌ام کن"],
  },
  admin: {
    eyebrow: "هوش عملیاتی کنزا",
    title: "دستیار تصمیم‌یار مدیریت",
    subtitle: "پرسش از وضعیت امروز، پروژه‌ها و جریان مالی با پاسخ فارسی.",
    greeting: "سلام مهندس کیانی. آماده‌ام داده‌های نمای کلی را خلاصه کنم و برای تصمیم‌های امروز پیشنهاد عملی بدهم.",
    placeholder: "مثلاً: مهم‌ترین ریسک امروز چیست؟",
    suggestions: ["خلاصه امروز را بگو", "ریسک‌های پروژه‌ها چیست؟", "وضعیت نقدینگی را تحلیل کن"],
  },
} as const;

let messageSequence = 0;
const makeMessage = (role: ChatRole, content: string, error = false): ChatMessage => ({
  id: `${Date.now()}-${messageSequence++}`,
  role,
  content,
  error,
});

function SparkIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2.8 13.8 9l6.2 1.8-6.2 1.8L12 19l-1.8-6.4L4 10.8 10.2 9 12 2.8Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></svg>;
}

function SendIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 12 16-8-5.2 16-3.1-6.7L4 12Z" /><path d="m11.7 13.3 4.5-4.5" /></svg>;
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function ChatPanel({ variant, onClose }: { variant: AssistantVariant; onClose?: () => void }) {
  const text = copy[variant];
  const [messages, setMessages] = useState<ChatMessage[]>(() => [makeMessage("assistant", text.greeting)]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const viewport = messagesRef.current;
    if (viewport) viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => {
      window.clearTimeout(focusTimer);
      requestRef.current?.abort();
    };
  }, []);

  const send = async (preset?: string) => {
    const content = (preset ?? input).trim();
    if (!content || loading) return;
    const userMessage = makeMessage("user", content);
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput("");
    setLoading(true);
    const controller = new AbortController();
    requestRef.current = controller;

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: variant,
          messages: conversation.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
        signal: controller.signal,
      });
      const payload = await response.json() as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) throw new Error(payload.error || "پاسخی از دستیار دریافت نشد.");
      setMessages((current) => [...current, makeMessage("assistant", payload.reply as string)]);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      const message = error instanceof Error ? error.message : "ارتباط با دستیار برقرار نشد. لطفاً دوباره تلاش کنید.";
      setMessages((current) => [...current, makeMessage("assistant", message, true)]);
    } finally {
      setLoading(false);
      requestRef.current = null;
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void send();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

  return (
    <section className={`${styles.panel} ${variant === "landing" ? styles.panelLanding : styles.panelAdmin}`} role={variant === "landing" ? "dialog" : "region"} aria-modal={variant === "landing" ? "false" : undefined} aria-label={text.eyebrow} dir="rtl">
      <header className={styles.header}>
        <div className={styles.avatar} aria-hidden="true"><span /><SparkIcon /></div>
        <div className={styles.headerCopy}>
          <span>{text.eyebrow}</span>
          <strong>{text.title}</strong>
          <small><i />{text.subtitle}</small>
        </div>
        <span className={styles.modelBadge}><b>KUJI</b><small>MODEL</small></span>
        {onClose && <button type="button" className={styles.close} onClick={onClose} aria-label="بستن دستیار"><CloseIcon /></button>}
      </header>

      <div className={styles.messages} ref={messagesRef} aria-live="polite">
        <div className={styles.dateDivider}><span>گفت‌وگوی جدید</span></div>
        {messages.map((message) => (
          <div key={message.id} className={`${styles.message} ${message.role === "user" ? styles.messageUser : styles.messageAssistant} ${message.error ? styles.messageError : ""}`}>
            {message.role === "assistant" && <span className={styles.messageAvatar} aria-hidden="true"><SparkIcon /></span>}
            <div>
              <p>{message.content}</p>
              <small>{message.error ? "امکان ارسال دوباره وجود دارد" : message.role === "assistant" ? "کنزا AI" : "شما"}</small>
            </div>
          </div>
        ))}
        {messages.length === 1 && (
          <div className={styles.suggestions} aria-label="پرسش‌های پیشنهادی">
            {text.suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => void send(suggestion)}>{suggestion}<span>↖</span></button>)}
          </div>
        )}
        {loading && (
          <div className={`${styles.message} ${styles.messageAssistant} ${styles.loadingMessage}`}>
            <span className={styles.messageAvatar} aria-hidden="true"><SparkIcon /></span>
            <div><p><span className={styles.typing}><i /><i /><i /></span>در حال تحلیل و آماده‌سازی پاسخ</p><small>مدل KUJI در حال پردازش است</small></div>
          </div>
        )}
      </div>

      <form className={styles.composer} onSubmit={submit}>
        <div className={styles.inputShell}>
          <textarea ref={inputRef} rows={1} maxLength={1500} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder={text.placeholder} aria-label="پیام به دستیار کنزا" disabled={loading} />
          <span>{input.length ? `${input.length.toLocaleString("fa-IR")}/۱٬۵۰۰` : "Enter برای ارسال"}</span>
        </div>
        <button type="submit" disabled={loading || !input.trim()} aria-label="ارسال پیام"><SendIcon /></button>
      </form>
      <footer className={styles.disclaimer}><SparkIcon /><span>پاسخ‌ها را برای تصمیم‌های حساس بررسی کنید.</span><i />پشتیبانی هوشمند کنزا</footer>
    </section>
  );
}

export function KenzaAssistant({ variant = "landing" }: { variant?: AssistantVariant }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (variant !== "landing" || !open) return;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, variant]);

  if (variant === "admin") {
    return (
      <section className={styles.adminShell} dir="rtl" aria-label="دستیار هوشمند مدیریت کنزا">
        <div className={styles.adminIntro}>
          <div className={styles.adminGeometry} aria-hidden="true"><i /><i /><i /><i /></div>
          <span className={styles.adminKicker}><i />هوش مصنوعی در نمای کلی</span>
          <div className={styles.adminOrb} aria-hidden="true"><span /><span /><b><SparkIcon /></b></div>
          <h2>تصمیم روشن‌تر،<br /><em>در چند ثانیه.</em></h2>
          <p>از داده‌های همین داشبورد سؤال کنید؛ پاسخ کوتاه، حرفه‌ای و کاملاً فارسی دریافت کنید.</p>
          <div className={styles.adminMeta}><span><i />آماده پاسخ‌گویی</span><b>KUJI · AI</b></div>
        </div>
        <ChatPanel variant="admin" />
      </section>
    );
  }

  return (
    <div className={styles.landingRoot} dir="rtl">
      {open && <ChatPanel variant="landing" onClose={() => setOpen(false)} />}
      {!open && <div className={styles.launchHint}><strong>یک سؤال دارید؟</strong><span>از دستیار کنزا بپرسید</span></div>}
      <button type="button" className={`${styles.launcher} ${open ? styles.launcherOpen : ""}`} onClick={() => setOpen((current) => !current)} aria-label={open ? "بستن دستیار هوشمند" : "باز کردن دستیار هوشمند کنزا"} aria-expanded={open}>
        <span className={styles.launcherRing} />
        <span className={styles.launcherCore}>{open ? <CloseIcon /> : <SparkIcon />}</span>
        {!open && <i className={styles.onlineDot} />}
      </button>
    </div>
  );
}
