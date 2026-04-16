import { Ionicons } from '@expo/vector-icons';
import { Href, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { TaskCard } from '@/components/tasks/TaskCard';
import { PressableScale } from '@/components/motion/PressableScale';
import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchInput } from '@/components/ui/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  formatTaskDateLabel,
  formatTaskTimeLabel,
  getTasks,
  toggleTaskCompletion,
} from '@/lib/tasks';
import { Task } from '@/types/task';

export default function TasksListScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState('');
  const [now, setNow] = useState(() => new Date().toISOString());

  const loadTasks = useCallback(async () => {
    const items = await getTasks();
    setTasks(items);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      getTasks().then((items) => {
        if (active) {
          setTasks(items);
        }
      });

      return () => {
        active = false;
      };
    }, []),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().toISOString());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const searchValue = query.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    if (!searchValue) {
      return true;
    }

    return (
      task.title.toLowerCase().includes(searchValue) ||
      task.details.toLowerCase().includes(searchValue)
    );
  });
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  async function handleToggleComplete(task: Task) {
    await toggleTaskCompletion(task.id);
    await loadTasks();
  }

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          title="Checklist"
          subtitle="Create lightweight tasks, tick them off, and keep progress saved on this device."
          rightSlot={
            <PressableScale
              onPress={() => router.push('/tasks/new' as Href)}
              className="mt-1 h-11 w-11 items-center justify-center rounded-2xl bg-accent"
            >
              <Ionicons name="add" size={22} color="#FFFFFF" />
            </PressableScale>
          }
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="mb-5 overflow-hidden px-0 py-0">
          <View className="bg-ink px-5 py-5">
            <Text className="font-light text-xs uppercase tracking-[1px] text-white/70">
              Today
            </Text>
            <Text className="mt-2 font-display text-3xl text-white">{formatTaskDateLabel(now)}</Text>
            <Text className="mt-1 font-light text-sm text-white/75">
              {formatTaskTimeLabel(now)} · Keep your checklist visible and current
            </Text>
          </View>

          <View className="flex-row gap-3 px-4 py-4">
            <View className="flex-1 rounded-[18px] bg-accent/10 px-4 py-4">
              <Text className="font-display text-2xl text-ink">{pendingCount}</Text>
              <Text className="mt-1 font-light text-sm text-muted">Pending tasks</Text>
            </View>
            <View className="flex-1 rounded-[18px] bg-success/10 px-4 py-4">
              <Text className="font-display text-2xl text-success">{completedCount}</Text>
              <Text className="mt-1 font-light text-sm text-muted">Completed</Text>
            </View>
          </View>
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(120)}>
        <View className="mb-5 flex-row gap-3">
          <View className="rounded-full bg-white px-4 py-2">
            <Text className="font-heading text-xs uppercase tracking-[0.7px] text-ink">
              {filteredTasks.length} Visible
            </Text>
          </View>
          <View className="rounded-full bg-white px-4 py-2">
            <Text className="font-heading text-xs uppercase tracking-[0.7px] text-muted">
              Tap "Open Task" To Edit
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(150)}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search tasks..."
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(230)}>
        {filteredTasks.length === 0 ? (
          <View className="pt-10">
            <EmptyState
              icon="checkbox"
              title={tasks.length === 0 ? 'No tasks yet' : 'No matches found'}
              description={
                tasks.length === 0
                  ? 'Create your first checklist item. Tasks will remain available offline on this device.'
                  : 'Try a different keyword or clear the search field to view every saved task.'
              }
              actionLabel={tasks.length === 0 ? 'Create Task' : 'Clear Search'}
              onActionPress={
                tasks.length === 0 ? () => router.push('/tasks/new' as Href) : () => setQuery('')
              }
            />
          </View>
        ) : (
          <>
            <SectionHeader eyebrow="Task board" title={`${filteredTasks.length} saved items`} />
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggleComplete={handleToggleComplete} />
            ))}
          </>
        )}
      </Animated.View>
    </AppScreen>
  );
}
