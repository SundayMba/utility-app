import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function NotesPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader title="Notes" subtitle="Search, create, and manage quick notes with local storage." />
      <EmptyState
        icon="document-text"
        title="Notes flow is queued"
        description="The list view, empty state, and editor screens are being added as a dedicated feature set in the next commits."
      />
    </AppScreen>
  );
}
