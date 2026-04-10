import { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { ResultCard } from '@/components/ui/ResultCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { OptionField } from '@/features/converter/OptionField';
import { SelectionSheet } from '@/features/converter/SelectionSheet';
import { SwapButton } from '@/features/converter/SwapButton';
import {
  convertCurrency,
  CurrencyCode,
  currencyOptions,
  formatConvertedNumber,
  getOptionLabel,
  mockCurrencyLastUpdated,
} from '@/lib/converters';

function formatCurrencyAmount(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CurrencyConverterScreen() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('NGN');
  const [activePicker, setActivePicker] = useState<'from' | 'to' | null>(null);

  const numericAmount = Number(amount);
  const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;
  const convertedValue = convertCurrency(safeAmount, fromCurrency, toCurrency);

  const fromOption = getOptionLabel(currencyOptions, fromCurrency);
  const toOption = getOptionLabel(currencyOptions, toCurrency);

  const sheetOptions = currencyOptions.map((option) => ({
    label: option.label,
    value: option.value,
    description: option.shortLabel,
  }));

  const rateRows = [
    { from: 'USD' as CurrencyCode, to: 'NGN' as CurrencyCode },
    { from: 'EUR' as CurrencyCode, to: 'GBP' as CurrencyCode },
    { from: 'CAD' as CurrencyCode, to: 'JPY' as CurrencyCode },
  ];

  return (
    <>
      <AppScreen contentClassName="pb-32">
        <Animated.View entering={FadeInDown.duration(420)}>
          <AppHeader
            showBack
            title="Currency Converter"
            subtitle="Static mock rates for now, structured so they can later be replaced with a real API."
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(420).delay(90)}>
          <AppCard className="px-5 py-5">
            <View className="flex-row items-end gap-3">
              <OptionField
                label="From"
                value={`${fromOption.shortLabel} · ${fromOption.label}`}
                onPress={() => setActivePicker('from')}
              />
              <SwapButton
                onPress={() => {
                  setFromCurrency(toCurrency);
                  setToCurrency(fromCurrency);
                }}
              />
              <OptionField
                label="To"
                value={`${toOption.shortLabel} · ${toOption.label}`}
                onPress={() => setActivePicker('to')}
              />
            </View>

            <AppInput
              label="Amount"
              value={amount}
              keyboardType="decimal-pad"
              onChangeText={setAmount}
              placeholder="Enter an amount"
              className="mt-4"
            />

            <View className="mt-4 rounded-[20px] bg-canvas px-4 py-3">
              <Text className="font-heading text-sm text-ink">Rate source</Text>
              <Text className="mt-1 font-light text-sm leading-5 text-muted">
                Local mock exchange rates, last updated {mockCurrencyLastUpdated}.
              </Text>
            </View>
          </AppCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(420).delay(180)}>
          <SectionHeader eyebrow="Result" title="Converted amount" />
          <ResultCard
            eyebrow="Live result"
            title={`${fromOption.shortLabel} to ${toOption.shortLabel}`}
            value={`${toOption.shortLabel} ${formatCurrencyAmount(convertedValue)}`}
            caption={`1 ${fromOption.shortLabel} = ${formatConvertedNumber(
              convertCurrency(1, fromCurrency, toCurrency),
              4,
            )} ${toOption.shortLabel}`}
          >
            <View className="rounded-[20px] bg-canvas px-4 py-3">
              <Text className="font-light text-sm leading-5 text-muted">
                Exact mock update time: {mockCurrencyLastUpdated}.
              </Text>
            </View>
          </ResultCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(420).delay(270)}>
          <SectionHeader eyebrow="Conversion rates" title="Reference pairs" />
          <AppCard className="px-5 py-4">
            <View className="gap-4">
              {rateRows.map((pair) => {
                const rate = convertCurrency(1, pair.from, pair.to);

                return (
                  <View
                    key={`${pair.from}-${pair.to}`}
                    className="flex-row items-center justify-between border-b border-line pb-4 last:border-b-0 last:pb-0"
                  >
                    <View>
                      <Text className="font-heading text-[15px] text-ink">
                        {pair.from} to {pair.to}
                      </Text>
                      <Text className="mt-1 font-light text-sm text-muted">Static preview rate</Text>
                    </View>
                    <Text className="font-heading text-[15px] text-ink">
                      {formatCurrencyAmount(rate)} {pair.to}
                    </Text>
                  </View>
                );
              })}
            </View>
          </AppCard>
        </Animated.View>
      </AppScreen>

      <SelectionSheet
        visible={activePicker !== null}
        title={activePicker === 'from' ? 'Choose source currency' : 'Choose target currency'}
        selectedValue={activePicker === 'from' ? fromCurrency : toCurrency}
        options={sheetOptions}
        onClose={() => setActivePicker(null)}
        onSelect={(value) => {
          if (activePicker === 'from') {
            setFromCurrency(value as CurrencyCode);
            return;
          }

          setToCurrency(value as CurrencyCode);
        }}
      />
    </>
  );
}
