import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function TemperatureConverterPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader
        showBack
        title="Temperature Converter"
        subtitle="The route is ready for the temperature logic and explanation card."
      />
      <EmptyState
        icon="thermometer"
        title="Temperature conversion is reserved"
        description="Celsius, Fahrenheit, and Kelvin inputs will be added as a dedicated commit."
      />
    </AppScreen>
  );
}
