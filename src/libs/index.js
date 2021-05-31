/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

// export everything from index so I only need to specify the folder path when importing
import { isAuthenticated, loginUser, logout, signupUser, confirmUserSignUp } from './Actions';
import { AuthProvider, useAuthUser, useAuthPlayer, useAuthDispatch, useAuthState } from './Context-Lib';
 
export { 
            AuthProvider, 
            useAuthUser, 
            useAuthPlayer, 
            useAuthState, 
            useAuthDispatch, 
            isAuthenticated, 
            loginUser,
            logout, 
            signupUser, 
            confirmUserSignUp
        };
