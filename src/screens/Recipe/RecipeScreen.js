import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import { fetchData } from "../../data/MockDataAPI";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    // Access the 'item' parameter from the route
    const { route } = props;
    const { params } = route;
    const { item } = params;

    // Now 'item' contains the value "52977"
    console.log('Item:', item);

    // Fetch data using the 'item' parameter
    handleFetchData(item);
  }, [props.route]);

  const handleFetchData = async (item) => {
    try {
      const data = await fetchData(`lookup.php?i=${item}`);
      setRecipe(data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const { navigation } = props;

  const category = recipe.strCategory;
  const title = recipe.strMeal;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.strMealThumb }} />
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{title}</Text>
        {/* <Image style={styles.image} source={{ uri: recipe.strMealThumb }} /> */}
        <View style={styles.infoContainer}>
          <Text style={styles.category}>
            {category}
          </Text>
          <Text style={styles.instruction}>{recipe.strInstructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
