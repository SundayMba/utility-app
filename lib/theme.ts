import { DefaultTheme } from '@react-navigation/native';

export const palette = {
  accent: '#4F7BF7',
  aqua: '#47C2C0',
  canvas: '#F4F7FB',
  coral: '#FF7A85',
  ink: '#183B6B',
  line: '#DCE6F2',
  muted: '#6D7A90',
  shell: '#102847',
  shellAccent: '#9DBBFF',
  shellBorder: '#27456F',
  shellMuted: '#87A0C4',
  success: '#1F8B71',
  surface: '#FFFFFF',
  warm: '#F5B64D',
};

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.canvas,
    border: palette.line,
    card: palette.surface,
    notification: palette.accent,
    primary: palette.accent,
    text: palette.ink,
  },
};

export const surfaceShadow = {
  shadowColor: '#12305D',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 22,
  elevation: 6,
};
