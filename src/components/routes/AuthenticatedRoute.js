import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthUser, useAuthPlayer } from '../../libs';

const Container = ({Component, isPrivate, requiresPlayer, ...props}) => {
    const userData = useAuthUser()
    const player = useAuthPlayer()
    
    /* No longer requires sign in.
    if(isPrivate && userData === false) { // If attempting to access private routes while not logged in/authenticated
      return <Navigate to={'../Login'} replace={true} />
    }
    */
   
    if(!isPrivate && userData !== false) { // If attempting to access Sign Up or Log In page while currently logged in/authenticated
      return <Navigate to={'/'} replace={true} />
    }
    else if(requiresPlayer === true && player.player === false) { // If attempting to access Application while logged in/authenticated but without selecting their player account
      return <Navigate to={'/'} replace={true} />
    }
    else 
      return <Component {...props} />
  }

const AppRoute = ({ component: Component, path, isPrivate, requiresPlayer, ...props }) => {
    return (
      <Route
          path={path}
          element={<Container Component={Component} isPrivate={isPrivate} requiresPlayer={requiresPlayer} {...props} />}
      />
    )
}
  
export default AppRoute
