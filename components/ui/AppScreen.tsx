import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '@/lib/utils';

type AppScreenProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  scroll?: boolean;
};

export function AppScreen({
  children,
  className,
  contentClassName,
  scroll = true,
}: AppScreenProps) {
  const content = (
    <View className={cn(scroll ? 'px-5 pb-10 pt-2' : 'flex-1 px-5 pb-8 pt-2', contentClassName)}>
      {children}
    </View>
  );

  return (
    <SafeAreaView className={cn('flex-1 bg-canvas', className)}>
      <View className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-accent/10" />
      <View className="absolute -right-16 top-16 h-40 w-40 rounded-full bg-aqua/10" />

      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
