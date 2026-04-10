import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { ResultCard } from '@/components/ui/ResultCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { OptionField } from '@/features/converter/OptionField';
import { SwapButton } from '@/features/converter/SwapButton';
import { cn } from '@/lib/utils';

type QuickConversion = {
  label: string;
  sublabel: string;
  value: string;
};

type UnitConversionScreenProps = {
  accentBackgroundClassName: string;
  accentColor: string;
  amount: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onAmountChange: (value: string) => void;
  onPressFrom: () => void;
  onPressTo: () => void;
  onSwap: () => void;
  quickConversions: QuickConversion[];
  resultCaption: string;
  resultValue: string;
  summary: string;
  title: string;
  toLabel: string;
  fromLabel: string;
};

export function UnitConversionScreen({
  accentBackgroundClassName,
  accentColor,
  amount,
  description,
  icon,
  onAmountChange,
  onPressFrom,
  onPressTo,
  onSwap,
  quickConversions,
  resultCaption,
  resultValue,
  summary,
  title,
  toLabel,
  fromLabel,
}: UnitConversionScreenProps) {
  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader showBack title={title} subtitle={description} />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="px-5 py-5">
          <View className="flex-row items-center gap-4">
            <View className={cn('h-14 w-14 items-center justify-center rounded-[22px]', accentBackgroundClassName)}>
              <Ionicons name={icon} size={24} color={accentColor} />
            </View>

            <View className="flex-1">
              <Text className="font-heading text-lg text-ink">{title}</Text>
              <Text className="mt-1 font-light text-sm leading-5 text-muted">{description}</Text>
            </View>
          </View>
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(160)}>
        <SectionHeader eyebrow="Convert" title="From one unit to another" />
        <AppCard className="px-5 py-5">
          <View className="flex-row items-end gap-3">
            <OptionField label="From" value={fromLabel} onPress={onPressFrom} />
            <SwapButton onPress={onSwap} />
            <OptionField label="To" value={toLabel} onPress={onPressTo} />
          </View>

          <AppInput
            label="Amount"
            value={amount}
            keyboardType="decimal-pad"
            onChangeText={onAmountChange}
            placeholder="Enter a value"
            className="mt-4"
          />

          <View className="mt-4 rounded-[20px] bg-canvas px-4 py-3">
            <Text className="font-heading text-sm text-ink">Live conversion</Text>
            <Text className="mt-1 font-light text-sm leading-5 text-muted">
              Results update instantly as you change the amount or switch units.
            </Text>
          </View>
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(230)}>
        <SectionHeader eyebrow="Result" title="Conversion output" />
        <ResultCard
          title={summary}
          value={resultValue}
          caption={resultCaption}
          eyebrow="Current result"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(300)}>
        <SectionHeader eyebrow="Quick conversions" title="Useful references" />
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {quickConversions.map((item) => (
            <AppCard key={`${item.label}-${item.value}`} className="w-[48.5%] px-4 py-4">
              <Text className="font-heading text-base text-ink">{item.label}</Text>
              <Text className="mt-3 font-display text-[22px] text-ink">{item.value}</Text>
              <Text className="mt-2 font-light text-sm leading-5 text-muted">{item.sublabel}</Text>
            </AppCard>
          ))}
        </View>
      </Animated.View>
    </AppScreen>
  );
}
