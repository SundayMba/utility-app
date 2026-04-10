import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { PressableScale } from '@/components/motion/PressableScale';

type AppHeaderProps = {
  rightSlot?: ReactNode;
  showBack?: boolean;
  subtitle?: string;
  title: string;
};

export function AppHeader({ rightSlot, showBack, subtitle, title }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View className="mb-6 flex-row items-start justify-between gap-4">
      <View className="flex-1 flex-row items-start gap-3">
        {showBack ? (
          <PressableScale
            onPress={() => router.back()}
            className="mt-1 h-11 w-11 items-center justify-center rounded-2xl bg-white"
          >
            <Ionicons name="chevron-back" size={20} color="#183B6B" />
          </PressableScale>
        ) : null}

        <View className="flex-1">
          <Text className="font-display text-[28px] leading-9 text-ink">{title}</Text>
          {subtitle ? (
            <Text className="mt-2 font-light text-[15px] leading-6 text-muted">{subtitle}</Text>
          ) : null}
        </View>
      </View>

      {rightSlot}
    </View>
  );
}
