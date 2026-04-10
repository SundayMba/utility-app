import { useState } from 'react';

import { SelectionSheet } from '@/features/converter/SelectionSheet';
import { UnitConversionScreen } from '@/features/converter/UnitConversionScreen';
import {
  convertWeight,
  formatConvertedNumber,
  getOptionLabel,
  weightOptions,
  WeightUnit,
} from '@/lib/converters';

export default function WeightConverterScreen() {
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState<WeightUnit>('kg');
  const [toUnit, setToUnit] = useState<WeightUnit>('lb');
  const [activePicker, setActivePicker] = useState<'from' | 'to' | null>(null);

  const numericAmount = Number(amount);
  const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
  const convertedValue = convertWeight(safeAmount, fromUnit, toUnit);

  const fromOption = getOptionLabel(weightOptions, fromUnit);
  const toOption = getOptionLabel(weightOptions, toUnit);

  const summary = `${formatConvertedNumber(safeAmount)} ${fromOption.shortLabel} = ${formatConvertedNumber(
    convertedValue,
  )} ${toOption.shortLabel}`;

  const resultCaption = `One ${fromOption.label.toLowerCase()} equals ${formatConvertedNumber(
    convertWeight(1, fromUnit, toUnit),
  )} ${toOption.label.toLowerCase()}${convertWeight(1, fromUnit, toUnit) === 1 ? '' : 's'}.`;

  const sheetOptions = weightOptions.map((option) => ({
    label: option.label,
    value: option.value,
    description: option.shortLabel,
  }));

  return (
    <>
      <UnitConversionScreen
        title="Weight Converter"
        description="Switch between metric and imperial weight units with immediate feedback."
        icon="barbell"
        accentBackgroundClassName="bg-warm/18"
        accentColor="#F5B64D"
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
        resultValue={`${formatConvertedNumber(convertedValue)} ${toOption.shortLabel}`}
        summary={summary}
        resultCaption={resultCaption}
        quickConversions={[
          { label: '1 kg', value: '1,000 g', sublabel: 'Metric base conversion' },
          { label: '1 lb', value: '16 oz', sublabel: 'Imperial quick check' },
          { label: '1 kg', value: '2.205 lb', sublabel: 'Gym-friendly reference' },
          { label: '1 ton', value: '1,000 kg', sublabel: 'Heavy load baseline' },
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
            setFromUnit(value as WeightUnit);
            return;
          }

          setToUnit(value as WeightUnit);
        }}
      />
    </>
  );
}
