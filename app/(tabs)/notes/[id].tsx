import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function NoteDetailPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="Note"
        subtitle="View, edit, and delete actions are the next notes feature slice."
      />
      <EmptyState
        icon="document-text"
        title="Detail editor is queued"
        description="This route is ready for editable note content and delete support."
      />
    </AppScreen>
  );
}
