import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FilterButton from '@/components/uiComponents/FilterButton';
import CardTemplate from '@/components/uiComponents/CardTemplate';
import { useLikedCards } from '@/contexts/LikedCardsContext'; 
import { CardTemplates } from '@/components/CardTemplates';
import { Link, Href } from 'expo-router';

export default function TabThreeScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState<String>('all');
  const { likedCards, handleLike } = useLikedCards();

  const filteredCards = CardTemplates.filter((template) => type == 'all' || template.type == type);

  const handleTypeChange = (type: String) => {
    setType(type);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName} // Update the state with the user's input
      />
      <View style={styles.icons__container}>
        <View style={styles.circle}></View>
        <View style={styles.icons__rightcontainer}>
          <Text style={styles.name}>{name ? `${name}'s Closet` : "Name's Closet"}</Text>
          <View style={styles.buttons__container}>
            <Link href='/three/uploadone'>
              <View style={styles.add__button}>
                <MaterialCommunityIcons style={styles.plus__sign} name="plus" size={32} color='black' />
              </View>
            </Link>
            <Link href='/newScreens/outfit'><View style={styles.add__button}><MaterialCommunityIcons style={styles.plus__sign} name="wardrobe" size={32} color='black' /></View>
            </Link>
            </View>
        </View>
      </View>
      <View style={styles.filter__bar}>
        <FilterButton
          size="medium"
          color="#7C7777"
          text="All"
          onPress={() => {
            handleTypeChange('all');
          }}
        />
        <FilterButton
          size="medium"
          color="#7C7777"
          text="Top"
          onPress={() => {
            handleTypeChange('top');
          }}
        />
        <FilterButton
          size="medium"
          color="#7C7777"
          text="Bottom"
          onPress={() => {
            handleTypeChange('bottom');
          }}
        />
        <FilterButton
          size="medium"
          color="#7C7777"
          text="All"
          onPress={() => {
            handleTypeChange('all');
          }}
        />
      </View>
      <View style={styles.cards__container}>
          {filteredCards.map((template) => (
            <View style={styles.cards__grid}>
            <CardTemplate
              key={template.id}
              id={template.id}
              companyName={template.companyName}
              imageSource={template.imageSource}
              onLike={handleLike}
              liked={likedCards[template.id] || false}
            />
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensure ScrollView content takes up space
    alignItems: 'center', // Center items horizontally
    justifyContent: 'flex-start',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons__container: {
    marginTop: 20,
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icons__rightcontainer: {

    flexDirection: 'column',
    alignItems: 'center',
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 10,
    marginTop: 5,
    marginRight: 20,
    marginBottom: 20,
    alignSelf: "center"
  },
  add__button: {
    width: 80,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus__sign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outfits__button: {
    width: 90,
    height: 110,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
  },
  buttons__container: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10
  },
  name: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 15
  },
  filter__bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginTop: 20,
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
