import React from 'react';

type Props = {
  size?: number;
  tone?: 'warm' | 'flat';
};

// Editorial-warm robot — matches the print design language.
export default function Robot({ size = 220, tone = 'warm' }: Props) {
  const ink = '#1A1714';
  const accent = tone === 'warm' ? '#C84B31' : '#1A1714';
  return (
    <svg
      viewBox="0 0 240 260"
      width={size}
      height={(size * 260) / 240}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line x1="120" y1="14" x2="120" y2="46" stroke={ink} strokeWidth="2" />
      <circle cx="120" cy="12" r="6" fill={accent} />
      <rect x="56" y="46" width="128" height="118" rx="22" fill="#FBF6EC" stroke={ink} strokeWidth="3" />
      <rect x="74" y="78" width="92" height="58" rx="14" fill={ink} />
      <circle cx="100" cy="107" r="7" fill={accent} />
      <circle cx="140" cy="107" r="7" fill={accent} />
      <circle cx="68" cy="120" r="3" fill={accent} />
      <circle cx="172" cy="120" r="3" fill={accent} />
      <rect x="108" y="164" width="24" height="14" fill={ink} />
      <rect x="48" y="178" width="144" height="64" rx="16" fill={ink} />
      <circle cx="120" cy="212" r="5" fill={accent} />
    </svg>
  );
}
