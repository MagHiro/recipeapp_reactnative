import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { fetchData } from "../../data/MockDataAPI";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [recipe, SetRecipe] = useState([]);
  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const data = await fetchData("search.php?s=");
      SetRecipe(data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  // const renderRecipes = ({ item }) => (
  //   <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
  //     <View style={styles.container}>
  //       <Image style={styles.photo} source={{ uri: item.photo_url }} />
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
  //     </View>
  //   </TouchableHighlight>
  // );

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item.idMeal)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.strMealThumb }} />
        <Text style={styles.title}>{item.strMeal}</Text>
        <Text style={styles.category}>{(item.strCategory)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <>
      {/* <View>
        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
      </View> */}
      <View>
        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipe} renderItem={renderRecipes} keyExtractor={(item) => item.idMeal} />
      </View>
    </>

  );
}
