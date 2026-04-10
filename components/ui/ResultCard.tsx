import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { AppCard } from '@/components/ui/AppCard';

type ResultCardProps = {
  caption?: string;
  children?: ReactNode;
  eyebrow?: string;
  title: string;
  value: string;
};

export function ResultCard({ caption, children, eyebrow, title, value }: ResultCardProps) {
  return (
    <AppCard className="px-5 py-5">
      {eyebrow ? <Text className="font-light text-xs uppercase tracking-[1.8px] text-muted">{eyebrow}</Text> : null}
      <Text className="mt-2 font-heading text-base text-ink">{title}</Text>
      <Text className="mt-4 font-display text-[30px] leading-9 text-success">{value}</Text>
      {caption ? <Text className="mt-2 font-light text-[15px] leading-6 text-muted">{caption}</Text> : null}
      {children ? <View className="mt-4">{children}</View> : null}
    </AppCard>
  );
}
