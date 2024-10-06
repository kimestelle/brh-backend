import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { LikeMenu } from '@/components/LikeMenu/LikeMenu';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" /> */}
      <LikeMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginHorizontal: 30,
    marginVertical: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
