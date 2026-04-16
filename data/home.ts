import { Href } from 'expo-router';

type QuickAccessItem = {
  description: string;
  href: Href;
  icon: 'swap-horizontal' | 'document-text' | 'barbell' | 'construct' | 'checkbox';
  title: string;
  tintBackgroundClassName: string;
  tintColor: string;
};

type OverviewItem = {
  label: string;
  title: string;
};

export const homeQuickAccess: QuickAccessItem[] = [
  {
    title: 'Unit Converter',
    description: 'Length, weight, temperature, currency',
    href: '/(tabs)/converter',
    icon: 'swap-horizontal',
    tintBackgroundClassName: 'bg-accent/14',
    tintColor: '#4F7BF7',
  },
  {
    title: 'Checklist',
    description: 'Create, complete, edit, and delete tasks',
    href: '/tasks' as Href,
    icon: 'checkbox',
    tintBackgroundClassName: 'bg-warm/18',
    tintColor: '#F5B64D',
  },
  {
    title: 'BMI Calculator',
    description: 'Check your body mass index',
    href: '/(tabs)/tools/bmi',
    icon: 'barbell',
    tintBackgroundClassName: 'bg-aqua/16',
    tintColor: '#47C2C0',
  },
  {
    title: 'Tools Hub',
    description: 'Tip, age, discount, and loan utilities',
    href: '/(tabs)/tools',
    icon: 'construct',
    tintBackgroundClassName: 'bg-coral/14',
    tintColor: '#FF7A85',
  },
];

export const homeOverview: OverviewItem[] = [
  { title: '4', label: 'Converter Types' },
  { title: 'Tasks', label: 'Offline Checklist' },
  { title: 'BMI', label: 'Health Tool' },
  { title: 'Fast', label: 'Simple UX' },
];
