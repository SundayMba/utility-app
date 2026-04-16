import { Text, TextInput, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';
import { AppInput } from '@/components/ui/AppInput';

type TaskEditorFormProps = {
  details: string;
  onDetailsChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  title: string;
};

export function TaskEditorForm({
  details,
  onDetailsChange,
  onTitleChange,
  title,
}: TaskEditorFormProps) {
  return (
    <View>
      <AppInput
        label="Task"
        placeholder="Add a task title"
        value={title}
        onChangeText={onTitleChange}
        autoCapitalize="sentences"
        autoCorrect
      />

      <View className="mt-5">
        <Text className="mb-2 font-heading text-sm text-ink">Details</Text>
        <AppCard className="px-4 py-4">
          <TextInput
            multiline
            value={details}
            onChangeText={onDetailsChange}
            placeholder="Add optional checklist notes..."
            placeholderTextColor="#8C98AD"
            textAlignVertical="top"
            className="min-h-[220px] font-body text-base leading-6 text-ink"
          />
        </AppCard>
      </View>
    </View>
  );
}
