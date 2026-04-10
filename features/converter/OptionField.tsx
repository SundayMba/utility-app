import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';

type OptionFieldProps = {
  label: string;
  onPress: () => void;
  value: string;
};

export function OptionField({ label, onPress, value }: OptionFieldProps) {
  return (
    <View className="flex-1">
      <Text className="mb-2 font-heading text-sm text-ink">{label}</Text>
      <PressableScale onPress={onPress} className="rounded-[20px] border border-line bg-white px-4 py-4">
        <View className="flex-row items-center justify-between gap-3">
          <Text className="flex-1 font-body text-base text-ink">{value}</Text>
          <Ionicons name="chevron-down" size={18} color="#6D7A90" />
        </View>
      </PressableScale>
    </View>
  );
}
