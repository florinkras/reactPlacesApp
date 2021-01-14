import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=5608df2bd9ad0c4ecc7a49f27b861bbb&query=${location.lat},${location.lng}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    if (!responseData.data) {
      throw new Error("Something went wrong");
    }

    const address = responseData.data[0].label;
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
