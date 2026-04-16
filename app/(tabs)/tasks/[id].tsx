import { Ionicons } from '@expo/vector-icons';
import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppButton } from '@/components/ui/AppButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';
import { TaskEditorForm } from '@/features/tasks/TaskEditorForm';
import { deleteTask, formatTaskTimestamp, getTaskById, updateTask } from '@/lib/tasks';

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [completed, setCompleted] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadTask() {
      const task = await getTaskById(id);

      if (!active) {
        return;
      }

      if (!task) {
        setMissing(true);
        setLoading(false);
        return;
      }

      setTitle(task.title);
      setDetails(task.details);
      setCompleted(task.completed);
      setUpdatedAt(task.updatedAt);
      setCompletedAt(task.completedAt);
      setMissing(false);
      setLoading(false);
    }

    loadTask();

    return () => {
      active = false;
    };
  }, [id]);

  const canSave = title.trim().length > 0 || details.trim().length > 0;

  async function handleSave() {
    if (!canSave || saving) {
      return;
    }

    try {
      setSaving(true);
      await updateTask(id, { title, details, completed });
      const now = new Date().toISOString();
      setUpdatedAt(now);
      setCompletedAt(completed ? completedAt ?? now : null);
      router.replace('/tasks' as Href);
    } finally {
      setSaving(false);
    }
  }

  function handleDelete() {
    Alert.alert('Delete task?', 'This checklist item will be removed from local storage on this device.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTask(id);
          router.replace('/tasks' as Href);
        },
      },
    ]);
  }

  if (loading) {
    return (
      <AppScreen contentClassName="pb-32">
        <AppHeader showBack title="Task" subtitle="Loading task details..." />
      </AppScreen>
    );
  }

  if (missing) {
    return (
      <AppScreen contentClassName="pb-32">
        <AppHeader showBack title="Task" subtitle="This checklist item could not be found." />
        <EmptyState
          icon="warning"
          title="Task not found"
          description="The task may already have been deleted. Return to the checklist and continue from there."
          actionLabel="Back to Checklist"
          onActionPress={() => router.replace('/tasks' as Href)}
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="Task"
        subtitle="Update task details, edit the note, and keep changes saved offline."
        rightSlot={
          <PressableScale onPress={handleSave} className={saving || !canSave ? 'opacity-50' : ''}>
            <Text className="mt-2 font-heading text-base text-accent">Save</Text>
          </PressableScale>
        }
      />

      <View className="mb-5 rounded-[20px] bg-white px-4 py-4">
        <PressableScale
          onPress={() => setCompleted((current) => !current)}
          className={`flex-row items-center justify-between rounded-2xl px-1 py-1 ${
            completed ? 'bg-success/8' : ''
          }`}
        >
          <View className="flex-1">
            <Text className="font-heading text-base text-ink">
              {completed ? 'Marked as completed' : 'Still in progress'}
            </Text>
            <Text className="mt-1 font-light text-sm leading-5 text-muted">
              {completed && completedAt
                ? `Completed ${formatTaskTimestamp(completedAt)}`
                : updatedAt
                  ? `Last updated ${formatTaskTimestamp(updatedAt)}`
                  : 'Toggle this item when you finish it.'}
            </Text>
          </View>

          <View
            className={`h-11 w-11 items-center justify-center rounded-2xl ${
              completed ? 'bg-success/15' : 'bg-accent/12'
            }`}
          >
            <Ionicons
              name={completed ? 'checkmark-done' : 'ellipse-outline'}
              size={20}
              color={completed ? '#1F8B71' : '#4F7BF7'}
            />
          </View>
        </PressableScale>
      </View>

      <TaskEditorForm
        title={title}
        details={details}
        onTitleChange={setTitle}
        onDetailsChange={setDetails}
      />

      <AppButton
        label={saving ? 'Saving...' : 'Save Changes'}
        onPress={handleSave}
        disabled={!canSave || saving}
        className="mt-6"
      />
      <AppButton
        label={completed ? 'Mark as Open' : 'Mark as Completed'}
        onPress={() => setCompleted((current) => !current)}
        variant="secondary"
        className="mt-3"
      />
      <AppButton label="Delete Task" onPress={handleDelete} variant="ghost" className="mt-1" />
    </AppScreen>
  );
}
