import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ToolsHubPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader title="Tools" subtitle="BMI, tip, age, discount, and loan calculators live here." />
      <EmptyState
        icon="construct"
        title="Tools hub is reserved"
        description="The expandable calculator hub and each calculator screen will land after the converter flow is complete."
      />
    </AppScreen>
  );
}
