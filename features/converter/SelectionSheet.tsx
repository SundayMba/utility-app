import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

import { PressableScale } from '@/components/motion/PressableScale';

type SelectionItem = {
  description?: string;
  label: string;
  value: string;
};

type SelectionSheetProps = {
  onClose: () => void;
  onSelect: (value: string) => void;
  options: SelectionItem[];
  selectedValue: string;
  title: string;
  visible: boolean;
};

export function SelectionSheet({
  onClose,
  onSelect,
  options,
  selectedValue,
  title,
  visible,
}: SelectionSheetProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <Animated.View entering={FadeIn.duration(180)} className="flex-1 justify-end bg-ink/35">
        <PressableScale onPress={onClose} className="flex-1" />

        <Animated.View entering={SlideInDown.duration(260)} className="rounded-t-[32px] bg-canvas px-5 pb-10 pt-5">
          <View className="mb-5 h-1.5 w-12 self-center rounded-full bg-line" />
          <Text className="font-display text-[24px] text-ink">{title}</Text>
          <Text className="mt-2 font-light text-sm leading-5 text-muted">
            Tap an option to update the active selection.
          </Text>

          <ScrollView showsVerticalScrollIndicator={false} className="mt-6 max-h-[420px]">
            <View className="gap-3 pb-6">
              {options.map((option) => {
                const selected = option.value === selectedValue;

                return (
                  <PressableScale
                    key={option.value}
                    onPress={() => {
                      onSelect(option.value);
                      onClose();
                    }}
                    className="rounded-[22px] bg-white px-4 py-4"
                  >
                    <View className="flex-row items-center gap-4">
                      <View
                        className={`h-10 w-10 items-center justify-center rounded-2xl ${
                          selected ? 'bg-accent/15' : 'bg-canvas'
                        }`}
                      >
                        <Ionicons
                          name={selected ? 'radio-button-on' : 'ellipse-outline'}
                          size={18}
                          color={selected ? '#4F7BF7' : '#A0ACC1'}
                        />
                      </View>

                      <View className="flex-1">
                        <Text className="font-heading text-[15px] text-ink">{option.label}</Text>
                        {option.description ? (
                          <Text className="mt-1 font-light text-sm leading-5 text-muted">{option.description}</Text>
                        ) : null}
                      </View>

                      <Text className="font-heading text-sm text-muted">{option.value}</Text>
                    </View>
                  </PressableScale>
                );
              })}
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
