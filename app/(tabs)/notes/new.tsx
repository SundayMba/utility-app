import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppButton } from '@/components/ui/AppButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { NoteEditorForm } from '@/features/notes/NoteEditorForm';
import { createNote } from '@/lib/notes';

export default function NewNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  async function handleSave() {
    if (!canSave || saving) {
      return;
    }

    try {
      setSaving(true);
      await createNote({ title, body });
      router.replace('/(tabs)/notes');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="New Note"
        subtitle="Capture a title and a few lines quickly, then return to the list."
        rightSlot={
          <PressableScale onPress={handleSave} className={saving || !canSave ? 'opacity-50' : ''}>
            <Text className="mt-2 font-heading text-base text-accent">Save</Text>
          </PressableScale>
        }
      />

      <NoteEditorForm title={title} body={body} onTitleChange={setTitle} onBodyChange={setBody} />

      <AppButton
        label={saving ? 'Saving...' : 'Save Note'}
        onPress={handleSave}
        disabled={!canSave || saving}
        className="mt-6"
      />
    </AppScreen>
  );
}
