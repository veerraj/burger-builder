import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error:null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
        error:null
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
        error:null
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderData,
        error:null
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
       
      };
    case actionTypes.FETCH_ORDER_START:
        return {
            ...state,
            loading: true,
        }
    case actionTypes.FETCH_ORDER_FAIL:
        return {
            ...state,
            loading: false,
            error:action.error
        }
    case actionTypes.FETCH_ORDER_SUCCESS:
        return {
            ...state,
            loading: false,
            orders:action.value,
            error:null
        }
    default:
      return state;
  }
};

export default reducer;
