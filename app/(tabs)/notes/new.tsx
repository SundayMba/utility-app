import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function NewNotePlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="New Note"
        subtitle="The editor screen arrives in the next commit with real save behavior."
      />
      <EmptyState
        icon="create"
        title="Editor is next"
        description="Title and body inputs will be connected to AsyncStorage in the next notes commit."
      />
    </AppScreen>
  );
}
