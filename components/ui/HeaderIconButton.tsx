import { Ionicons } from '@expo/vector-icons';

import { PressableScale } from '@/components/motion/PressableScale';

type HeaderIconButtonProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
};

export function HeaderIconButton({ icon, onPress }: HeaderIconButtonProps) {
  return (
    <PressableScale
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-2xl border border-line/70 bg-white"
    >
      <Ionicons name={icon} size={18} color="#183B6B" />
    </PressableScale>
  );
}
