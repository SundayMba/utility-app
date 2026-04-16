import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppButton } from '@/components/ui/AppButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { TaskEditorForm } from '@/features/tasks/TaskEditorForm';
import { createTask } from '@/lib/tasks';

export default function NewTaskScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [saving, setSaving] = useState(false);

  const canSave = title.trim().length > 0 || details.trim().length > 0;

  async function handleSave() {
    if (!canSave || saving) {
      return;
    }

    try {
      setSaving(true);
      await createTask({ title, details });
      router.replace('/tasks' as Href);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="New Task"
        subtitle="Add a checklist item with an optional note, then save it locally."
        rightSlot={
          <PressableScale onPress={handleSave} className={saving || !canSave ? 'opacity-50' : ''}>
            <Text className="mt-2 font-heading text-base text-accent">Save</Text>
          </PressableScale>
        }
      />

      <TaskEditorForm
        title={title}
        details={details}
        onTitleChange={setTitle}
        onDetailsChange={setDetails}
      />

      <AppButton
        label={saving ? 'Saving...' : 'Save Task'}
        onPress={handleSave}
        disabled={!canSave || saving}
        className="mt-6"
      />
    </AppScreen>
  );
}
