export function AdminLivePulse() {
  return (
    <div className="ka-hero-orbit ka-live-orbit" role="img" aria-label="نمای زنده پایش سلامت مجموعه">
      <span className="ka-orbit one" aria-hidden="true" />
      <span className="ka-orbit two" aria-hidden="true" />
      <span className="ka-orbit three" aria-hidden="true" />
      <span className="ka-live-radar" aria-hidden="true" />
      <span className="ka-live-axis is-horizontal" aria-hidden="true" />
      <span className="ka-live-axis is-vertical" aria-hidden="true" />

      <svg className="ka-live-trace" viewBox="0 0 180 54" preserveAspectRatio="none" aria-hidden="true">
        <path className="ka-live-trace-guide" d="M0 27H180" />
        <path className="ka-live-trace-line" d="M0 27H27L35 27L41 12L49 43L58 20L65 27H91L98 27L105 17L112 34L120 23L127 27H180" />
      </svg>

      <span className="ka-orbit-core">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12h4l2.2-5.2L13 17l2.1-5H21" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      </span>

      <i className="ka-orbit-dot dot-a" aria-hidden="true" />
      <i className="ka-orbit-dot dot-b" aria-hidden="true" />
      <i className="ka-orbit-dot dot-c" aria-hidden="true" />
      <span className="ka-live-readout" aria-hidden="true"><i /> همگام‌سازی زنده</span>
    </div>
  );
}
