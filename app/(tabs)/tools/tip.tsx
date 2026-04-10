import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function TipCalculatorPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader showBack title="Tip Calculator" subtitle="Bill splitting and gratuity breakdown come in the next commit." />
      <EmptyState
        icon="card"
        title="Tip calculator is queued"
        description="Bill amount, tip percentage, split count, and per-person totals are ready to be added here."
      />
    </AppScreen>
  );
}
