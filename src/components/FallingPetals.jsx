import { useMemo } from 'react';

const PETAL_EMOJIS = ['🌸', '🌺', '🌹', '💐', '🌼'];

/**
 * Ambient floating petals that drift down across the entire page.
 * Lightweight CSS animation only — no heavy JS.
 */
export default function FallingPetals({ count = 12 }) {
  const petals = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
      left: `${(i / count) * 100 + Math.random() * 5}%`,
      fontSize: `${12 + Math.random() * 10}px`,
      duration: `${10 + Math.random() * 8}s`,
      delay: `${Math.random() * 10}s`,
      opacity: 0.3 + Math.random() * 0.3,
    })), [count]);

  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            fontSize: p.fontSize,
            '--duration': p.duration,
            '--delay': p.delay,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
