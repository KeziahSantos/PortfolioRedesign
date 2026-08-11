// Pastel palette blended from both reference images:
// warm nudes (img 1) + soft pastels — blue, lavender, pink, butter, mint, aqua (img 2)
const CHIP_COLORS = [
  { bg: "#F8E8D8", text: "#8C5A3A" }, // cream peach       – img 1
  { bg: "#DDD4F8", text: "#5A4A8C" }, // soft lavender     – img 2
  { bg: "#D0F0D4", text: "#3A7A48" }, // mint green        – img 2
  { bg: "#F8D4E0", text: "#8C4A60" }, // blush pink        – img 2
  { bg: "#FAF0C8", text: "#7A6800" }, // butter yellow     – img 2
  { bg: "#F0D4BA", text: "#7A4A22" }, // soft nude         – img 1
  { bg: "#C8EEF0", text: "#2A6A70" }, // ice aqua          – img 2
  { bg: "#E0DCC8", text: "#625E3A" }, // warm khaki        – img 1
];

function hashTag(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h % CHIP_COLORS.length;
}

interface TagProps {
  children: string;
  variant?: "light" | "dark";
}

export function Tag({ children, variant }: TagProps) {
  // variant="dark" keeps the original semantic dark chip (used in CaseDetail hero)
  if (variant === "dark") {
    return (
      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
        {children}
      </span>
    );
  }

  const { bg, text } = CHIP_COLORS[hashTag(children)];

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-sm font-medium"
      style={{ backgroundColor: bg, color: text }}
    >
      {children}
    </span>
  );
}
