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
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
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