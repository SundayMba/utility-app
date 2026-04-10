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
import { calculateAge } from '@/lib/calculators';

function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  return !Number.isNaN(new Date(value).getTime());
}

export default function AgeCalculatorScreen() {
  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);
  const [dateOfBirth, setDateOfBirth] = useState('1998-06-15');
  const [result, setResult] = useState(() => calculateAge('1998-06-15', today));

  function handleCalculate() {
    if (!isIsoDate(dateOfBirth)) {
      return;
    }

    setResult(calculateAge(dateOfBirth, today));
  }

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          showBack
          title="Age Calculator"
          subtitle="Use an ISO date of birth and compare it against today’s date for a clean result."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="px-5 py-5">
          <AppInput
            label="Date of Birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="YYYY-MM-DD"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View className="mt-4 rounded-[20px] bg-canvas px-4 py-4">
            <Text className="font-heading text-sm text-ink">Current date</Text>
            <Text className="mt-2 font-display text-[22px] text-ink">{todayString}</Text>
          </View>

          <AppButton label="Calculate Age" onPress={handleCalculate} className="mt-5" />
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Result" title="Age summary" />
        <ResultCard
          eyebrow="Current age"
          title={`${result.years} years, ${result.months} months, ${result.days} days`}
          value={`${result.years}`}
          caption={`Next birthday: ${result.nextBirthday.toLocaleDateString()} · ${result.daysUntilBirthday} days away`}
        />
      </Animated.View>
    </AppScreen>
  );
}
