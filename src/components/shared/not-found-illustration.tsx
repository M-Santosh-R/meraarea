export function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 200 140"
      className="h-40 w-56 text-accent"
      fill="none"
      aria-hidden="true"
    >
      <rect x="20" y="100" width="160" height="4" rx="2" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="55" r="42" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <path
        d="M100 30 C82 30 70 45 70 60 C70 78 100 95 100 95 C100 95 130 78 130 60 C130 45 118 30 100 30 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <circle cx="100" cy="58" r="10" fill="currentColor" opacity="0.5" />
      <text
        x="100"
        y="130"
        textAnchor="middle"
        className="fill-current text-[28px] font-bold"
        opacity="0.25"
      >
        404
      </text>
    </svg>
  );
}
