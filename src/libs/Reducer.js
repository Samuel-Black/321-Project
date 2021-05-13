/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

// set loading and errorMessage to false/none respectively
export const initialState = {
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
    if (action.type == "REQUEST_LOGIN" || action.type == "CHANGE_PASSWORD" || action.type == "REQUEST_SIGNUP" || action.type == "REQUEST_SIGNUP_CONFIRMATION")
      return {
        ...initialState,
        loading: true
      }

    if (action.type == "LOGIN_SUCCESS" || action.type == "CHANGE_PASSWORD_SUCCESS" || action.type == "SIGNUP_SUCCESS" || action.type == "SIGNUP_CONFIRMATION_SUCCESS")
      return {
        ...initialState,
        loading: false
      }

    if (action.type == "LOGOUT")
      return {
        ...initialState
      }

    if (action.type == "LOGIN_ERROR" || action.type == "SIGNUP_ERROR")
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      }
 
    throw new Error(`Unhandled action type: ${action.type}`);
};