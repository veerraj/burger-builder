import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    value: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    value: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    value: ingredients,
  };
};

export const fetchingIngredientFailed = () => {
    return {
      type: actionTypes.FETCH_INGREDIENT_FAILED
    };
  };

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get(
        "https://burger-builder-34662-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
          dispatch(setIngredient(response.data))
      })
      .catch((error)=>{
        dispatch(fetchingIngredientFailed());
      })
  };
};
