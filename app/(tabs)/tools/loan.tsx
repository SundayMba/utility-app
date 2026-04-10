import { Text, View } from 'react-native';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppInput } from '@/components/ui/AppInput';
import { AppScreen } from '@/components/ui/AppScreen';
import { ResultCard } from '@/components/ui/ResultCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { calculateLoan, formatMoney } from '@/lib/calculators';

export default function LoanCalculatorScreen() {
  const [loanAmount, setLoanAmount] = useState('150000');
  const [annualInterestRate, setAnnualInterestRate] = useState('5');
  const [loanTermYears, setLoanTermYears] = useState('30');
  const [result, setResult] = useState(() => calculateLoan(150000, 5, 30));

  function handleCalculate() {
    const nextAmount = Number(loanAmount);
    const nextRate = Number(annualInterestRate);
    const nextTerm = Number(loanTermYears);

    if (!Number.isFinite(nextAmount) || !Number.isFinite(nextRate) || !Number.isFinite(nextTerm) || nextTerm <= 0) {
      return;
    }

    setResult(calculateLoan(nextAmount, nextRate, nextTerm));
  }

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          showBack
          title="Loan Calculator"
          subtitle="Estimate monthly payments and understand the full cost of a loan over time."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="px-5 py-5">
          <AppInput
            label="Loan Amount"
            value={loanAmount}
            onChangeText={setLoanAmount}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />
          <AppInput
            label="Annual Interest Rate"
            value={annualInterestRate}
            onChangeText={setAnnualInterestRate}
            keyboardType="decimal-pad"
            suffix="%"
            className="mt-4"
          />
          <AppInput
            label="Loan Term"
            value={loanTermYears}
            onChangeText={setLoanTermYears}
            keyboardType="number-pad"
            suffix="years"
            className="mt-4"
          />

          <AppButton label="Calculate Loan" onPress={handleCalculate} className="mt-5" />
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Monthly payment" title="Projected repayment" />
        <ResultCard
          eyebrow="Monthly estimate"
          title="Estimated monthly payment"
          value={`$${formatMoney(result.monthlyPayment)}`}
          caption={`Total interest: $${formatMoney(result.totalInterest)} · Total payment: $${formatMoney(
            result.totalPayment,
          )}`}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(270)}>
        <AppCard className="px-5 py-5">
          <Text className="font-heading text-base text-ink">Repayment context</Text>
          <View className="mt-4 gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-light text-sm text-muted">Loan amount</Text>
              <Text className="font-heading text-sm text-ink">${formatMoney(Number(loanAmount) || 0)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="font-light text-sm text-muted">Total interest</Text>
              <Text className="font-heading text-sm text-ink">${formatMoney(result.totalInterest)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="font-light text-sm text-muted">Total payment</Text>
              <Text className="font-heading text-sm text-ink">${formatMoney(result.totalPayment)}</Text>
            </View>
          </View>
        </AppCard>
      </Animated.View>
    </AppScreen>
  );
}
