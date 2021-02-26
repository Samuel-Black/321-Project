
export const initialState = {
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
    if (action.type == "REQUEST_LOGIN" || action.type == "CHANGE_PASSWORD")
      return {
        ...initialState,
        loading: true
      }

    if (action.type == "LOGIN_SUCCESS" || action.type == "CHANGE_PASSWORD_SUCCESS")
      return {
        ...initialState,
        loading: false
      }

    if (action.type == "LOGOUT")
      return {
        ...initialState
      }

    if (action.type == "LOGIN_ERROR")
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      }
 
    throw new Error(`Unhandled action type: ${action.type}`);
};