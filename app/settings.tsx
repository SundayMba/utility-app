import { Text, View } from 'react-native';

import { SettingsRow } from '@/components/settings/SettingsRow';
import { AppCard } from '@/components/ui/AppCard';
import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function SettingsScreen() {
  return (
    <AppScreen>
      <AppHeader
        showBack
        title="Settings"
        subtitle="A light placeholder for app info and preferences until the final settings pass."
      />

      <SectionHeader eyebrow="Preferences" title="General" />
      <View className="gap-3">
        <SettingsRow icon="color-palette-outline" title="Theme preference" value="System" />
        <SettingsRow icon="information-circle-outline" title="About app" value="Preview" />
      </View>

      <SectionHeader eyebrow="Support" title="Links" />
      <AppCard className="gap-3 px-4 py-4">
        <SettingsRow icon="help-circle-outline" title="Help and support" />
        <SettingsRow icon="star-outline" title="Rate app" />
        <SettingsRow icon="document-text-outline" title="Terms and privacy" />
      </AppCard>

      <Text className="mt-6 text-center font-light text-sm text-muted">Version 1.0.0</Text>
    </AppScreen>
  );
}
