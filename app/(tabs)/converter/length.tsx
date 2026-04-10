import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function LengthConverterPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="Length Converter"
        subtitle="The shared conversion shell is in place. This detailed screen is the next commit."
      />
      <EmptyState
        icon="resize"
        title="Length conversion lands next"
        description="From and to selectors, swap interaction, and quick conversions are the next slice."
      />
    </AppScreen>
  );
}
