import React, { useState } from "react";
import { StyleSheet, View, Button, Alert, Image, Text } from "react-native";
// import {
//   launchCameraAsync,
//   useCameraPermissions,
//   PermissionStatus,
// } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

//? LaunchCameraAsync -> means that will be used to open the camera or take photo

function ImagePickers({ onImageTaken }) {
  const [pickedImage, setPickedImage] = useState();

  //this is done since in iOS does not work, this is a hook
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  async function verifyPermissions() {
    if (status === ImagePicker.PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (status === ImagePicker.PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={style.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={style.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const style = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});

export default ImagePickers;
