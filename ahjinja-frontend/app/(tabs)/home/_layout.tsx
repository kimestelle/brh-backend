import {Stack} from 'expo-router';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" 
      options={{
        headerTitle: 'HomeScreen',
        headerShown: true}} />
    </Stack>
  );
}

export default StackLayout;