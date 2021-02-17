import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error:false,
  building:false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.3,
  meat: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.value]: state.ingredients[action.value] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.value],
        building:true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.value]: state.ingredients[action.value] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.value],
        building:true
      };
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: {
            salad:action.value.salad,
            cheese:action.value.cheese,
            bacon:action.value.bacon,
            meat:action.value.meat
        },
        error:false,
        totalPrice:4,
        building:false
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
    return {
        ...state,
        error:true
    };
    default:
      return state;
  }
};

export default reducer;
