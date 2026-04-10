import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { NoteCard } from '@/components/notes/NoteCard';
import { PressableScale } from '@/components/motion/PressableScale';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchInput } from '@/components/ui/SearchInput';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getNotes } from '@/lib/notes';
import { Note } from '@/types/note';

export default function NotesListScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      let active = true;

      getNotes().then((items) => {
        if (active) {
          setNotes(items);
        }
      });

      return () => {
        active = false;
      };
    }, []),
  );

  const filteredNotes = notes.filter((note) => {
    const searchValue = query.trim().toLowerCase();

    if (!searchValue) {
      return true;
    }

    return (
      note.title.toLowerCase().includes(searchValue) ||
      note.body.toLowerCase().includes(searchValue)
    );
  });

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          title="Notes"
          subtitle="Capture lightweight notes and keep the latest edits easy to find."
          rightSlot={
            <PressableScale
              onPress={() => router.push('/(tabs)/notes/new')}
              className="mt-1 h-11 w-11 items-center justify-center rounded-2xl bg-accent"
            >
              <Ionicons name="add" size={22} color="#FFFFFF" />
            </PressableScale>
          }
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search notes..."
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        {filteredNotes.length === 0 ? (
          <View className="pt-10">
            <EmptyState
              icon="document-text"
              title={notes.length === 0 ? 'No notes yet' : 'No matches found'}
              description={
                notes.length === 0
                  ? 'Start with a quick idea, reminder, or list. Your notes will stay on this device.'
                  : 'Try a different keyword or clear the search field to see all saved notes.'
              }
              actionLabel={notes.length === 0 ? 'Create Note' : 'Clear Search'}
              onActionPress={
                notes.length === 0 ? () => router.push('/(tabs)/notes/new') : () => setQuery('')
              }
            />
          </View>
        ) : (
          <>
            <SectionHeader eyebrow="Saved notes" title={`${filteredNotes.length} notes`} />
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </>
        )}
      </Animated.View>
    </AppScreen>
  );
}
