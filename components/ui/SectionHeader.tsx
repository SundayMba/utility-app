import { Text, View } from 'react-native';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <View className="mb-4 mt-1">
      {eyebrow ? <Text className="font-light text-xs uppercase tracking-[1.8px] text-muted">{eyebrow}</Text> : null}
      <Text className="mt-1 font-heading text-lg text-ink">{title}</Text>
    </View>
  );
}
