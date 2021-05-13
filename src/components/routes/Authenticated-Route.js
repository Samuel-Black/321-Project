/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthUser, useAuthPlayer } from '../../libs';

// handle unauthorized access to certain pages and navigate user accordingly
const Container = ({Component, isPrivate, requiresPlayer, ...props}) => {
    const userData = useAuthUser()
    const player = useAuthPlayer()
    
    /* No longer requires sign in.
    if(isPrivate && userData === false) { // If attempting to access private routes while not logged in/authenticated
      return <Navigate to={'../Login'} replace={true} />
    }
    */
   
    // If attempting to access Sign Up or Log In page while currently logged in/authenticated
    if(!isPrivate && userData !== false) { 
      return <Navigate to={'/'} replace={true} />
    }
    // If attempting to access Application while logged in/authenticated but without selecting their player account
    else if(requiresPlayer === true && player.player === false) { 
      return <Navigate to={'/'} replace={true} />
    }
    // else allow access
    else 
      return <Component {...props} />
  }

// wrapper class for Route
const AppRoute = ({ component: Component, path, isPrivate, requiresPlayer, ...props }) => {
    return (
      <>
        <Route
            path={path}
              element={<Container Component={Component} isPrivate={isPrivate} requiresPlayer={requiresPlayer} {...props} />}
        />
      </>
    )
}
  
export default AppRoute
