import type { ReactNode } from 'react'
import type { ArtKind } from '../types'

const shadow = <ellipse cx="200" cy="316" rx="120" ry="12" fill="#000" opacity="0.07" />

/** Ilustraciones de cada tipo de producto, dibujadas en un lienzo de 400 × 400. */
const drawings: Record<ArtKind, (color: string) => ReactNode> = {
  taza: (c) => (
    <>
      {shadow}
      <path d="M248 196c46 0 46 78 0 78" fill="none" stroke={c} strokeWidth="18" strokeLinecap="round" />
      <path d="M248 196c46 0 46 78 0 78" fill="none" stroke="#000" strokeWidth="18" strokeLinecap="round" opacity="0.12" />
      <path d="M148 178v104q0 30 30 30h44q30 0 30-30V178Z" fill={c} />
      <path d="M222 178h30v104q0 30-30 30Z" fill="#000" opacity="0.1" />
      <path d="M160 196v84q0 14 10 20" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.28" />
      <ellipse cx="200" cy="178" rx="52" ry="11" fill={c} />
      <ellipse cx="200" cy="179" rx="45" ry="7.5" fill="#000" opacity="0.32" />
      <path d="M186 150q-8-12 2-24t2-24M212 150q-8-12 2-24t2-24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.1" />
    </>
  ),
  jarron: (c) => (
    <>
      {shadow}
      <g fill="none" stroke="#5e6f55" strokeWidth="4" strokeLinecap="round">
        <path d="M200 140q-6-60-48-92" />
        <path d="M200 140q10-70 52-104" />
        <path d="M200 140q2-50-8-96" />
      </g>
      <g fill="#7d8f70">
        <ellipse cx="160" cy="62" rx="16" ry="7" transform="rotate(-35 160 62)" />
        <ellipse cx="176" cy="90" rx="15" ry="6" transform="rotate(25 176 90)" />
        <ellipse cx="242" cy="52" rx="16" ry="7" transform="rotate(40 242 52)" />
        <ellipse cx="224" cy="86" rx="15" ry="6" transform="rotate(-20 224 86)" />
        <ellipse cx="190" cy="56" rx="14" ry="6" transform="rotate(80 190 56)" />
      </g>
      <path
        d="M180 118h40l-2 34q62 30 62 92 0 70-80 72-80-2-80-72 0-62 62-92Z"
        fill={c}
        opacity="0.85"
      />
      <path d="M180 118h40l-2 34q62 30 62 92 0 70-80 72-80-2-80-72 0-62 62-92Z" fill="none" stroke="#000" strokeWidth="2" opacity="0.15" />
      <path d="M152 210q-14 30-4 66" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="200" cy="118" rx="20" ry="4" fill="#000" opacity="0.18" />
      <g fill="#fff" opacity="0.55">
        <circle cx="230" cy="230" r="3" />
        <circle cx="214" cy="270" r="2" />
        <circle cx="246" cy="262" r="2.5" />
        <circle cx="178" cy="250" r="2" />
      </g>
    </>
  ),
  manta: (c) => (
    <>
      {shadow}
      <rect x="96" y="232" width="208" height="80" rx="14" fill={c} />
      <rect x="96" y="232" width="208" height="80" rx="14" fill="#000" opacity="0.12" />
      <rect x="96" y="176" width="208" height="70" rx="14" fill={c} />
      <rect x="96" y="128" width="208" height="62" rx="14" fill={c} />
      <path d="M110 190h180M110 246h180" stroke="#000" strokeWidth="2" opacity="0.12" />
      <g stroke="#000" strokeWidth="1.5" opacity="0.07">
        <path d="M130 128v184M170 128v184M210 128v184M250 128v184M290 140v160" />
      </g>
      <path d="M112 142q40-8 90-4" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
      <g stroke={c} strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${306} ${180 + i * 5.5}h14`} />
        ))}
      </g>
      <g stroke="#000" strokeWidth="3" strokeLinecap="round" opacity="0.12">
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${306} ${180 + i * 5.5}h14`} />
        ))}
      </g>
    </>
  ),
  lampara: (c) => (
    <>
      {shadow}
      <path d="M122 196 92 316h170L208 196Z" fill="#ffd98a" opacity="0.22" />
      <path d="M252 300V150q0-56-56-56h-30" fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" />
      <path d="M134 130h64l20 66H114Z" fill={c} />
      <path d="M176 130h22l20 66h-28Z" fill="#000" opacity="0.14" />
      <path d="M140 140 126 186" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.25" />
      <ellipse cx="166" cy="196" rx="52" ry="7" fill={c} />
      <ellipse cx="166" cy="198" rx="30" ry="5" fill="#ffe2a3" />
      <rect x="160" y="112" width="12" height="20" rx="3" fill={c} />
      <ellipse cx="252" cy="304" rx="54" ry="11" fill={c} />
      <ellipse cx="252" cy="304" rx="54" ry="11" fill="#000" opacity="0.18" />
      <ellipse cx="252" cy="299" rx="50" ry="9" fill={c} />
    </>
  ),
  cuenco: (c) => (
    <>
      {shadow}
      <path d="M100 214q0 100 100 100t100-100Z" fill={c} />
      <path d="M200 314q100 0 100-100h-36q0 90-64 100Z" fill="#000" opacity="0.12" />
      <g fill="none" stroke="#000" strokeWidth="2" opacity="0.13" strokeLinecap="round">
        <path d="M118 246q40 18 70 8t70 14" />
        <path d="M132 272q36 14 66 4t62 10" />
        <path d="M156 296q26 8 48 2t40 4" />
      </g>
      <ellipse cx="200" cy="214" rx="100" ry="20" fill={c} />
      <ellipse cx="200" cy="216" rx="90" ry="15" fill="#000" opacity="0.22" />
      <path d="M122 232q8 36 34 58" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.25" />
      <circle cx="176" cy="208" r="13" fill="#c94f3d" />
      <circle cx="204" cy="204" r="14" fill="#d9a441" />
      <circle cx="226" cy="211" r="12" fill="#7a9a4f" />
    </>
  ),
  cojin: (c) => (
    <>
      {shadow}
      <path d="M108 120q92-22 184 0 22 90 0 184-92 22-184 0-22-94 0-184Z" fill={c} />
      <path d="M292 120q22 90 0 184-92 22-184 0 92 6 168-12 22-80 16-172Z" fill="#000" opacity="0.1" />
      <g fill="none" stroke="#000" strokeWidth="2.5" opacity="0.09" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M118 ${148 + i * 20}q20-6 41 0t41 0 41 0 41 0`} />
        ))}
      </g>
      <path d="M128 140q-10 50-4 90" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity="0.3" />
    </>
  ),
  portavelas: (c) => (
    <>
      {shadow}
      <circle cx="200" cy="168" r="60" fill="#ffd98a" opacity="0.18" />
      <path d="M200 140q-14 20-10 34 4 12 10 12t10-12q4-14-10-34Z" fill="#f2a93b" />
      <path d="M200 156q-6 10-4 18 2 6 4 6t4-6q2-8-4-18Z" fill="#ffe7a8" />
      <path d="M200 186v14" stroke="#3a2f25" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M136 210v76q0 28 28 28h72q28 0 28-28v-76Z" fill={c} />
      <path d="M236 210h28v76q0 28-28 28Z" fill="#000" opacity="0.1" />
      <ellipse cx="200" cy="210" rx="64" ry="12" fill={c} />
      <ellipse cx="200" cy="211" rx="56" ry="8.5" fill="#000" opacity="0.25" />
      <ellipse cx="200" cy="208" rx="28" ry="4" fill="#f4efe6" />
      <g fill="#000" opacity="0.12">
        <circle cx="168" cy="252" r="7" />
        <circle cx="200" cy="262" r="7" />
        <circle cx="232" cy="252" r="7" />
      </g>
      <path d="M148 228v54" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.28" />
    </>
  ),
  platos: (c) => (
    <>
      {shadow}
      {[0, 1, 2, 3].map((i) => {
        const y = 296 - i * 18
        return (
          <g key={i}>
            <ellipse cx="200" cy={y + 6} rx="124" ry="30" fill={c} />
            <ellipse cx="200" cy={y + 6} rx="124" ry="30" fill="#000" opacity="0.18" />
            <ellipse cx="200" cy={y} rx="124" ry="30" fill={c} />
          </g>
        )
      })}
      <ellipse cx="200" cy="244" rx="82" ry="18" fill="#000" opacity="0.08" />
      <ellipse cx="200" cy="244" rx="82" ry="18" fill="none" stroke="#fff" strokeWidth="2" opacity="0.25" />
      <path d="M100 236q20-18 70-24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
    </>
  ),
}

interface Props {
  kind: ArtKind
  color: string
  className?: string
}

/** Una ilustración suelta en su propio <svg>. */
export default function ProductArt({ kind, color, className = '' }: Props) {
  return (
    <svg aria-hidden="true" viewBox="40 30 320 320" preserveAspectRatio="xMidYMid meet" className={className}>
      {drawings[kind](color)}
    </svg>
  )
}

/** La ilustración como grupo, para componer escenas con varias piezas. */
export function ArtGroup({ kind, color, transform }: Props & { transform: string }) {
  return <g transform={transform}>{drawings[kind](color)}</g>
}
