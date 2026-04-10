import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppCard } from '@/components/ui/AppCard';
import { formatNoteTimestamp } from '@/lib/notes';
import { Note } from '@/types/note';

type NoteCardProps = {
  note: Note;
};

export function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();

  return (
    <PressableScale
      onPress={() =>
        router.push({
          pathname: '/(tabs)/notes/[id]',
          params: { id: note.id },
        })
      }
    >
      <AppCard className="mb-4 px-4 py-4">
        <View className="flex-row items-start gap-4">
          <View className="mt-1 h-11 w-11 items-center justify-center rounded-2xl bg-accent/12">
            <Ionicons name="document-text" size={20} color="#4F7BF7" />
          </View>

          <View className="flex-1">
            <Text className="font-heading text-base text-ink">{note.title}</Text>
            <Text className="mt-1 font-light text-sm leading-5 text-muted" numberOfLines={2}>
              {note.body || 'No additional note content yet.'}
            </Text>
            <Text className="mt-3 font-light text-xs text-muted">{formatNoteTimestamp(note.updatedAt)}</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#7C8AA5" />
        </View>
      </AppCard>
    </PressableScale>
  );
}
