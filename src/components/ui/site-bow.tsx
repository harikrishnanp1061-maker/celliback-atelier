import React from 'react';

interface SiteBowProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * SiteBow: The bespoke French coquette satin ribbon bow for Celliback Atelier.
 * Takes color from `currentColor` (theme accent token `var(--primary)`).
 */
export const SiteBow: React.FC<SiteBowProps> = ({ className = '', ...props }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      width="100%"
      height="100%"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Left Satin Loop */}
      <path
        d="M22 24 C17 14, 5 12, 4 21 C3 28, 14 27, 22 24 Z"
        opacity="0.95"
      />
      {/* Left Inner Fold Sheen */}
      <path
        d="M19 22 C15 16, 8 15, 7 20 C6 24, 13 24, 19 22 Z"
        fill="white"
        opacity="0.32"
      />

      {/* Right Satin Loop */}
      <path
        d="M26 24 C31 14, 43 12, 44 21 C45 28, 34 27, 26 24 Z"
        opacity="0.95"
      />
      {/* Right Inner Fold Sheen */}
      <path
        d="M29 22 C33 16, 40 15, 41 20 C42 24, 35 24, 29 22 Z"
        fill="white"
        opacity="0.32"
      />

      {/* Left Draped Ribbon Tail with Swallowtail Notch */}
      <path
        d="M21 26 C19 32, 14 38, 10 44 L14 43 L17 40 C19 36, 21 31, 22 26 Z"
        opacity="0.9"
      />

      {/* Right Draped Ribbon Tail with Swallowtail Notch */}
      <path
        d="M27 26 C29 32, 34 38, 38 44 L34 43 L31 40 C29 36, 27 31, 26 26 Z"
        opacity="0.9"
      />

      {/* Center Satin Ribbon Knot */}
      <ellipse
        cx="24"
        cy="24"
        rx="4.2"
        ry="4.8"
      />
      {/* Center Knot Highlight */}
      <ellipse
        cx="23"
        cy="22.5"
        rx="2"
        ry="2.4"
        fill="white"
        opacity="0.35"
      />
    </svg>
  );
};
