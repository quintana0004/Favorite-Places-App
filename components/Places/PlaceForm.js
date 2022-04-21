import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePickers from "./ImagePickers";
import LocationPickers from "./LocationPickers";
import Button from "../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectImage, setSelectImage] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function imageTakenHandler(imageUri) {
    setSelectImage(imageUri);
  }

  const locationTakenHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savedPlaceHandler() {
    const placeData = new Place(enteredTitle, selectImage, pickedLocation);
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={style.form}>
      <View>
        <Text style={style.label}>Title</Text>
        <TextInput
          style={style.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePickers onImageTaken={imageTakenHandler} />
      <LocationPickers onLocationPick={locationTakenHandler} />
      <Button onPress={savedPlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 3,
  },
});

export default PlaceForm;
