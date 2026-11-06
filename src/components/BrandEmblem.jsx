"useClient";
import React from "react";

export default function BrandEmblem({ size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Restaurant Emblem"
    >
      {/* Outer sacred geometry petals inspired by Nemi luxury emblem */}
      <g stroke="#B99A65" strokeWidth="1.2" strokeOpacity="0.85">
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(30 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(90 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(120 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" transform="rotate(150 50 50)" />
      </g>
      {/* Inner core refinement */}
      <circle cx="50" cy="50" r="10" stroke="#B99A65" strokeWidth="1.2" strokeOpacity="0.95" />
      <circle cx="50" cy="50" r="3" fill="#B99A65" />
    </svg>
  );
}

