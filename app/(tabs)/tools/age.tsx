import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AgeCalculatorPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader showBack title="Age Calculator" subtitle="Date-based age calculation is reserved for the next commit." />
      <EmptyState
        icon="time"
        title="Age calculator is next"
        description="Date of birth input, calculated age, and next birthday details will be implemented here."
      />
    </AppScreen>
  );
}
