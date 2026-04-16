import { Href, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { HeaderIconButton } from '@/components/ui/HeaderIconButton';
import { AppScreen } from '@/components/ui/AppScreen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ToolCard } from '@/components/ui/ToolCard';
import { homeOverview, homeQuickAccess } from '@/data/home';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <AppScreen contentClassName="pb-32">
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          title="Home"
          subtitle="Smart Utility Toolkit. Your everyday tools in one clean mobile workspace."
          rightSlot={
            <>
              <HeaderIconButton icon="checkbox-outline" onPress={() => router.push('/tasks' as Href)} />
              <HeaderIconButton icon="document-text-outline" onPress={() => router.push('/(tabs)/notes')} />
              <HeaderIconButton icon="settings-outline" onPress={() => router.push('/settings')} />
            </>
          }
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(80)}>
        <SectionHeader eyebrow="Quick access" title="Main modules" />
        {homeQuickAccess.map((item) => (
          <ToolCard key={item.title} {...item} />
        ))}
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(160)}>
        <SectionHeader eyebrow="Overview" title="Toolkit at a glance" />
        <View className="flex-row flex-wrap justify-between gap-y-4">
          {homeOverview.map((item) => (
            <AppCard key={item.title} className="w-[48.5%] px-4 py-5">
              <Text className="font-display text-2xl text-ink">{item.title}</Text>
              <Text className="mt-2 font-light text-sm leading-5 text-muted">{item.label}</Text>
            </AppCard>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(240)}>
        <SectionHeader eyebrow="Today’s tip" title="Keep it light" />
        <AppCard className="overflow-hidden">
          <View className="bg-ink px-5 py-5">
            <Text className="font-heading text-white">Fast beats crowded.</Text>
            <Text className="mt-2 font-light text-[15px] leading-6 text-white/80">
              Keep every utility reachable in two taps or less and let the result surface immediately.
            </Text>
          </View>
        </AppCard>
      </Animated.View>
    </AppScreen>
  );
}
