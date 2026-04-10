import { Pressable, PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { cn } from '@/lib/utils';

type PressableScaleProps = PressableProps & {
  className?: string;
  containerClassName?: string;
};

export function PressableScale({
  children,
  className,
  containerClassName,
  onPressIn,
  onPressOut,
  ...props
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle} className={containerClassName}>
      <Pressable
        {...props}
        className={cn('active:opacity-95', className)}
        onPressIn={(event) => {
          scale.value = withSpring(0.985, { damping: 16, stiffness: 240 });
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          scale.value = withSpring(1, { damping: 16, stiffness: 240 });
          onPressOut?.(event);
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
