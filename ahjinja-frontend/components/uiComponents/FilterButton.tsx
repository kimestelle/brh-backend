import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FilterButtonProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text: string;
  onPress?: () => void; // Function that returns void
}

const FilterButton: React.FC<FilterButtonProps> = ({ size = 'medium', color = '#EFEFEF', text, onPress }) => {
  const buttonSize = size === 'large' ? 80 : size === 'medium' ? 60 : 40;

  return (
    <TouchableOpacity
      style={[styles.button, { width: buttonSize + 20, height: buttonSize - 20, backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: size === 'large' ? 18 : size === 'medium' ? 14 : 12 }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 40, // Half of the button's width and height to make it circular
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterButton;