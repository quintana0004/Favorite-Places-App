import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      onPress={onSelect.bind(this, place.id)}
      style={({ pressed }) => [style.item, pressed && style.pressed]}
    >
      <Image style={style.image} source={{ uri: place.imageUri }} />
      <View style={style.info}>
        <Text style={style.title}>{place.title}</Text>
        <Text style={style.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});

export default PlaceItem;
