import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface CardProps {
  id: string;
  companyName: string;
  imageSource: any;
  onLike: (id: string) => void;
  liked: boolean;
}

const CardTemplate = ({ id, companyName, imageSource, onLike, liked }: CardProps): JSX.Element => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>@ {companyName}</Text>
      <Image style={styles.cardImage} source={imageSource} />
      <TouchableOpacity onPress={() => onLike(id)} style={styles.heartIconContainer}>
        <Image
          source={liked ? require('../../assets/images/filled.png') : require('../../assets/images/whiteheart.png')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardTemplate;


// Styles for the Card component
const styles = StyleSheet.create({
  cards__container: {
    flexDirection: 'column',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  cardText: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  heartIconContainer: {
    position: 'absolute',
    top: "22%",
    right: 10,
    zIndex: 1,
  },
  heartIcon: {
    width: 30,
    height: 30,
  },
});