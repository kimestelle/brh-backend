import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { UploadMenu } from '@/components/UploadMenu/UploadMenu';

export default function UploadScreen() {
  return (
    <View style={styles.container}>
      <UploadMenu />
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
