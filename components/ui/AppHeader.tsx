import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { PressableScale } from '@/components/motion/PressableScale';
import { cn } from '@/lib/utils';

type AppHeaderProps = {
  rightSlot?: ReactNode;
  showBack?: boolean;
  subtitle?: string;
  title: string;
};

export function AppHeader({ rightSlot, showBack, subtitle, title }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View className="mb-6 border-b border-line/70 pb-4">
      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-1 flex-row items-center gap-3">
          {showBack ? (
            <PressableScale
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-2xl border border-line/70 bg-white"
            >
              <Ionicons name="chevron-back" size={18} color="#183B6B" />
            </PressableScale>
          ) : null}

          <Text className="flex-1 font-display text-[24px] leading-8 text-ink">{title}</Text>
        </View>

        {rightSlot ? <View className="flex-row items-center gap-2">{rightSlot}</View> : null}
      </View>

      {subtitle ? (
        <Text className={cn('mt-3 font-light text-[14px] leading-5 text-muted', showBack && 'pl-[52px]')}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
