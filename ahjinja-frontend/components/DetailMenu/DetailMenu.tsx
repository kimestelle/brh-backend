import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, Modal} from "react-native";
import { Link, Href } from 'expo-router';
import { useBookmark } from '@/contexts/BookmarkContext';

const data = [
    {
        id: 'bottom4',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/bottom4.jpg'),
      },
      {
        id: 'bottom3',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/bottom3.jpg'),
      },
      {
        id: 'bottom2',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/bottom2.jpg'),
      },
      {
        id: 'bottom1',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/bottom1.jpg'),
      },
      {
        id: 'top5',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/top5.jpg'),
      },
      {
        id: 'top4',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/top4.jpg'),
      },
      {
        id: 'top3',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/top3.jpg'),
      },
      {
        id: 'top2',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/top2.jpg'),
      },
      {
        id: 'top1',
        companyName: 'lololol',
        imageSource: require('../../assets/images/items/top1.jpg'),
      },
  ];


export const DetailMenu = (): JSX.Element => {

    const [modalVisible, setModalVisible] = useState(false);
    const { bookmarkedItems, handleBookmark } = useBookmark();
 
  return (
    <ScrollView contentContainerStyle={styles.homeMenu}>
        <View style={styles.top}>
            <Link href="/(tabs)/home"><TouchableOpacity onPress={() => {console.log('Back Button pressed!');}} style={styles.backContainer}>
                <Image
                source={require('../../assets/images/back.png')} 
                style={styles.backIcon}
                />
            </TouchableOpacity></Link>
            <Text style={styles.title}>Details</Text>
        </View>
        <Image
                source={require('../../assets/images/cropped.png')} 
                style={styles.big}
        />
        <View>
            <View style={styles.pair}>
                <Text style={styles.boldT}>name: </Text>
                <Text style={styles.norm}>XXX</Text>
            </View>
            <View style={styles.pair}>
                <Text style={styles.boldT}>brand: </Text>
                <Text style={styles.norm}>XXX</Text>
            </View>
            <View style={styles.pair}>
                <Text style={styles.boldT}>style: </Text>
                <Text style={styles.norm}>XXX</Text>
            </View>
            <View style={styles.pair}>
                <Text style={styles.boldT}>occasion: </Text>
                <Text style={styles.norm}>XXX</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Generate</Text>
            <Image
                source={require('../../assets/images/arrow.png')} 
                style={styles.genIcon}
                />
        </TouchableOpacity>

        <Modal
        animationType="slide"         // Can be 'fade', 'slide', or 'none'
        transparent={true}            // Keeps background transparent
        visible={modalVisible}        // Controlled by state
        onRequestClose={() => setModalVisible(false)} // Android back button handler
      >
        <View style={styles.fullScreenOverlay}>
          <View style={styles.fullScreenModal}>
            {/* "X" Close Button in the top-right corner */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {/* Modal Content */}
            <View style={styles.imageTextContainer}>
              <Image
                source={require('../../assets/images/cropped.png')} 
                style={styles.image}
              />
              <Text style={styles.modalText}> top matches:</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}
              style={{ width: '100%' , paddingHorizontal: 30}}>
            
            {data.map((item) => (
                        <Match
                          key={item.id}
                          companyName={item.companyName}
                          imageSource={item.imageSource}
                          onBookmark={() => handleBookmark('top1' + ' ' + item.id)} // Handle like event
                          bookmarked={bookmarkedItems['top1 ' + item.id] === true}
                        />
                      ))}

            </ScrollView>
          </View>
        </View>
      </Modal>
        
    </ScrollView>
    
  );
};

export const Match = ({
    companyName,
    imageSource,
    onBookmark,
    bookmarked,
  }: {
    companyName: string;
    imageSource: any;
    onBookmark: () => void;
    bookmarked: boolean;
  }): JSX.Element => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardText}>{companyName}</Text>
        <Image style={styles.cardImage} source={imageSource} />
        <TouchableOpacity onPress={onBookmark} style={styles.heartIconContainer}>
          <Image
            source={bookmarked ? require('../../assets/images/bfilled.png') : require('../../assets/images/bunfilled.png')}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };


const styles = StyleSheet.create({
  homeMenu: {
    width: "100%",
    padding: "7%",
    height: "100%"
  },
  top:{
    flexDirection: 'row',           // Align items in a row (horizontally)
    justifyContent: 'flex-start', // Space between title and arrow button
    alignItems: 'center',
    
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
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  backContainer:{
    

  },
  scrollViewContent: {
    flexGrow: 1,                       // Allow content to grow and become scrollable
    justifyContent: 'flex-start',      // Align content at the top
    width: "100%",
  },
  imageTextContainer: {
    flexDirection: 'row',              // Align image and text in a row
    alignItems: 'center',              // Vertically center the content
    marginBottom: 20,                  // Add spacing below the row
    marginTop: 90
  },
  image: {
    width: 50,                         // Width of the image
    height: 50,                        // Height of the image
    marginRight: 10,                   // Space between image and text
  },
  big:{
    height: 200,
    resizeMode: "contain",
    width: "100%",
    borderWidth: 2,
    borderColor: "#BBBBBB",
    borderRadius: 15,
    marginTop: "30%",
    marginBottom: "5%",
    alignItems: "center"
  },
  openButton: {
    backgroundColor: '#2196F3', // Blue button background
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 70,                   // Position the close button at the top
    right: 30,                 // Position the close button at the right
    backgroundColor: 'transparent', // Transparent background
  },
  closeButtonText: {
    fontSize: 24,              // Larger font for "X"
    fontWeight: 'bold',        // Bold "X"
    color: 'black',            // Color of the "X"
  },
  fullScreenOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark overlay
  },
  fullScreenModal: {
    flex: 1,                           // Take up the full screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',          // Background color of the modal
    width: '100%',                     // Full width of the screen
    height: '100%',                    // Full height of the screen
    
  },
  card: {
    margin: 10,
    alignItems: 'flex-start', // Centers the content of each item horizontally
    justifyContent: 'center',
    paddingLeft: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardText: {
    alignItems: 'center',
    backgroundColor: 'white',
    fontWeight: 'bold',
    margin: 10,
  },
  heartIcon: {
    position: 'absolute', // Absolute positioning for the heart icon
    top: 38, // Position it near the top
    right: 15, // Position it near the right edge
    width: 30, // Size of the heart icon
    height: 30,
    zIndex: 1, // Ensures it appears on top of the card
  },
  heartIconContainer: {
    position: 'absolute', // Absolute positioning for the heart icon
    top: 10, // Position it inside the card, near the top
    right: 0, // Position it inside the card, near the right edge
    zIndex: 1, // Ensures it appears on top of the card
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pair:{
    flexDirection: 'row',           // Align items in a row (horizontally)
    justifyContent: 'flex-start', // Space between title and arrow button
    alignItems: 'flex-start',
    marginBottom: 3,
    marginLeft: 2
  },
  boldT:{
    fontWeight: "bold",
    fontSize: 16
  },
  norm:{
    fontSize: 16
  },
  button: {
    position: 'absolute',     // Position the button absolutely
    bottom: "7%",               // Distance from the bottom (adjust as needed)
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
  matches: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,   // Add some space below the container
  },
  match: {
    height: 200,        // Set image height
    resizeMode: 'cover' // Cover the area while maintaining aspect ratio
  },
  matchText: {
    fontSize: 15,       // Small font size for the text
    color: '#777777',      // Gray color for the text
    marginVertical: 10,      // Space between the image and the text
    textAlign: 'center' // Center align the text
  },
  bookmarkButton: {
    position: 'absolute',    // Absolute position for the bookmark button
    top: 10,                 // Position at the top
    right: 10,               // Position at the right
    zIndex: 1,               // Ensure the button is on top of the image
  },
  bookmarkIcon: {
    width: 24,               // Width of the bookmark icon
    height: 24,              // Height of the bookmark icon
  },
});

