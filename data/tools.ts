import { Href } from 'expo-router';

type ToolItem = {
  description: string;
  href: Href;
  icon: 'calculator' | 'card' | 'cash' | 'fitness' | 'time';
  tintBackgroundClassName: string;
  tintColor: string;
  title: string;
};

export const toolsHubItems: ToolItem[] = [
  {
    title: 'BMI Calculator',
    description: 'Check body mass index and healthy weight range.',
    href: '/(tabs)/tools/bmi',
    icon: 'fitness',
    tintBackgroundClassName: 'bg-accent/14',
    tintColor: '#4F7BF7',
  },
  {
    title: 'Tip Calculator',
    description: 'Split bills cleanly and adjust gratuity fast.',
    href: '/(tabs)/tools/tip',
    icon: 'card',
    tintBackgroundClassName: 'bg-aqua/16',
    tintColor: '#47C2C0',
  },
  {
    title: 'Age Calculator',
    description: 'Calculate age from date of birth and next birthday.',
    href: '/(tabs)/tools/age',
    icon: 'time',
    tintBackgroundClassName: 'bg-lilac/18',
    tintColor: '#6B78FA',
  },
  {
    title: 'Discount Calculator',
    description: 'See final price and savings from a discount.',
    href: '/(tabs)/tools/discount',
    icon: 'cash',
    tintBackgroundClassName: 'bg-warm/18',
    tintColor: '#F5B64D',
  },
  {
    title: 'Loan Calculator',
    description: 'Estimate monthly payments, total interest, and total payment.',
    href: '/(tabs)/tools/loan',
    icon: 'calculator',
    tintBackgroundClassName: 'bg-coral/14',
    tintColor: '#FF7A85',
  },
];
