import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={style.fallbackContainer}>
        <Text style={style.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  // function renderHandler(itemData) {
  //   return <PlaceItem place={itemData.item} onSelect={selectPlaceHandler} />;
  // }

  return (
    <FlatList
      style={style.list}
      data={places}
      keyExtractor={(item) => {
        item.id;
      }}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
}

const style = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

export default PlacesList;
