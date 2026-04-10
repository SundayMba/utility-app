import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';

export default function LaunchScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 1400);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 bg-canvas">
      <LinearGradient
        colors={['#E6EEFF', '#F4F7FB', '#F9FBFF']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute inset-0"
      />

      <View className="flex-1 items-center justify-center px-8">
        <Animated.View
          entering={ZoomIn.duration(450)}
          className="mb-6 h-24 w-24 items-center justify-center rounded-[32px] bg-ink"
        >
          <Text className="font-display text-3xl text-white">SU</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(120)} className="items-center">
          <Text className="font-display text-3xl text-ink">Smart Utility Toolkit</Text>
          <Text className="mt-3 text-center font-light text-base leading-6 text-muted">
            Conversion, notes, and calculators in one calm mobile workspace.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeIn.duration(550).delay(280)} className="mt-12 flex-row gap-2">
          <View className="h-2.5 w-8 rounded-full bg-ink" />
          <View className="h-2.5 w-2.5 rounded-full bg-accent/40" />
          <View className="h-2.5 w-2.5 rounded-full bg-accent/20" />
        </Animated.View>
      </View>
    </View>
  );
}
