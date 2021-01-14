import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

// import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://cdn.pixabay.com/photo/2018/06/18/23/03/europe-3483539_960_720.jpg`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
