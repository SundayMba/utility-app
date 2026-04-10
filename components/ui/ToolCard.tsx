import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { PressableScale } from '@/components/motion/PressableScale';
import { AppCard } from '@/components/ui/AppCard';
import { cn } from '@/lib/utils';

type ToolCardProps = {
  description: string;
  href: Href;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  tintBackgroundClassName: string;
  tintColor: string;
  title: string;
};

export function ToolCard({
  description,
  href,
  icon,
  tintBackgroundClassName,
  tintColor,
  title,
}: ToolCardProps) {
  const router = useRouter();

  return (
    <PressableScale onPress={() => router.push(href)}>
      <AppCard className="mb-4 px-4 py-4">
        <View className="flex-row items-center gap-4">
          <View className={cn('h-12 w-12 items-center justify-center rounded-2xl', tintBackgroundClassName)}>
            <Ionicons name={icon} size={20} color={tintColor} />
          </View>

          <View className="flex-1">
            <Text className="font-heading text-base text-ink">{title}</Text>
            <Text className="mt-1 font-light text-sm leading-5 text-muted">{description}</Text>
          </View>

          <Ionicons name="chevron-forward" size={18} color="#6D7A90" />
        </View>
      </AppCard>
    </PressableScale>
  );
}
