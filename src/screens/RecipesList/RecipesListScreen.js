import React, { useLayoutEffect, useEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { fetchData } from "../../data/MockDataAPI";

export default function RecipesListScreen(props) {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    console.log(props)
    // Access the 'item' parameter from the route
    const { route } = props;
    const { params } = route;
    const { category } = params;


    // Fetch data using the 'item' parameter
    handleFetchData(category);
  }, [props.route]);

  const handleFetchData = async (item) => {
    try {
      const data = await fetchData(`filter.php?c=${item}`);
      setRecipe(data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  const { navigation, route } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item.idMeal)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.strMealThumb }} />
        <Text style={styles.title}>{item.strMeal}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipe} renderItem={renderRecipes} keyExtractor={(item) => item.idMeal} />
    </View>
  );
}
