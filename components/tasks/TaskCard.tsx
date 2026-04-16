import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppCard } from '@/components/ui/AppCard';
import {
  formatTaskDateLabel,
  formatTaskTimeLabel,
  formatTaskTimestamp,
} from '@/lib/tasks';
import { Task } from '@/types/task';

type TaskCardProps = {
  onToggleComplete: (task: Task) => void;
  task: Task;
};

export function TaskCard({ onToggleComplete, task }: TaskCardProps) {
  const router = useRouter();
  const activityTimestamp = task.completed && task.completedAt ? task.completedAt : task.updatedAt;
  const activityLabel = task.completed ? 'Completed' : 'Updated';

  return (
    <AppCard className="mb-4 px-4 py-4">
      <View className="flex-row items-start gap-4">
        <PressableScale
          onPress={() => onToggleComplete(task)}
          className={`mt-1 h-11 w-11 items-center justify-center rounded-2xl ${
            task.completed ? 'bg-success/15' : 'bg-accent/12'
          }`}
        >
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={task.completed ? '#1F8B71' : '#4F7BF7'}
          />
        </PressableScale>

        <PressableScale
          onPress={() => router.push(`/tasks/${task.id}` as Href)}
          className="flex-1"
        >
          <View className="flex-1">
            <View className="mb-3 flex-row flex-wrap items-center gap-2">
              <View
                className={`rounded-full px-3 py-1 ${
                  task.completed ? 'bg-success/12' : 'bg-accent/10'
                }`}
              >
                <Text
                  className={`font-heading text-[11px] uppercase tracking-[0.6px] ${
                    task.completed ? 'text-success' : 'text-accent'
                  }`}
                >
                  {task.completed ? 'Completed' : 'In Progress'}
                </Text>
              </View>
              <View className="rounded-full bg-ink/5 px-3 py-1">
                <Text className="font-heading text-[11px] uppercase tracking-[0.6px] text-muted">
                  {formatTaskDateLabel(activityTimestamp)}
                </Text>
              </View>
              <View className="rounded-full bg-ink/5 px-3 py-1">
                <Text className="font-heading text-[11px] uppercase tracking-[0.6px] text-muted">
                  {formatTaskTimeLabel(activityTimestamp)}
                </Text>
              </View>
            </View>

            <Text
              className={`font-heading text-base ${task.completed ? 'text-muted line-through' : 'text-ink'}`}
            >
              {task.title}
            </Text>
            <Text className="mt-1 font-light text-sm leading-5 text-muted" numberOfLines={2}>
              {task.details || 'No extra details yet. Tap to edit this checklist item.'}
            </Text>

            <View className="mt-4 flex-row items-center justify-between">
              <Text className="font-light text-xs text-muted">
                {activityLabel} {formatTaskTimestamp(activityTimestamp)}
              </Text>

              <View className="flex-row items-center rounded-full bg-ink px-3 py-2">
                <Text className="mr-2 font-heading text-xs uppercase tracking-[0.5px] text-white">
                  Open Task
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </PressableScale>
      </View>
    </AppCard>
  );
}
