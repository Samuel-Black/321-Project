import { Auth } from 'aws-amplify';

export const isAuthenticated = async () => {
  const cognitoUser = Auth.currentSession()
  return (await cognitoUser).isValid()
};

export const getCurrentToken = async () => {
  const cognitoUser = await Auth.currentSession();

  if (cognitoUser.accessToken.jwtToken !== null) {
    return cognitoUser.accessToken.jwtToken
  }
};

export async function loginUser(dispatch, loginPayload) {
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const user = await Auth.signIn(loginPayload.email, loginPayload.password);
    dispatch({ type: 'LOGIN_SUCCESS' });
    return user
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: error.message });
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