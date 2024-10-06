import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { OutfitMenu } from '@/components/OutfitMenu/OutfitMenu';

export default function OutfitScreen() {
  return (
    <View style={styles.container}>
      <OutfitMenu />
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
