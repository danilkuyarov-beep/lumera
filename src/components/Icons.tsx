import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 18, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const IconSearch = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-3.6-3.6" />
  </Svg>
)

export const IconHeart = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 20.4c-.34 0-.67-.08-.96-.24C8.2 18.4 3.9 14.7 3.9 10.5 3.9 7.9 5.8 6 8.3 6c1.36 0 2.7.68 3.7 1.82C13 6.68 14.34 6 15.7 6c2.5 0 4.4 1.9 4.4 4.5 0 4.2-4.3 7.9-7.14 9.66-.29.16-.62.24-.96.24z" />
  </Svg>
)

export const IconHeartFilled = (p: IconProps) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M12 20.4c-.34 0-.67-.08-.96-.24C8.2 18.4 3.9 14.7 3.9 10.5 3.9 7.9 5.8 6 8.3 6c1.36 0 2.7.68 3.7 1.82C13 6.68 14.34 6 15.7 6c2.5 0 4.4 1.9 4.4 4.5 0 4.2-4.3 7.9-7.14 9.66-.29.16-.62.24-.96.24z" />
  </Svg>
)

export const IconBag = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.2 8h11.6l-.9 11.2a2 2 0 0 1-2 1.8H9.1a2 2 0 0 1-2-1.8L6.2 8z" />
    <path d="M9 8V6.8a3 3 0 0 1 6 0V8" />
  </Svg>
)

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8h16M4 16h16" />
  </Svg>
)

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
)

export const IconChevronLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Svg>
)

export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </Svg>
)

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </Svg>
)

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const IconMinus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
)

export const IconTrash = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M6.5 7l.7 11a2 2 0 0 0 2 1.9h5.6a2 2 0 0 0 2-1.9l.7-11" />
    <path d="M10 11v6M14 11v6" />
  </Svg>
)

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
)

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Svg>
)

export const IconInstagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconPinterest = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8.5c-2 0-3.4 1.2-3.4 2.9 0 1 .5 1.8 1.3 2.2-.1-.4-.2-1 0-1.4l.9-3.2M10.5 19l2.5-8.5M13.8 11.5c.5-.4.9-1 .9-1.8 0-1.5-1.2-2.4-2.8-2.4-1.9 0-3.2 1.3-3.2 3.1 0 1.6 1 2.9 2.4 2.9.5 0 1-.2 1.2-.5" />
  </Svg>
)

export const IconTelegram = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m6.2 11.9 10.9-4.2-2.3 8.8-3.4-2.7-2.1 2 .4-3.4z" />
    <path d="m11.4 13.8 5.7-6.1" />
  </Svg>
)

export const IconLeaf = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 19C5 10 12 4.5 20 4.5c.5 8-4 15-13 15" />
    <path d="M5 19c3.5-4.5 8-8.5 12-11" />
  </Svg>
)

export const IconHand = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11M11 11V5.5a1.5 1.5 0 0 1 3 0V11M14 11V7a1.5 1.5 0 0 1 3 0v6.5c0 4-2.2 6.5-5.5 6.5-2.6 0-4.6-1.6-5.5-4L4.5 14a1.4 1.4 0 0 1 2.5-1.3L8 14" />
  </Svg>
)

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 5 6v5.5c0 4.3 2.9 7.6 7 9 4.1-1.4 7-4.7 7-9V6l-7-2.5z" />
    <path d="m9 11.5 2.2 2.2L15.5 9" />
  </Svg>
)

export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.6 2.4 3.9 5.2 3.9 8.5s-1.3 6.1-3.9 8.5c-2.6-2.4-3.9-5.2-3.9-8.5s1.3-6.1 3.9-8.5z" />
  </Svg>
)

export const IconSlider = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
    <circle cx="15" cy="7" r="2" />
    <circle cx="9" cy="17" r="2" />
  </Svg>
)
