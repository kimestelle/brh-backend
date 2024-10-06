import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  size: number;
  color: string;
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      // Disable the static render of the header on web
      // to prevent a hydration error in React Navigation v6.
      tabBarShowLabel: false, // This line hides the tab name text
      }}>
      <Tabs.Screen
      name="home"
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <TabBarIcon name="home" size={30} color={color} />,
        headerRight: () => (
        <Link href="/modal" asChild>
          <Pressable>
          {({ pressed }) => (
            <FontAwesome
            name="info-circle"
            size={25}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
          </Pressable>
        </Link>
        ),
      }}
      />
      <Tabs.Screen
      name="two"
      options={{
        tabBarIcon: ({ color }) => <TabBarIcon name="heart" size={28} color={color} />,
      }}
      />
      <Tabs.Screen
      name="three"
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="hanger" size={32} color={color} />,
      }}
      />
    </Tabs>
  );
}
