import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ToolCard } from '@/components/ui/ToolCard';
import { toolsHubItems } from '@/data/tools';

export default function ToolsHubScreen() {
  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          title="Tools"
          subtitle="Extra utility calculators, designed as a clean hub that can keep expanding."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <SectionHeader eyebrow="Utilities" title="Choose a calculator" />
        {toolsHubItems.map((item) => (
          <ToolCard key={item.title} {...item} />
        ))}
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Why this hub" title="Built to expand" />
        <AppCard className="px-5 py-5">
          <Text className="font-heading text-base text-ink">One home for fast calculations</Text>
          <Text className="mt-2 font-light text-[15px] leading-6 text-muted">
            Each calculator uses the same card system, result treatment, and spacing scale so future tools drop in
            without feeling bolted on.
          </Text>
        </AppCard>
      </Animated.View>
    </AppScreen>
  );
}
