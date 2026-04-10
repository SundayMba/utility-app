import Constants from 'expo-constants';
import { Alert, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { SettingsRow } from '@/components/settings/SettingsRow';
import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function SettingsScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';

  function showPlaceholder(title: string) {
    Alert.alert(title, 'This is a lightweight placeholder action for the current build.');
  }

  return (
    <AppScreen>
      <Animated.View entering={FadeInDown.duration(420)}>
        <AppHeader
          showBack
          title="Settings"
          subtitle="A simple control center for app context, preferences, and submission-ready placeholders."
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(90)}>
        <AppCard className="px-5 py-5">
          <Text className="font-display text-[24px] text-ink">Smart Utility Toolkit</Text>
          <Text className="mt-2 font-light text-[15px] leading-6 text-muted">
            A polished mobile toolkit for conversion, notes, and quick everyday calculations.
          </Text>

          <View className="mt-5 flex-row flex-wrap gap-3">
            <View className="rounded-full bg-accent/12 px-4 py-2">
              <Text className="font-heading text-sm text-accent">Version {version}</Text>
            </View>
            <View className="rounded-full bg-aqua/12 px-4 py-2">
              <Text className="font-heading text-sm text-aqua">Local-only data</Text>
            </View>
          </View>
        </AppCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(180)}>
        <SectionHeader eyebrow="Preferences" title="General" />
        <View className="gap-3">
          <SettingsRow
            icon="color-palette-outline"
            title="Theme preference"
            value="System"
            onPress={() => showPlaceholder('Theme preference')}
          />
          <SettingsRow
            icon="phone-portrait-outline"
            title="Touch feedback"
            value="Subtle"
            onPress={() => showPlaceholder('Touch feedback')}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(420).delay(270)}>
        <SectionHeader eyebrow="About" title="Support and policy" />
        <View className="gap-3">
          <SettingsRow
            icon="information-circle-outline"
            title="About app"
            value="Overview"
            onPress={() => showPlaceholder('About app')}
          />
          <SettingsRow
            icon="help-circle-outline"
            title="Help and support"
            onPress={() => showPlaceholder('Help and support')}
          />
          <SettingsRow icon="star-outline" title="Rate app" onPress={() => showPlaceholder('Rate app')} />
          <SettingsRow
            icon="document-text-outline"
            title="Terms and privacy"
            onPress={() => showPlaceholder('Terms and privacy')}
          />
        </View>
      </Animated.View>

      <Text className="mt-6 text-center font-light text-sm text-muted">Build {version}</Text>
    </AppScreen>
  );
}
