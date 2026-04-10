import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { cn } from '@/lib/utils';

type SettingsRowProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  title: string;
  value?: string;
};

export function SettingsRow({ icon, onPress, title, value }: SettingsRowProps) {
  return (
    <PressableScale onPress={onPress} className={cn('rounded-3xl bg-white px-4 py-4')}>
      <View className="flex-row items-center gap-4">
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-accent/10">
          <Ionicons name={icon} size={20} color="#4F7BF7" />
        </View>

        <Text className="flex-1 font-heading text-[15px] text-ink">{title}</Text>
        {value ? <Text className="font-light text-sm text-muted">{value}</Text> : null}
        <Ionicons name="chevron-forward" size={18} color="#6D7A90" />
      </View>
    </PressableScale>
  );
}
