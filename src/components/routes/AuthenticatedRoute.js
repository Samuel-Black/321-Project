import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState, getCurrentToken, isAuthenticated } from '../../libs';
import { Auth } from 'aws-amplify';

//&& !Boolean(userDetails.token === getCurrentToken())

const Container = ({Component, isPrivate, ...props}) => {
    const userDetails = useAuthState();
    
    if(isPrivate === true && isAuthenticated().then() === false) {
         return <Navigate to={'../Login'} replace={true} />;
     }
     
     return <Component {...props} />
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
