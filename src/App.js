import './App.scss';
import React, { useState, useEffect, Component } from "react";
import { Link } from 'react-router-dom';
import { Auth } from "aws-amplify";
//import LogInPage from './pages/account/LogInPage';
import Routes from './components/routes/Routes';
//import { useUser } from "./libs/contextLib";
import { useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import CurrentUser from './Current-User'

import AuthenticatedApp from './Authenticated-App'
import UnauthenticatedApp from './Unauthenticated-App'
import LoginPage from './pages/account/LogInPage'

const isAuthenticated = async () => {
  const cognitoUser = Auth.currentSession();

  let isSessionValid = false;

  if (cognitoUser) {
    cognitoUser.then(() => isSessionValid = true).catch(() => isSessionValid = false)
  }

  return isSessionValid;
};

//console.log(isAuthenticated())


export default function App() {
  
    return (
      <div>
        {!isAuthenticated() ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
      </div>
    )
}


/*


  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    navigate('./');
  }

    !isAuthenticating && (
      <div className="App">
        {isAuthenticated ? (
          <button onClick={handleLogout} type="button">Logout</button>
        ) : (
          <>
            <Link to ="/Signup" >Signup</Link>
            <Link to="/Login">Login</Link>
          </>
        )}

        {console.log(Auth.currentSession())}
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  ); 
*/
