import { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  useEffect(() => {
    // Keep the splash screen visible until the app is ready
    SplashScreen.preventAutoHideAsync();

    async function prepareApp() {
      // Perform any async operations you need here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a loading task
      
      // Hide the splash screen once your app is ready
      SplashScreen.hideAsync();
    }

    prepareApp();
  }, []);

  return (
    <View>
      <Text>Welcome to the app!</Text>
    </View>
  );
}
