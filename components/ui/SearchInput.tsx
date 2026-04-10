import { Ionicons } from '@expo/vector-icons';
import { TextInput, TextInputProps, View } from 'react-native';

export function SearchInput(props: TextInputProps) {
  return (
    <View className="flex-row items-center rounded-[20px] border border-line bg-white px-4">
      <Ionicons name="search" size={18} color="#7C8AA5" />
      <TextInput
        {...props}
        className="flex-1 px-3 py-4 font-body text-base text-ink"
        placeholderTextColor="#8C98AD"
      />
    </View>
  );
}
