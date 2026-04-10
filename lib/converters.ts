export type ConverterOption<T extends string> = {
  label: string;
  shortLabel: string;
  value: T;
};

export type LengthUnit = 'cm' | 'ft' | 'in' | 'km' | 'm' | 'mi' | 'mm' | 'yd';
export type WeightUnit = 'g' | 'kg' | 'lb' | 'mg' | 'oz' | 'ton';
export type TemperatureUnit = 'c' | 'f' | 'k';
export type CurrencyCode = 'CAD' | 'EUR' | 'GBP' | 'JPY' | 'NGN' | 'USD';

export const lengthOptions: ConverterOption<LengthUnit>[] = [
  { value: 'm', label: 'Meter', shortLabel: 'm' },
  { value: 'km', label: 'Kilometer', shortLabel: 'km' },
  { value: 'cm', label: 'Centimeter', shortLabel: 'cm' },
  { value: 'mm', label: 'Millimeter', shortLabel: 'mm' },
  { value: 'ft', label: 'Feet', shortLabel: 'ft' },
  { value: 'in', label: 'Inch', shortLabel: 'in' },
  { value: 'mi', label: 'Mile', shortLabel: 'mi' },
  { value: 'yd', label: 'Yard', shortLabel: 'yd' },
];

export const weightOptions: ConverterOption<WeightUnit>[] = [
  { value: 'kg', label: 'Kilogram', shortLabel: 'kg' },
  { value: 'g', label: 'Gram', shortLabel: 'g' },
  { value: 'lb', label: 'Pound', shortLabel: 'lb' },
  { value: 'oz', label: 'Ounce', shortLabel: 'oz' },
  { value: 'mg', label: 'Milligram', shortLabel: 'mg' },
  { value: 'ton', label: 'Ton', shortLabel: 't' },
];

export const temperatureOptions: ConverterOption<TemperatureUnit>[] = [
  { value: 'c', label: 'Celsius', shortLabel: '°C' },
  { value: 'f', label: 'Fahrenheit', shortLabel: '°F' },
  { value: 'k', label: 'Kelvin', shortLabel: 'K' },
];

export const currencyOptions: ConverterOption<CurrencyCode>[] = [
  { value: 'USD', label: 'US Dollar', shortLabel: 'USD' },
  { value: 'EUR', label: 'Euro', shortLabel: 'EUR' },
  { value: 'GBP', label: 'British Pound', shortLabel: 'GBP' },
  { value: 'NGN', label: 'Nigerian Naira', shortLabel: 'NGN' },
  { value: 'CAD', label: 'Canadian Dollar', shortLabel: 'CAD' },
  { value: 'JPY', label: 'Japanese Yen', shortLabel: 'JPY' },
];

const lengthFactors: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

const weightFactors: Record<WeightUnit, number> = {
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  oz: 0.028349523125,
  lb: 0.45359237,
  ton: 1000,
};

export const mockCurrencyRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  NGN: 1450,
  CAD: 1.37,
  JPY: 157.2,
};

export const mockCurrencyLastUpdated = 'Apr 10, 2026, 11:30 AM WAT';

export function convertLength(value: number, from: LengthUnit, to: LengthUnit) {
  return (value * lengthFactors[from]) / lengthFactors[to];
}

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit) {
  return (value * weightFactors[from]) / weightFactors[to];
}

export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit) {
  let celsius = value;

  if (from === 'f') {
    celsius = ((value - 32) * 5) / 9;
  }

  if (from === 'k') {
    celsius = value - 273.15;
  }

  if (to === 'c') {
    return celsius;
  }

  if (to === 'f') {
    return (celsius * 9) / 5 + 32;
  }

  return celsius + 273.15;
}

export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode) {
  const usdValue = amount / mockCurrencyRates[from];
  return usdValue * mockCurrencyRates[to];
}

export function formatConvertedNumber(value: number, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return '0';
  }

  return value.toLocaleString(undefined, {
    maximumFractionDigits,
  });
}

export function getOptionLabel<T extends string>(options: ConverterOption<T>[], value: T) {
  return options.find((option) => option.value === value) ?? options[0];
}
