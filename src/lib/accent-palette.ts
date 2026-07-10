// A small rotating accent palette so grids of categories/services/areas don't
// all read as identical monotone-blue tiles. Deterministic (hash of id), not random,
// so a given item always gets the same color across renders/pages.
const PALETTE = [
  { bg: "bg-accent/10", text: "text-accent" },
  { bg: "bg-teal-500/10", text: "text-teal-600 dark:text-teal-400" },
  { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400" },
  { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
];

export function accentFor(id: string) {
  return PALETTE[hashOf(id) % PALETTE.length];
}

// Bolder diagonal gradients for full-bleed image-fallback tiles (photo cards,
// business/area thumbnails with no uploaded image) — needs more punch than the
// pastel tint above since there's no photo underneath to carry the tile.
const GRADIENTS = [
  "from-accent/70 to-primary/70",
  "from-emerald-500/70 to-teal-700/70",
  "from-amber-500/70 to-orange-700/70",
  "from-violet-500/70 to-indigo-700/70",
  "from-rose-500/70 to-pink-700/70",
];

export function gradientFor(id: string) {
  return GRADIENTS[hashOf(id) % GRADIENTS.length];
}

function hashOf(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return hash;
}
