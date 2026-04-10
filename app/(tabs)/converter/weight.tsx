import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function WeightConverterPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="Weight Converter"
        subtitle="This route is wired and ready for the next feature commit."
      />
      <EmptyState
        icon="barbell"
        title="Weight conversion is queued"
        description="Kilograms, grams, pounds, ounces, milligrams, and tons will be added with the same shared layout."
      />
    </AppScreen>
  );
}
