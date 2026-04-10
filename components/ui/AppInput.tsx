import { Text, TextInput, TextInputProps, View } from 'react-native';

import { cn } from '@/lib/utils';

type AppInputProps = TextInputProps & {
  className?: string;
  inputClassName?: string;
  label?: string;
  suffix?: string;
};

export function AppInput({
  className,
  inputClassName,
  label,
  suffix,
  ...props
}: AppInputProps) {
  return (
    <View className={className}>
      {label ? <Text className="mb-2 font-heading text-sm text-ink">{label}</Text> : null}
      <View className="flex-row items-center rounded-[20px] border border-line bg-white px-4">
        <TextInput
          {...props}
          className={cn('flex-1 py-4 font-body text-base text-ink', inputClassName)}
          placeholderTextColor="#8C98AD"
        />
        {suffix ? <Text className="font-heading text-sm text-muted">{suffix}</Text> : null}
      </View>
    </View>
  );
}
