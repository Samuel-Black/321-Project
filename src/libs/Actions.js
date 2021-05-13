/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { Auth } from 'aws-amplify';

export const isAuthenticated = async () => {
  const cognitoUser = Auth.currentSession();
  return (await cognitoUser).isValid(); // await AWS amplify promise return
};

export async function loginUser(dispatch, loginPayload) {
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const user = await Auth.signIn(loginPayload.email, loginPayload.password); // await AWS amplify promise return
    dispatch({ type: 'LOGIN_SUCCESS' }); // if above promise is succesful dispatch login success
    window.location.reload(false); // reload the window
    return user
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: error.message });
    }
}

export async function signupUser(dispatch, signupPayload) {
 
  try {
    dispatch({ type: 'REQUEST_SIGNUP' });
    await Auth.signUp(signupPayload.email, signupPayload.password); // await AWS amplify promise return
    dispatch({ type: 'SIGNUP_SUCCESS' }); // if above promise is succesful dispatch signup success
  } catch (error) {
    dispatch({ type: 'SIGNUP_ERROR', error: error.message });
  }
}

export async function confirmUserSignUp(dispatch, confirmationPayload) {

  try {
    dispatch({ type: 'REQUEST_SIGNUP_CONFIRMATION' });
    await Auth.confirmSignUp(confirmationPayload.email, confirmationPayload.authenticationCode); // await AWS amplify promise return
    dispatch({ type: 'SIGNUP_CONFIRMATION_SUCCESS' }); // if above promise is succesful dispatch signup confirmation success
  } catch (error) {
    dispatch({ type: 'SIGNUP_CONFIRMATION_ERROR', error: error.message });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  try {
    await Auth.signOut() // await AWS amplify promise return
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
