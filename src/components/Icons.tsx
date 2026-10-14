import type { ReactNode } from 'react'

function Icon({ size = 16, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {children}
    </svg>
  )
}

type Props = { size?: number }

export const SearchIcon = (p: Props) => (
  <Icon {...p}>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5 14 14" />
  </Icon>
)

export const BagIcon = (p: Props) => (
  <Icon {...p}>
    <path d="M2.7 5.3h10.6l-.9 8.5H3.6l-.9-8.5Z" />
    <path d="M5.8 5.3V4a2.2 2.2 0 0 1 4.4 0v1.3" />
  </Icon>
)

export const PlusIcon = (p: Props) => (
  <Icon {...p}>
    <path d="M8 3v10M3 8h10" />
  </Icon>
)

export const MinusIcon = (p: Props) => (
  <Icon {...p}>
    <path d="M3 8h10" />
  </Icon>
)

export const CheckIcon = (p: Props) => (
  <Icon {...p}>
    <path d="m3.5 8.5 3 3 6-6.5" />
  </Icon>
)

export const ArrowRightIcon = (p: Props) => (
  <Icon {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </Icon>
)

export const ArrowLeftIcon = (p: Props) => (
  <Icon {...p}>
    <path d="M13 8H3M7 4 3 8l4 4" />
  </Icon>
)

export const AlertIcon = (p: Props) => (
  <Icon {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4.8v3.6M8 10.9v.2" />
  </Icon>
)

export const InfoIcon = (p: Props) => (
  <Icon {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 7.2v3.6M8 5v.2" />
  </Icon>
)
