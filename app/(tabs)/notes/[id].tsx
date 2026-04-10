import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppButton } from '@/components/ui/AppButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';
import { NoteEditorForm } from '@/features/notes/NoteEditorForm';
import { deleteNote, formatNoteTimestamp, getNoteById, updateNote } from '@/lib/notes';

export default function NoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadNote() {
      const note = await getNoteById(id);

      if (!active) {
        return;
      }

      if (!note) {
        setMissing(true);
        setLoading(false);
        return;
      }

      setTitle(note.title);
      setBody(note.body);
      setUpdatedAt(note.updatedAt);
      setMissing(false);
      setLoading(false);
    }

    loadNote();

    return () => {
      active = false;
    };
  }, [id]);

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  async function handleSave() {
    if (!canSave || saving) {
      return;
    }

    try {
      setSaving(true);
      await updateNote(id, { title, body });
      const nextTimestamp = new Date().toISOString();
      setUpdatedAt(nextTimestamp);
      router.replace('/(tabs)/notes');
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    Alert.alert('Delete note?', 'This note will be removed from local storage on this device.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(id);
          router.replace('/(tabs)/notes');
        },
      },
    ]);
  }

  if (loading) {
    return (
      <AppScreen contentClassName="pb-32">
        <AppHeader showBack title="Note" subtitle="Loading note content..." />
      </AppScreen>
    );
  }

  if (missing) {
    return (
      <AppScreen contentClassName="pb-32">
        <AppHeader showBack title="Note" subtitle="This note could not be found." />
        <EmptyState
          icon="warning"
          title="Note not found"
          description="The note may have been deleted already. Return to the notes list and continue from there."
          actionLabel="Back to Notes"
          onActionPress={() => router.replace('/(tabs)/notes')}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="Note"
        subtitle="Review details, refine the content, and keep changes saved locally."
        rightSlot={
          <PressableScale onPress={handleSave} className={saving || !canSave ? 'opacity-50' : ''}>
            <Text className="mt-2 font-heading text-base text-accent">Save</Text>
          </PressableScale>
        }
      />

      {updatedAt ? (
        <View className="mb-5 rounded-[20px] bg-white px-4 py-3">
          <Text className="font-light text-sm text-muted">Last updated {formatNoteTimestamp(updatedAt)}</Text>
        </View>
      ) : null}

      <NoteEditorForm title={title} body={body} onTitleChange={setTitle} onBodyChange={setBody} />

      <AppButton
        label={saving ? 'Saving...' : 'Save Changes'}
        onPress={handleSave}
        disabled={!canSave || saving}
        className="mt-6"
      />
      <AppButton label="Delete Note" onPress={handleDelete} variant="secondary" className="mt-3" />
    </AppScreen>
  );
}
