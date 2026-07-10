// Soft blurred color blobs for atmospheric depth behind flat-background hero
// sections (ones with no photo). Purely decorative, aria-hidden, pointer-events-none.
export function DecorativeGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-24 size-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 size-72 rounded-full bg-amber-500/10 blur-3xl" />
    </div>
  );
}
