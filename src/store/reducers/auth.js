import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath:'/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_AUTH_REDIRECT:
      return {
        ...state,
         authRedirectPath:action.path
      };

    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
