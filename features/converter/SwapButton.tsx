import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { PressableScale } from '@/components/motion/PressableScale';

type SwapButtonProps = {
  onPress: () => void;
};

export function SwapButton({ onPress }: SwapButtonProps) {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="justify-end pb-1">
      <PressableScale
        onPress={() => {
          rotation.value = withTiming(rotation.value + 180, { duration: 240 });
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
            // Ignore devices without haptic support.
          });
          onPress();
        }}
        className="h-12 w-12 items-center justify-center rounded-2xl bg-accent"
      >
        <Animated.View style={animatedStyle}>
          <Ionicons name="swap-horizontal" size={20} color="#FFFFFF" />
        </Animated.View>
      </PressableScale>
    </View>
  );
}
