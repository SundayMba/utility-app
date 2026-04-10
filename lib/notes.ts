import AsyncStorage from '@react-native-async-storage/async-storage';

import { Note } from '@/types/note';

const NOTES_STORAGE_KEY = '@smart-utility-toolkit/notes';

function sortNotes(notes: Note[]) {
  return [...notes].sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
}

export async function getNotes() {
  const raw = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw) as Note[];
  return sortNotes(parsed);
}

export async function getNoteById(id: string) {
  const notes = await getNotes();
  return notes.find((note) => note.id === id) ?? null;
}

export async function createNote(input: Pick<Note, 'body' | 'title'>) {
  const notes = await getNotes();
  const now = new Date().toISOString();

  const nextNote: Note = {
    id: Date.now().toString(),
    title: input.title.trim() || 'Untitled note',
    body: input.body.trim(),
    createdAt: now,
    updatedAt: now,
  };

  const nextNotes = sortNotes([nextNote, ...notes]);
  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(nextNotes));

  return nextNote;
}

export async function updateNote(id: string, updates: Pick<Note, 'body' | 'title'>) {
  const notes = await getNotes();
  const nextNotes = notes.map((note) =>
    note.id === id
      ? {
          ...note,
          title: updates.title.trim() || 'Untitled note',
          body: updates.body.trim(),
          updatedAt: new Date().toISOString(),
        }
      : note,
  );

  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(sortNotes(nextNotes)));
}

export async function deleteNote(id: string) {
  const notes = await getNotes();
  const nextNotes = notes.filter((note) => note.id !== id);
  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(nextNotes));
}

export function formatNoteTimestamp(value: string) {
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
