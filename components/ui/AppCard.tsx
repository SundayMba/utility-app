import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

import { surfaceShadow } from '@/lib/theme';
import { cn } from '@/lib/utils';

type AppCardProps = ViewProps & {
  children: ReactNode;
  className?: string;
};

export function AppCard({ children, className, style, ...props }: AppCardProps) {
  return (
    <View
      {...props}
      className={cn('rounded-[28px] border border-white/60 bg-surface', className)}
      style={[surfaceShadow, style]}
    >
      {children}
    </View>
  );
}
