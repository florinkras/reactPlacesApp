import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDeatilScreen = (props) => {
  return (
    <View>
      <Text>PlaceDeatilScreen</Text>
    </View>
  );
};

PlaceDeatilScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({});

export default PlaceDeatilScreen;
