import { useState } from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { ResultCard } from '@/components/ui/ResultCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { calculateDiscount, formatMoney } from '@/lib/calculators';

export default function DiscountCalculatorScreen() {
  const [originalPrice, setOriginalPrice] = useState('170');
  const [discountPercent, setDiscountPercent] = useState('15');
  const [result, setResult] = useState(() => calculateDiscount(170, 15));

  function handleCalculate() {
    const nextPrice = Number(originalPrice);
    const nextDiscount = Number(discountPercent);

    if (!Number.isFinite(nextPrice) || !Number.isFinite(nextDiscount)) {
      return;
    }

    setResult(calculateDiscount(nextPrice, nextDiscount));
  }

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          showBack
          title="Discount Calculator"
          subtitle="Check the reduced price and total savings before you decide to buy."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="px-5 py-5">
          <AppInput
            label="Original Price"
            value={originalPrice}
            onChangeText={setOriginalPrice}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />
          <AppInput
            label="Discount Percentage"
            value={discountPercent}
            onChangeText={setDiscountPercent}
            keyboardType="decimal-pad"
            suffix="%"
            className="mt-4"
          />

          <AppButton label="Calculate Discount" onPress={handleCalculate} className="mt-5" />
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Result" title="Updated price" />
        <ResultCard
          eyebrow="Final price"
          title={`You save $${formatMoney(result.savings)}`}
          value={`$${formatMoney(result.finalPrice)}`}
          caption="Quick way to compare sale pricing without manual math."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(270)}>
        <AppCard className="px-5 py-5">
          <Text className="font-heading text-base text-ink">Savings signal</Text>
          <Text className="mt-2 font-light text-[15px] leading-6 text-muted">
            A discount looks stronger when you see both the reduced amount and the money staying in your pocket.
          </Text>
        </AppCard>
      </Animated.View>
    </AppScreen>
  );
}
