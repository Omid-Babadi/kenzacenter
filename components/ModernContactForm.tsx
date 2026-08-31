"use client";

import { FormEvent, useState } from "react";

export function ModernContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="p-form-success" role="status">
        <span>✓</span>
        <h3>درخواست شما ثبت شد.</h3>
        <p>فرم فعلاً آزمایشی است. در نسخه نهایی تیم کنزا برای ادامه گفت‌وگو با شما تماس می‌گیرد.</p>
        <button type="button" onClick={() => setSent(false)}>ارسال درخواست دیگر</button>
      </div>
    );
  }

  return (
    <form className="p-contact-form" onSubmit={submit}>
      <div className="p-fields-row">
        <label><span>نام و نام خانوادگی</span><input name="name" autoComplete="name" placeholder="نام شما" required /></label>
        <label><span>شماره تماس</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" required /></label>
      </div>
      <label>
        <span>نوع همکاری</span>
        <select name="service" defaultValue="">
          <option value="" disabled>یک گزینه انتخاب کنید</option>
          <option>طراحی معماری</option>
          <option>پیمانکاری و اجرا</option>
          <option>مدیریت ساخت</option>
          <option>بازسازی</option>
          <option>مشارکت در ساخت</option>
        </select>
      </label>
      <label><span>درباره پروژه</span><textarea name="message" rows={3} placeholder="موقعیت، مقیاس و مرحله فعلی پروژه را بنویسید..." /></label>
      <button className="p-submit" type="submit">ثبت درخواست مشاوره <span>↙</span></button>
      <small>این فرم و اطلاعات تماس در نسخه فعلی آزمایشی هستند.</small>
    </form>
  );
}
