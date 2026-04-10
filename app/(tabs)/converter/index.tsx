import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ConverterHubPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader title="Converter" subtitle="Length, weight, temperature, and currency tools land here next." />
      <EmptyState
        icon="swap-horizontal"
        title="Converter hub is next"
        description="The shared converter shell and category cards are the next feature slice, so this tab is reserved and ready."
      />
    </AppScreen>
  );
}
