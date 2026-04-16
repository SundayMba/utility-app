import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from '@/types/task';

const TASKS_STORAGE_KEY = '@smart-utility-toolkit/tasks';

function sortTasks(tasks: Task[]) {
  return [...tasks].sort((left, right) => {
    if (left.completed !== right.completed) {
      return Number(left.completed) - Number(right.completed);
    }

    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
  });
}

export async function getTasks() {
  const raw = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw) as Task[];
  return sortTasks(parsed);
}

export async function getTaskById(id: string) {
  const tasks = await getTasks();
  return tasks.find((task) => task.id === id) ?? null;
}

export async function createTask(input: Pick<Task, 'details' | 'title'>) {
  const tasks = await getTasks();
  const now = new Date().toISOString();

  const nextTask: Task = {
    id: Date.now().toString(),
    title: input.title.trim() || 'Untitled task',
    details: input.details.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };

  const nextTasks = sortTasks([nextTask, ...tasks]);
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(nextTasks));

  return nextTask;
}

export async function updateTask(
  id: string,
  updates: Pick<Task, 'details' | 'title'> & Pick<Task, 'completed'>,
) {
  const now = new Date().toISOString();
  const tasks = await getTasks();
  const nextTasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          title: updates.title.trim() || 'Untitled task',
          details: updates.details.trim(),
          completed: updates.completed,
          completedAt: updates.completed ? task.completedAt ?? now : null,
          updatedAt: now,
        }
      : task,
  );

  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(sortTasks(nextTasks)));
}

export async function toggleTaskCompletion(id: string) {
  const now = new Date().toISOString();
  const tasks = await getTasks();
  const nextTasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          completed: !task.completed,
          completedAt: task.completed ? null : now,
          updatedAt: now,
        }
      : task,
  );

  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(sortTasks(nextTasks)));
}

export async function deleteTask(id: string) {
  const tasks = await getTasks();
  const nextTasks = tasks.filter((task) => task.id !== id);
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(nextTasks));
}

export function formatTaskTimestamp(value: string) {
  const date = new Date(value);
  const now = new Date();
  const isSameDay =
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate();

  if (isSameDay) {
    return `Today, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  }

  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatTaskDateLabel(value: string) {
  return new Date(value).toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTaskTimeLabel(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}
