import React from 'react'
import './CanDesign.css'

type Props = {
  label?: string
  accent?: string
  variant?: 'ultra' | 'classic' | 'juice'
}

const CanDesign: React.FC<Props> = ({ label = 'Monster Front', accent = '#00e61b', variant = 'classic' }) => {
  const bodyFill = variant === 'ultra' ? '#f2f4f5' : variant === 'juice' ? '#1a1a1a' : '#0f0f10'
  const stroke = '#2a2a2a'
  return (
    <figure className="can" aria-label={label}>
      <svg className="can__svg" viewBox="0 0 120 260" role="img" aria-labelledby="title desc">
        <title id="title">Canette {label}</title>
        <desc id="desc">Canette stylisée avec accent de couleur</desc>
        <defs>
          <linearGradient id="bodyShade" x1="0" x2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="topShade" x1="0" x2="1">
            <stop offset="0%" stopColor="#d1d1d1" />
            <stop offset="100%" stopColor="#9a9a9a" />
          </linearGradient>
        </defs>

        {/* Top */}
        <rect x="28" y="8" width="64" height="14" rx="6" fill="url(#topShade)" stroke={stroke} strokeWidth="1" />

        {/* Body */}
        <rect x="20" y="20" width="80" height="200" rx="12" fill={bodyFill} stroke={stroke} strokeWidth="1" />
        <rect x="20" y="20" width="80" height="200" rx="12" fill="url(#bodyShade)" />

        {/* Accent stripe */}
        <rect x="26" y="26" width="68" height="6" rx="3" fill={accent} opacity="0.9" />

        {/* Label area */}
        <rect x="30" y="60" width="60" height="70" rx="6" fill="#0d0d0d" opacity="0.85" />
        <text x="60" y="95" textAnchor="middle" fontFamily="system-ui, Arial" fontWeight="700" fontSize="12" fill={accent}>
          {label.split(' ')[0]}
        </text>
        <text x="60" y="112" textAnchor="middle" fontFamily="system-ui, Arial" fontWeight="700" fontSize="12" fill={accent}>
          {label.split(' ')[1] || ''}
        </text>

        {/* Bottom ring */}
        <rect x="20" y="220" width="80" height="10" rx="5" fill="#0b0b0b" stroke={stroke} strokeWidth="1" />

        {/* Glow */}
        <ellipse cx="60" cy="238" rx="34" ry="6" fill={accent} opacity="0.15" />
      </svg>
      <figcaption className="can__caption">{variant}</figcaption>
    </figure>
  )
}

export default CanDesign
