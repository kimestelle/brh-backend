import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Link } from 'expo-router';


export const UploadMenu = (): JSX.Element => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = async () => {
      // Ask for permission to access the gallery
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need access to your camera roll.');
        return;
      }
  
      // Open image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow photos
        allowsEditing: true,                            // Allow cropping the image
        aspect: [4, 3],                                 // Aspect ratio for cropping
        quality: 1,                                     // Full quality
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);  // Set the selected image
      }
    };

    
  return (
    <ScrollView contentContainerStyle={styles.homeMenu}>
        <View style={styles.top}>
            <Link href='/(tabs)/three'>
                <Image
                source={require('../../assets/images/back.png')} 
                style={styles.backIcon}
                />
            </Link>
            <Text style={styles.title}>Upload</Text>
        </View>

        <TouchableOpacity style={styles.bigButton} onPress={handleImageUpload}>
            {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.big} />
        ) : (
            <Image
                    source={require('../../assets/images/upload.png')} 
                    style={styles.big}
            />
        )}
            
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.button} onPress={() => alert('Saved to closet!')}>
            <Text style={styles.buttonText}>Save</Text>
            <Image
                source={require('../../assets/images/arrow.png')} 
                style={styles.genIcon}
                />
        </TouchableOpacity>
        
    </ScrollView>
    
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
  bigButton:{

  },
  big:{
    height: 200,
    resizeMode: "cover",
    width: "100%",
    borderWidth: 2,
    borderColor: "#BBBBBB",
    borderRadius: 15,
    marginTop: "45%",
    marginBottom: "5%",
    alignItems: "center"
  },
  details:{


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
});

