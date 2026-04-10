import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';

type EmptyStateProps = {
  actionLabel?: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onActionPress?: () => void;
  title: string;
};

export function EmptyState({
  actionLabel,
  description,
  icon,
  onActionPress,
  title,
}: EmptyStateProps) {
  return (
    <AppCard className="items-center px-6 py-8">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        <Ionicons name={icon} size={28} color="#4F7BF7" />
      </View>

      <Text className="mt-5 text-center font-heading text-xl text-ink">{title}</Text>
      <Text className="mt-2 text-center font-light text-[15px] leading-6 text-muted">{description}</Text>

      {actionLabel && onActionPress ? (
        <AppButton label={actionLabel} onPress={onActionPress} className="mt-6 w-full" />
      ) : null}
    </AppCard>
  );
}
