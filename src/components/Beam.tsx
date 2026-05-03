import { useId } from 'react';
import type { CSSProperties } from 'react';

interface BeamProps {
  className?: string;
  style?: CSSProperties;
  apexX?: number;
  apexY?: number;
  width?: number;
  height?: number;
  opacity?: number;
}

export function Beam({ className = '', style, apexX = 60, apexY = 300, width = 640, height = 320, opacity = 0.55 }: BeamProps) {
  const gradientId = useId();
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: 0, opacity, ...style }}
    >
      <defs>
        <linearGradient id={gradientId} x1={apexX} y1={apexY} x2={width} y2={0} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4622D" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#C4622D" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C4622D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${apexX},${apexY} ${width},0 ${width},${height}`} fill={`url(#${gradientId})`} />
      <circle cx={apexX} cy={apexY} r="4" fill="#F5F0E8" opacity="0.9" />
    </svg>
  );
}
