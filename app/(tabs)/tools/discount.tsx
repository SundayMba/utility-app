import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function DiscountCalculatorPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader showBack title="Discount Calculator" subtitle="Pricing and savings breakdown are queued for the next commit." />
      <EmptyState
        icon="cash"
        title="Discount calculator is queued"
        description="Original price, discount percent, final price, and savings will be added in the next pass."
      />
    </AppScreen>
  );
}
