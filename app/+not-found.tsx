import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppScreen } from '@/components/ui/AppScreen';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <AppScreen scroll={false}>
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-sm rounded-[28px] bg-surface px-6 py-8">
          <Text className="font-display text-2xl text-ink">Route not found</Text>
          <Text className="mt-3 font-light text-base leading-6 text-muted">
            The screen you opened does not exist in this build. Return to the dashboard and continue from there.
          </Text>

          <AppButton label="Back Home" className="mt-6" onPress={() => router.replace('/(tabs)/home')} />
        </View>
      </View>
    </AppScreen>
  );
}
