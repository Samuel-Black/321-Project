import React, { useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState, useAuthUser, AuthProvider } from '../../libs';
import { Auth } from 'aws-amplify';
import usePromise from 'react-promise';

//&& !Boolean(userDetails.token === getCurrentToken())

const Container = ({Component, isPrivate, ...props}) => {
    let userData = useAuthUser()
    
    if((isPrivate && (userData === false))) {
        return <Navigate to={'/Login'} replace={true} />
    }
    else {
      return <Component {...props} />
    }
  }

const AppRoute = ({ component: Component, path, isPrivate, ...props }) => {

    return (
      <Route
          path={path}
          element={<Container Component={Component} isPrivate={isPrivate} {...props} />}
      />
  )
}
  
export default AppRoute
