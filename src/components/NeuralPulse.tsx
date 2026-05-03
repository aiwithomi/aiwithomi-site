export function NeuralPulse() {
  const pathD = "M0,40 L40,40 L48,40 L54,6 L60,74 L66,40 L82,40 L88,33 L94,40 L200,40";

  return (
    <svg
      width="200"
      height="80"
      viewBox="0 0 200 80"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="pulse-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pulse-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#C4622D" stopOpacity="0" />
          <stop offset="40%" stopColor="#C4622D" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C4622D" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Base line — always visible, subtle */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(245,240,232,0.15)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated trace overlay */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#pulse-fade)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 320; 320 320; 0 320"
          dur="3s"
          repeatCount="indefinite"
          calcMode="linear"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="320; 0; -320"
          dur="3s"
          repeatCount="indefinite"
          calcMode="linear"
        />
      </path>

      {/* Traveling glow dot */}
      <circle r="3.5" fill="#C4622D" filter="url(#pulse-glow)">
        <animateMotion
          path={pathD}
          dur="3s"
          repeatCount="indefinite"
          rotate="auto"
          calcMode="linear"
        />
      </circle>
    </svg>
  );
}
