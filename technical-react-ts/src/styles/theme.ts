export const theme = {
  colors: {
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(51, 51, 51, 1)',
    grayMedium: 'rgba(0, 0, 0, 0.12)',
    grayDark: 'rgba(204, 204, 204, 1)',
    grayLight: 'rgba(247, 247, 247, 1)',
    blueDark: 'rgba(50, 75, 255, 1)',
    blueMedium: 'rgba(161, 196, 253, 1)',
    blueLight: 'rgba(194, 233, 251, 1)',
  },
  radius: {
    lg: '20px',
    pill: '50px',
  },
  shadows: {
    card: '0 5px 12px rgba(0, 0, 0, 0.12)',
  },
  spacing: {
    xs: '8px',
    sm: '15px',
    md: '20px',
    lg: '30px',
    xl: '50px',
  },
} as const;

export type AppTheme = typeof theme;
