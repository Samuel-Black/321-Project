import { Auth } from 'aws-amplify';

export const isAuthenticated = async () => {
  const cognitoUser = Auth.currentSession()
  return (await cognitoUser).isValid()
};

export async function loginUser(dispatch, loginPayload) {
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const user = await Auth.signIn(loginPayload.email, loginPayload.password);
    dispatch({ type: 'LOGIN_SUCCESS' });
    window.location.reload(false);
    return user
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: error.message });
    }
}

export async function signupUser(dispatch, signupPayload) {
 
  try {
    dispatch({ type: 'REQUEST_SIGNUP' })
    await Auth.signUp(signupPayload.email, signupPayload.password)
    dispatch({ type: 'SIGNUP_SUCCESS' })
  } catch (error) {
    dispatch({ type: 'SIGNUP_ERROR', error: error.message })
  }
}

export async function confirmUserSignUp(dispatch, confirmationPayload) {

  try {
    dispatch({ type: 'REQUEST_SIGNUP_CONFIRMATION' })
    await Auth.confirmSignUp(confirmationPayload.email, confirmationPayload.authenticationCode)
    dispatch({ type: 'SIGNUP_CONFIRMATION_SUCCESS' })
  } catch (error) {
    dispatch({ type: 'SIGNUP_CONFIRMATION_ERROR', error: error.message })
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  try {
    await Auth.signOut()
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

 
export async function changePassword(dispatch, changePassPayload) {
  dispatch({ type: 'CHANGE_PASSWORD' });
  try {
    await Auth.currentAuthenticatedUser()
    .then(user => {
        Auth.changePassword(user, changePassPayload.oldPassword, changePassPayload.newPassword)
        dispatch({ type: 'CHANGE_PASSWORD_SUCCESS' });
    })
  } catch(error) {
    console.log('error changing password: ', error)
  }
}