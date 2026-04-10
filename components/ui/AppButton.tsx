import { PressableProps, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { PressableScale } from '@/components/motion/PressableScale';
import { cn } from '@/lib/utils';

type AppButtonProps = PressableProps & {
  className?: string;
  disabled?: boolean;
  label: string;
  variant?: 'ghost' | 'primary' | 'secondary';
};

export function AppButton({
  className,
  disabled,
  label,
  variant = 'primary',
  ...props
}: AppButtonProps) {
  if (variant === 'primary') {
    return (
      <PressableScale
        {...props}
        disabled={disabled}
        className={cn('overflow-hidden rounded-[20px]', disabled && 'opacity-50', className)}
      >
        <LinearGradient colors={['#5A84FB', '#3B6BEF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text className="px-5 py-4 text-center font-heading text-base text-white">{label}</Text>
        </LinearGradient>
      </PressableScale>
    );
  }

  return (
    <PressableScale
      {...props}
      disabled={disabled}
      className={cn(
        'rounded-[20px] border px-5 py-4',
        variant === 'secondary' ? 'border-line bg-white' : 'border-transparent bg-transparent',
        disabled && 'opacity-50',
        className,
      )}
    >
      <Text
        className={cn(
          'text-center font-heading text-base',
          variant === 'secondary' ? 'text-ink' : 'text-accent',
        )}
      >
        {label}
      </Text>
    </PressableScale>
  );
}
