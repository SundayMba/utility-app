import { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { ResultCard } from '@/components/ui/ResultCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { calculateBmi } from '@/lib/calculators';

export default function BmiCalculatorScreen() {
  const [heightCm, setHeightCm] = useState('180');
  const [weightKg, setWeightKg] = useState('75');
  const [result, setResult] = useState(() => calculateBmi(180, 75));

  function handleCalculate() {
    const nextHeight = Number(heightCm);
    const nextWeight = Number(weightKg);

    if (!Number.isFinite(nextHeight) || !Number.isFinite(nextWeight) || nextHeight <= 0 || nextWeight <= 0) {
      return;
    }

    setResult(calculateBmi(nextHeight, nextWeight));
  }

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          showBack
          title="BMI Calculator"
          subtitle="Check body mass index quickly and compare against a healthy weight range."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="px-5 py-5">
          <Text className="font-heading text-lg text-ink">Body metrics</Text>
          <Text className="mt-1 font-light text-sm leading-5 text-muted">
            Enter metric values for height and weight, then calculate your BMI instantly.
          </Text>

          <AppInput
            label="Height"
            value={heightCm}
            onChangeText={setHeightCm}
            keyboardType="decimal-pad"
            suffix="cm"
            className="mt-5"
          />
          <AppInput
            label="Weight"
            value={weightKg}
            onChangeText={setWeightKg}
            keyboardType="decimal-pad"
            suffix="kg"
            className="mt-4"
          />

          <AppButton label="Calculate BMI" onPress={handleCalculate} className="mt-5" />
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Result" title="Current body mass index" />
        <ResultCard
          eyebrow="Your BMI"
          title={result.category}
          value={result.bmi.toFixed(1)}
          caption="BMI is a general screening metric and not a medical diagnosis."
        >
          <View className="rounded-[20px] bg-canvas px-4 py-4">
            <Text className="font-heading text-sm text-ink">Healthy range for your height</Text>
            <Text className="mt-2 font-display text-[24px] text-ink">
              {Math.round(result.healthyRange[0])} kg - {Math.round(result.healthyRange[1])} kg
            </Text>
          </View>
        </ResultCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(270)}>
        <SectionHeader eyebrow="Tip" title="Supportive guidance" />
        <AppCard className="px-5 py-5">
          <Text className="font-heading text-base text-ink">Use BMI as one signal, not the whole picture.</Text>
          <Text className="mt-2 font-light text-[15px] leading-6 text-muted">
            Hydration, muscle mass, body composition, and medical history all matter too. If you need a true health
            assessment, use this as a starting point and follow up with a clinician.
          </Text>
        </AppCard>
      </Animated.View>
    </AppScreen>
  );
}
