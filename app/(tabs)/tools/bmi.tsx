import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function BmiCalculatorPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader showBack title="BMI Calculator" subtitle="The first calculator screen lands in the next commit." />
      <EmptyState
        icon="fitness"
        title="BMI calculator is next"
        description="Height, weight, category feedback, and healthy range details arrive in the next slice."
      />
    </AppScreen>
  );
}
