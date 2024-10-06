import {Stack} from 'expo-router';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="three" 
      options={{
        headerTitle: 'three',
        headerShown: false}} />
    </Stack>
  );
}

export default StackLayout;