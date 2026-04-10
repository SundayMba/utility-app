import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ToolCard } from '@/components/ui/ToolCard';
import { converterCategories } from '@/data/converter';

export default function ConverterHubScreen() {
  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          title="Unit Converter"
          subtitle="Pick a category and keep the result visible, clear, and fast."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <SectionHeader eyebrow="Categories" title="Choose a converter" />
        {converterCategories.map((item) => (
          <ToolCard key={item.title} {...item} />
        ))}
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Today’s tip" title="Keep it simple" />
        <AppCard className="overflow-hidden">
          <View className="bg-ink px-5 py-5">
            <Text className="font-heading text-base text-white">A good converter needs almost no explanation.</Text>
            <Text className="mt-2 font-light text-[15px] leading-6 text-white/80">
              Instant updates, a clear swap action, and readable unit labels matter more than extra chrome.
            </Text>
          </View>
        </AppCard>
      </Animated.View>
    </AppScreen>
  );
}
