import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, } from "react-native";
import CardTemplate from '@/components/uiComponents/CardTemplate';
import { useBookmark } from '@/contexts/BookmarkContext';
import { CardTemplates } from '../CardTemplates';
import { useLikedCards } from '@/contexts/LikedCardsContext'; 
import { Link } from 'expo-router';

export const OutfitMenu = (): JSX.Element => {
    const { bookmarkedItems, handleBookmark } = useBookmark();
    const { likedCards, handleLike } = useLikedCards();
    const filteredOutfits = [];   

    for (let key in bookmarkedItems) {
        if (bookmarkedItems[key]) { // Check if the item is bookmarked (true)
          console.log(key); // Log the key instead of i
      
          let stringArr = key.split(" ");
          console.log(stringArr);
          let temp: { id: string; type: string; companyName: string; imageSource: any; }[] = [];

        
      
          CardTemplates.forEach((it, index) => {
            if (stringArr[0] === it.id ) {
              temp[0] = it;
            }
          });
      
          CardTemplates.forEach((it, index) => {
            if (stringArr[1] === it.id) {
              temp[1] = it;
            }
          });
      
          filteredOutfits.push(temp);
        }
      }
    
  return (
    <ScrollView contentContainerStyle={styles.homeMenu}>
        <View style={styles.top}>
            <Link href='/(tabs)/three'>
                <Image
                source={require('../../assets/images/back.png')} 
                style={styles.backIcon}
                />
            </Link>
            <Text style={styles.title}>Outfits</Text>
        </View>

        {filteredOutfits.map((arr) => (
            <View style={styles.out}>
              <View key={arr[0].id} style={styles.cards__grid}>
                <CardTemplate
                  id={arr[0].id}
                  companyName={arr[0].companyName}
                  imageSource={arr[0].imageSource}
                  onLike={handleLike}
                  liked={likedCards[arr[0].id] || false}
                />
              </View>
                <View key={arr[1].id} style={styles.cards__grid}>
                            <CardTemplate
                              id={arr[1].id}
                              companyName={arr[1].companyName}
                              imageSource={arr[1].imageSource}
                              onLike={handleLike}
                              liked={likedCards[arr[1].id] || false}
                            />
                          </View>
            </View>
            ))}

        
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  homeMenu: {
    width: "100%",
    padding: "7%"
  },
  top:{
    flexDirection: 'row',           // Align items in a row (horizontally)
    justifyContent: 'flex-start', // Space between title and arrow button
    alignItems: 'center',
    marginBottom: 20
    
  },
  backIcon:{
    width: 24,                      // Set the width of the arrow PNG
    height: 24,                     // Set the height of the arrow PNG
    resizeMode: 'contain',    
  },
  genIcon:{
    width: 15,
    height:15,
    resizeMode: 'contain'

  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  piece:{
    width: 100,                    // Set image width
    height: 100,                   // Set image height
    resizeMode: 'contain',     
  },
  combo:{
    flexDirection: 'row',          // Align children in a row (horizontal)
    justifyContent: 'space-between',// Space images evenly
    padding: 10,
    borderWidth: 2,
    borderColor: "#BBBBBB"   ,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20       
  },

  button: {
    position: 'absolute',     // Position the button absolutely
    bottom: "-35%",               // Distance from the bottom (adjust as needed)
    right:"12%",                 // Distance from the left side (adjust as needed)
    backgroundColor: '#888888', // Button background color (blue in this case)
    paddingVertical: 10,      // Vertical padding for button content
    paddingHorizontal: 15,    // Horizontal padding for button content
    borderRadius: 25,          // Rounded corners for the button
    flexDirection: 'row',           // Align items in a row (horizontally)
    justifyContent: 'flex-start', // Space between title and arrow button
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',           // Text color
    fontSize: 15,             // Text size
    fontWeight: 'bold',       // Bold text
    marginRight: 10,
  },
  cards__grid: {
    justifyContent: 'center',
    width: '45%',
    marginBottom: 10,
    marginHorizontal: 10,
    
  },
  out:{
    flexDirection: 'row',          // Align children in a row (horizontal)
    justifyContent: 'center',// Space images evenly
    padding: 10,
    borderColor: "#777777",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 30
  }
});

