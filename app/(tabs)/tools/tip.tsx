import { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { ResultCard } from '@/components/ui/ResultCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { calculateTipBreakdown, formatMoney } from '@/lib/calculators';

const tipPresets = [10, 12, 15, 18, 20];

export default function TipCalculatorScreen() {
  const [billAmount, setBillAmount] = useState('125');
  const [tipPercent, setTipPercent] = useState('12');
  const [peopleCount, setPeopleCount] = useState('2');
  const [result, setResult] = useState(() => calculateTipBreakdown(125, 12, 2));

  function handleCalculate() {
    const nextBill = Number(billAmount);
    const nextTip = Number(tipPercent);
    const nextPeople = Number(peopleCount);

    if (!Number.isFinite(nextBill) || !Number.isFinite(nextTip) || !Number.isFinite(nextPeople) || nextPeople <= 0) {
      return;
    }

    setResult(calculateTipBreakdown(nextBill, nextTip, nextPeople));
  }

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          showBack
          title="Tip Calculator"
          subtitle="Set the bill, choose a gratuity, and split the total across the table."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="px-5 py-5">
          <AppInput
            label="Bill Amount"
            value={billAmount}
            onChangeText={setBillAmount}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />

          <Text className="mb-2 mt-4 font-heading text-sm text-ink">Tip Percentage</Text>
          <View className="flex-row flex-wrap gap-3">
            {tipPresets.map((preset) => {
              const selected = tipPercent === String(preset);

              return (
                <PressableScale
                  key={preset}
                  onPress={() => setTipPercent(String(preset))}
                  className={`rounded-2xl px-4 py-3 ${selected ? 'bg-accent' : 'bg-white'}`}
                >
                  <Text className={`font-heading text-sm ${selected ? 'text-white' : 'text-ink'}`}>{preset}%</Text>
                </PressableScale>
              );
            })}
          </View>

          <AppInput
            label="Custom Tip"
            value={tipPercent}
            onChangeText={setTipPercent}
            keyboardType="decimal-pad"
            suffix="%"
            className="mt-4"
          />
          <AppInput
            label="Split By"
            value={peopleCount}
            onChangeText={setPeopleCount}
            keyboardType="number-pad"
            suffix="people"
            className="mt-4"
          />

          <AppButton label="Calculate Tip" onPress={handleCalculate} className="mt-5" />
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Breakdown" title="Final split" />
        <ResultCard
          eyebrow="Per person"
          title="Each person pays"
          value={`$${formatMoney(result.perPerson)}`}
          caption={`Tip amount: $${formatMoney(result.tipAmount)} · Total bill: $${formatMoney(result.total)}`}
        />
      </Animated.View>
    </AppScreen>
  );
}
