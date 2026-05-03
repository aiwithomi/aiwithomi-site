/**
 * Brand rule (from Design System 2.0):
 *   surface="dark"  → "AI" + "Omi" = ember (#C4622D), "with" = parchment (#F5F0E8)
 *   surface="light" → "AI" + "Omi" = ember (#C4622D), "with" = obsidian (#1A1A1A)
 *   surface="ember" → everything = white (#FFFFFF)
 *
 * AIwithOmi is always written as one word — never split.
 */

type WordmarkSurface = 'dark' | 'light' | 'ember';

interface WordmarkProps {
  surface?: WordmarkSurface;
  size?: number;
  className?: string;
}

export function Wordmark({ surface = 'dark', size = 56, className = '' }: WordmarkProps) {
  const colors = {
    dark:  { accent: '#C4622D', mid: '#F5F0E8' },
    light: { accent: '#C4622D', mid: '#1A1A1A' },
    ember: { accent: '#FFFFFF', mid: '#FFFFFF' },
  }[surface];

  return (
    <span
      className={className}
      style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-2.5px',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      <span style={{ color: colors.accent }}>AI</span>
      <span style={{ color: colors.mid }}>with</span>
      <span style={{ color: colors.accent }}>Omi</span>
    </span>
  );
}
