import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-b border-white/10 bg-[#17131F] px-5 pb-4"
      style={{ paddingTop: Math.max(insets.top, 14) + 8 }}
    >
      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-1 flex-row items-center gap-3">
          {showBack ? (
            <PressableScale
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-xl bg-white/8"
            >
              <Ionicons name="chevron-back" size={18} color="#FFFFFF" />
            </PressableScale>
          ) : null}

          <Text className="flex-1 font-display text-[24px] leading-8 text-white">{title}</Text>
        </View>

        {rightSlot ? <View className="flex-row items-center gap-2">{rightSlot}</View> : null}
      </View>

      {subtitle ? (
        <Text className={cn('mt-3 font-light text-[14px] leading-5 text-white/72', showBack && 'pl-[52px]')}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
