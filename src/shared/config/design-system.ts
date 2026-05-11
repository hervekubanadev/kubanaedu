export const designTokens = {
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  radius: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    pill: '9999px',
  },
  shadows: {
    soft: '0 8px 20px rgba(15, 23, 42, 0.05)',
    card: '0 14px 36px rgba(15, 23, 42, 0.07)',
    elevated: '0 24px 60px rgba(15, 23, 42, 0.12)',
    glass: '0 10px 28px rgba(15, 23, 42, 0.08)',
    glowBlue: '0 10px 30px rgba(59, 130, 246, 0.14)',
  },
  colors: {
    canvas: '#FFFFFF',
    backgroundSoft: '#F8FAFC',
    accentBlueSoft: '#DBEAFE',
    accentBlue: '#BFDBFE',
    accentPurpleSoft: '#E9D5FF',
    navyStrong: '#0B1530',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    borderSoft: 'rgba(191, 219, 254, 0.7)',
    glass: 'rgba(255, 255, 255, 0.72)',
  },
  typography: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  containerWidths: {
    content: '80rem',
    shell: '100rem',
    auth: '28rem',
  },
  transitions: {
    quick: 'all 160ms ease-out',
    standard: 'all 200ms ease-out',
    smooth: 'all 300ms ease-out',
    accent: 'all 250ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const

export const uiConstants = {
  layout: {
    shellBackground: 'bg-[linear-gradient(165deg,#ffffff_0%,#f8fafc_48%,#eaf2ff_100%)]',
    shellLighting:
      'bg-[radial-gradient(circle_at_14%_6%,rgba(191,219,254,0.36),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(191,219,254,0.18),transparent_32%),radial-gradient(circle_at_82%_86%,rgba(233,213,255,0.11),transparent_34%)]',
    pageContainer: 'mx-auto w-full max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-8',
  },
  surface: {
    card:
      'rounded-2xl border border-blue-100/70 bg-white/86 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.07)] backdrop-blur-[6px] sm:p-5',
    glassPanel:
      'border border-blue-100/70 bg-white/78 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl',
  },
  navigation: {
    sidebar:
      'hidden h-screen w-72 shrink-0 border-r border-blue-100/70 bg-gradient-to-b from-white/88 via-blue-50/45 to-white/80 px-4 py-6 backdrop-blur-md lg:sticky lg:top-0 lg:flex lg:flex-col',
    bottom:
      'fixed inset-x-0 bottom-0 z-40 border-t border-blue-100/80 bg-white/82 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden',
    header:
      'sticky top-0 z-30 border-b border-blue-100/70 bg-white/72 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8',
  },
  motion: {
    interactive: 'transition duration-200 ease-out',
    smooth: 'transition duration-300 ease-out',
  },
  interaction: {
    focusRing:
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    pressable: 'active:translate-y-[1px] active:scale-[0.997]',
    hoverLift: 'hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)]',
    navigationItem:
      'border border-transparent hover:border-blue-100 hover:bg-white/75 hover:text-slate-900 active:bg-blue-50/65',
    glassSurface:
      'hover:border-blue-200/70 hover:bg-white/84 hover:shadow-[0_14px_34px_rgba(15,23,42,0.1)]',
    cardInteractive:
      'cursor-pointer hover:-translate-y-0.5 hover:border-blue-200/80 hover:shadow-[0_16px_40px_rgba(15,23,42,0.09)] active:translate-y-0',
  },
  button: {
    base:
      'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-55',
    variants: {
      primary: 'bg-gradient-to-r from-slate-900 to-[#0b1530] text-white hover:from-[#0b1530] hover:to-slate-900',
      secondary: 'border border-blue-100 bg-white/90 text-slate-800 hover:border-blue-200 hover:bg-white',
      ghost: 'bg-transparent text-slate-700 hover:bg-blue-50/65 hover:text-slate-900',
      glass:
        'border border-blue-100/80 bg-white/72 text-slate-800 backdrop-blur-xl hover:border-blue-200 hover:bg-white/84',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
      icon: 'size-10 rounded-xl border border-blue-100/80 bg-white/70 p-0 text-slate-600 hover:border-blue-200 hover:bg-white hover:text-slate-900',
    },
  },
  field: {
    input:
      'h-11 w-full rounded-xl border border-blue-100 bg-white/88 px-3 text-sm text-slate-800 placeholder:text-slate-400',
  },
} as const

export type DesignTokens = typeof designTokens
export type ButtonVariant = keyof typeof uiConstants.button.variants
