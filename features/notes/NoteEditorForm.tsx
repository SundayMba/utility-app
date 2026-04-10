import { Text, TextInput, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppInput } from '@/components/ui/AppInput';

type NoteEditorFormProps = {
  body: string;
  onBodyChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  title: string;
};

export function NoteEditorForm({
  body,
  onBodyChange,
  onTitleChange,
  title,
}: NoteEditorFormProps) {
  return (
    <View>
      <AppInput
        label="Title"
        placeholder="Add a short title"
        value={title}
        onChangeText={onTitleChange}
        autoCapitalize="sentences"
        autoCorrect
      />

      <View className="mt-5">
        <Text className="mb-2 font-heading text-sm text-ink">Body</Text>
        <AppCard className="px-4 py-4">
          <TextInput
            multiline
            value={body}
            onChangeText={onBodyChange}
            placeholder="Write something..."
            placeholderTextColor="#8C98AD"
            textAlignVertical="top"
            className="min-h-[280px] font-body text-base leading-6 text-ink"
          />
        </AppCard>
      </View>
    </View>
  );
}
