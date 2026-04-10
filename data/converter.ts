import { Href } from 'expo-router';

type ConverterCategory = {
  description: string;
  href: Href;
  icon: 'resize' | 'barbell' | 'thermometer' | 'cash';
  tintBackgroundClassName: string;
  tintColor: string;
  title: string;
};

export const converterCategories: ConverterCategory[] = [
  {
    title: 'Length Converter',
    description: 'Convert meters, kilometers, miles, feet, and more.',
    href: '/(tabs)/converter/length',
    icon: 'resize',
    tintBackgroundClassName: 'bg-aqua/16',
    tintColor: '#47C2C0',
  },
  {
    title: 'Weight Converter',
    description: 'Convert kilograms, grams, pounds, ounces, and tons.',
    href: '/(tabs)/converter/weight',
    icon: 'barbell',
    tintBackgroundClassName: 'bg-warm/18',
    tintColor: '#F5B64D',
  },
  {
    title: 'Temperature Converter',
    description: 'Convert Celsius, Fahrenheit, and Kelvin instantly.',
    href: '/(tabs)/converter/temperature',
    icon: 'thermometer',
    tintBackgroundClassName: 'bg-coral/14',
    tintColor: '#FF7A85',
  },
  {
    title: 'Currency Converter',
    description: 'Preview static exchange rates with a future API-ready structure.',
    href: '/(tabs)/converter/currency',
    icon: 'cash',
    tintBackgroundClassName: 'bg-accent/14',
    tintColor: '#4F7BF7',
  },
];
