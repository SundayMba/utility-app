import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CurrencyConverterPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="Currency Converter"
        subtitle="Static rates and API-ready data structure are planned for the next commit."
      />
      <EmptyState
        icon="cash"
        title="Currency conversion is next"
        description="Amount entry, swap, mock exchange rates, and last-updated metadata will be implemented here."
      />
    </AppScreen>
  );
}
