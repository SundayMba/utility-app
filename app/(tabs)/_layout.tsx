import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { surfaceShadow } from '@/lib/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#F4F7FB' },
        tabBarActiveTintColor: '#4F7BF7',
        tabBarInactiveTintColor: '#7C8AA5',
        tabBarLabelStyle: {
          fontFamily: 'Manrope_600SemiBold',
          fontSize: 12,
          marginBottom: 2,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          bottom: 16,
          height: 74,
          left: 16,
          position: 'absolute',
          right: 16,
          borderRadius: 28,
          paddingTop: 10,
          ...surfaceShadow,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'construct' : 'construct-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
