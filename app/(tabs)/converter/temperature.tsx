import { useState } from 'react';

import { SelectionSheet } from '@/features/converter/SelectionSheet';
import { UnitConversionScreen } from '@/features/converter/UnitConversionScreen';
import {
  convertTemperature,
  formatConvertedNumber,
  getOptionLabel,
  temperatureOptions,
  TemperatureUnit,
} from '@/lib/converters';

export default function TemperatureConverterScreen() {
  const [amount, setAmount] = useState('37');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('c');
  const [toUnit, setToUnit] = useState<TemperatureUnit>('f');
  const [activePicker, setActivePicker] = useState<'from' | 'to' | null>(null);

  const numericAmount = Number(amount);
  const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
  const convertedValue = convertTemperature(safeAmount, fromUnit, toUnit);

  const fromOption = getOptionLabel(temperatureOptions, fromUnit);
  const toOption = getOptionLabel(temperatureOptions, toUnit);

  const summary = `${formatConvertedNumber(safeAmount)} ${fromOption.shortLabel} = ${formatConvertedNumber(
    convertedValue,
    2,
  )} ${toOption.shortLabel}`;

  const resultCaption = `Temperature converts by shifting scales, so the relation is not linear like length or weight.`;

  const sheetOptions = temperatureOptions.map((option) => ({
    label: option.label,
    value: option.value,
    description: option.shortLabel,
  }));

  return (
    <>
      <UnitConversionScreen
        title="Temperature Converter"
        description="Move between Celsius, Fahrenheit, and Kelvin with instant scale conversion."
        icon="thermometer"
        accentBackgroundClassName="bg-coral/14"
        accentColor="#FF7A85"
        amount={amount}
        onAmountChange={setAmount}
        fromLabel={`${fromOption.label} (${fromOption.shortLabel})`}
        toLabel={`${toOption.label} (${toOption.shortLabel})`}
        onPressFrom={() => setActivePicker('from')}
        onPressTo={() => setActivePicker('to')}
        onSwap={() => {
          setFromUnit(toUnit);
          setToUnit(fromUnit);
        }}
        resultValue={`${formatConvertedNumber(convertedValue, 2)} ${toOption.shortLabel}`}
        summary={summary}
        resultCaption={resultCaption}
        quickConversions={[
          { label: '0°C', value: '32°F', sublabel: 'Water freezing point' },
          { label: '100°C', value: '212°F', sublabel: 'Water boiling point' },
          { label: '273.15 K', value: '0°C', sublabel: 'Kelvin baseline' },
          { label: '37°C', value: '98.6°F', sublabel: 'Typical body temperature' },
        ]}
      />

      <SelectionSheet
        visible={activePicker !== null}
        title={activePicker === 'from' ? 'Choose source unit' : 'Choose target unit'}
        selectedValue={activePicker === 'from' ? fromUnit : toUnit}
        options={sheetOptions}
        onClose={() => setActivePicker(null)}
        onSelect={(value) => {
          if (activePicker === 'from') {
            setFromUnit(value as TemperatureUnit);
            return;
          }

          setToUnit(value as TemperatureUnit);
        }}
      />
    </>
  );
}
