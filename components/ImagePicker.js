import React from "react";
import { View, Button, Text, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const verifyPerms = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app!",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPerms();
    if (!hasPermission) {
      return;
    } else {
      ImagePicker.launchCameraAsync();
    }
  };

  return (
    <View style={styles.ImagePicker}>
      <View style={styles.imagePreview}>
        <Text>No Image picked yet.</Text>
        <Image style={styles.image} />
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
