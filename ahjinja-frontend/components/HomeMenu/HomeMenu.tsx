import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link, Href } from 'expo-router';

const data = [
  {
    id: '1',
    companyName: 'Company X',
    imageSource: require('../../assets/images/icon.png'),
    link: '/home/details/one', // Add link destination
  },
  {
    id: '2',
    companyName: 'Company Y',
    imageSource: require('../../assets/images/cropped.png'),
    link: '/home/details/two', // Add link destination
  },
  {
    id: '3',
    companyName: 'Company A',
    imageSource: require('../../assets/images/white2.png'),
    link: '/home/details/three', // Add link destination
  },
  {
    id: '4',
    companyName: 'Company B',
    imageSource: require('../../assets/images/cropped.png'),
    link: '/home/details/four', // Add link destination
  },
  {
    id: '5',
    companyName: 'Company B',
    imageSource: require('../../assets/images/model1.png'),
    link: '/home/details/five', // Add link destination
  },
];

// Split the data into two columns
const splitDataIntoColumns = (data: any[]) => {
  const leftColumn = [];
  const rightColumn = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      leftColumn.push(data[i]); // Add to left column
    } else {
      rightColumn.push(data[i]); // Add to right column
    }
  }
  return { leftColumn, rightColumn };
};

export const HomeMenu = (): JSX.Element => {
  const { leftColumn, rightColumn } = splitDataIntoColumns(data);
  const [searchText, setSearchText] = useState(''); // Search text state
  const [likedItems, setLikedItems] = useState<string[]>([]); // State to track liked items

  // Handle like button click
  const handleLike = (id: string) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter(item => item !== id)); // Remove item if already liked
    } else {
      setLikedItems([...likedItems, id]); // Add item to liked list
    }
  };

  return (
    <View>
      
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText} // Update searchText state on input change
        />
      </View>

      <ScrollView contentContainerStyle={styles.homeMenu}>
        <View style={styles.homeMenu}>
          <View style={styles.div}>
            <View style={styles.overlap}>
              <View style={styles.body}>
                <View style={styles.overlapGroup}>
                  <View style={styles.overlap2}>
                    {/* Left Column */}
                    <View style={styles.column}>
                      {leftColumn.map((item) => (
                        <Card
                          key={item.id}
                          companyName={item.companyName}
                          imageSource={item.imageSource}
                          link={item.link} // Pass link destination
                          onLike={() => handleLike(item.id)} // Handle like event
                          liked={likedItems.includes(item.id)}
                        />
                      ))}
                    </View>

                    {/* Right Column */}
                    <View style={styles.column}>
                      {rightColumn.map((item) => (
                        <Card
                          key={item.id}
                          companyName={item.companyName}
                          imageSource={item.imageSource}
                          link={item.link} // Pass link destination
                          onLike={() => handleLike(item.id)} // Handle like event
                          liked={likedItems.includes(item.id)}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeMenu: {
    // Add your styles here
  },
  div: {
    // Add your styles here
  },
  overlap: {
    // Add your styles here
  },
  body: {
    // Add your styles here
  },
  overlapGroup: {
    // Add your styles here
  },
  overlap2: {
    display: 'flex', // Enables Flexbox layout
    flexDirection: 'row', // This makes the items go in a row (horizontal)
    flexWrap: 'wrap', // Allows items to wrap into multiple rows
    justifyContent: 'center', // Centers the items horizontally
    alignItems: 'flex-start', // Centers the items vertically (within their row)
    width: '100%',
  },
  supportingText: {
    // Add your styles here
  },
  icon: {
    // Add your styles here
  },
  card: {
    margin: 5,
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
    margin: 5,
  },
  searchBarContainer: {
    padding: 20, // Padding around the search bar
    backgroundColor: '#ffffff', // Light background color for contrast
  },
  searchBar: {
    height: 40, // Height of the search bar
    borderColor: '#ddd', // Border color
    borderWidth: 1, // Border width
    borderRadius: 20, // Rounded corners
    paddingHorizontal: 15, // Padding inside the search bar for better UX
    backgroundColor: '#fff', // White background inside the search bar
  },
  column: {
    marginHorizontal: 5, // Add space between columns
    width: '45%',
  },
  heartIcon: {
    position: 'absolute', // Absolute positioning for the heart icon
    top: 25, // Position it near the top
    right: 10, // Position it near the right edge
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
});

export const Card = ({
  companyName,
  imageSource,
  link,
  onLike,
  liked,
}: {
  companyName: string;
  imageSource: any;
  link: string;
  onLike: () => void;
  liked: boolean;
}): JSX.Element => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>@ {companyName}</Text>
      <Link href={link as Href}>
        <Image style={styles.cardImage} source={imageSource} />
      </Link>
      <TouchableOpacity onPress={onLike} style={styles.heartIconContainer}>
        <Image
          source={liked ? require('../../assets/images/filled.png') : require('../../assets/images/whiteheart.png')}
          style={styles.heartIcon}
        />
      </TouchableOpacity>
    </View>
  );
};