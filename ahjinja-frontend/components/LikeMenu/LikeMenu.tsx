import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CardTemplate from '@/components/uiComponents/CardTemplate';
import { useLikedCards } from '@/contexts/LikedCardsContext'; 
import { CardTemplates } from '@/components/CardTemplates';

export const LikeMenu = (): JSX.Element => {
  const { likedCards, handleLike } = useLikedCards();
  const filteredCards = CardTemplates.filter((template) => likedCards[template.id]);
  return (
    <ScrollView contentContainerStyle={styles.homeMenu}>
              <View style={styles.overlap2}>
              <View style={styles.cards__container}>
              {filteredCards.map((template) => (
              <View key={template.id} style={styles.cards__grid}>
                <CardTemplate
                  id={template.id}
                  companyName={template.companyName}
                  imageSource={template.imageSource}
                  onLike={handleLike}
                  liked={likedCards[template.id] || false}
                />
              </View>
            ))}
    </View>
                </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  homeMenu: {
    // Add your styles here
  },
  overlap2: {
    // Add your styles here
    display: 'flex',          // Enables Flexbox layout
    flexDirection: 'row',     // This makes the items go in a row (horizontal)
    flexWrap: 'wrap',         // Allows items to wrap into multiple rows
    justifyContent: 'center', // Centers the items horizontally
    alignItems: 'flex-start',     // Centers the items vertically (within their row)
    width: '100%'
  },
  card: {
    margin: 5,
    //width: '45%', 
    alignItems: 'flex-start',     // Centers the content of each item horizontally
    justifyContent: 'center', 
    overflow: 'visible', 
    padding: 15, // Increased padding inside each card
    
    position: 'relative', // Ensures child elements with absolute positioning are relative to the card
  },
  cardImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20,
    resizeMode: 'cover',
    
  },
  column: {
    //flex: 1, // Each column takes up half the width
    marginHorizontal: 5, // Add space between columns
    width: "45%",
  },
  heartIcon: {
    position: 'absolute', // Absolute positioning for the heart icon
    top: 30, // Position it near the top
    right: 25, // Position it near the right edge
    width: 25, // Size of the heart icon
    height: 25,
    zIndex: 1, // Ensures it appears on top of the card

  },
  cards__container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    paddingRight: 35,
    paddingLeft: 20
  },
  cards__grid: {
    justifyContent: 'center',
    width: '45%',
    marginBottom: 10,
  },
});

export const Card = ({ imageSource }: { imageSource: any }): JSX.Element => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={imageSource} />
      <Image source={require('../../assets/images/filled.png')} style={styles.heartIcon} />
    </View>
  );
};
