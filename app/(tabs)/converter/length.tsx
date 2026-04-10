import { useState } from 'react';

import { SelectionSheet } from '@/features/converter/SelectionSheet';
import { UnitConversionScreen } from '@/features/converter/UnitConversionScreen';
import {
  formatConvertedNumber,
  getOptionLabel,
  LengthUnit,
  lengthOptions,
  convertLength,
} from '@/lib/converters';

export default function LengthConverterScreen() {
  const [amount, setAmount] = useState('1');
  const [fromUnit, setFromUnit] = useState<LengthUnit>('km');
  const [toUnit, setToUnit] = useState<LengthUnit>('m');
  const [activePicker, setActivePicker] = useState<'from' | 'to' | null>(null);

  const numericAmount = Number(amount);
  const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
  const convertedValue = convertLength(safeAmount, fromUnit, toUnit);

  const fromOption = getOptionLabel(lengthOptions, fromUnit);
  const toOption = getOptionLabel(lengthOptions, toUnit);

  const summary = `${formatConvertedNumber(safeAmount)} ${fromOption.shortLabel} = ${formatConvertedNumber(
    convertedValue,
  )} ${toOption.shortLabel}`;

  const resultCaption = `One ${fromOption.label.toLowerCase()} equals ${formatConvertedNumber(
    convertLength(1, fromUnit, toUnit),
  )} ${toOption.label.toLowerCase()}${convertLength(1, fromUnit, toUnit) === 1 ? '' : 's'}.`;

  const sheetOptions = lengthOptions.map((option) => ({
    label: option.label,
    value: option.value,
    description: option.shortLabel,
  }));

  return (
    <>
      <UnitConversionScreen
        title="Length Converter"
        description="Convert distance and length units without losing the context of the result."
        icon="resize"
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
        resultValue={`${formatConvertedNumber(convertedValue)} ${toOption.shortLabel}`}
        summary={summary}
        resultCaption={resultCaption}
        quickConversions={[
          { label: '1 km', value: '1,000 m', sublabel: 'Common metric step' },
          { label: '1 m', value: '100 cm', sublabel: 'Base metric conversion' },
          { label: '1 mi', value: '1.609 km', sublabel: 'Road distance reference' },
          { label: '1 ft', value: '12 in', sublabel: 'Imperial quick check' },
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
            setFromUnit(value as LengthUnit);
            return;
          }

          setToUnit(value as LengthUnit);
        }}
      />
    </>
  );
}
