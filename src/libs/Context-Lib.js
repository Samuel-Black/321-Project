/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import React, { useContext, createContext, useReducer, useState, useEffect } from "react";
import { initialState, AuthReducer } from './Reducer';
import { Auth } from 'aws-amplify';
import { Grid } from 'react-loading-icons';

const AuthUserContext = createContext(); // context for if a user is currently signed in
const AuthPlayerContext = createContext(); // context for currently selected player if there is one
const AuthStateContext = createContext(); // context for currently selected player if there is one
const AuthDispatchContext = createContext();

function useAuthUser() {
    const context = useContext(AuthUserContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
   
    return context;
}

function useAuthPlayer() {
    const context = useContext(AuthPlayerContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
   
    return context;
}

function useAuthState() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
   
    return context;
}
   
function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
   
    return context;
}

// get user data using AWS amplify promise
async function getUserData() {
    return await Auth.currentAuthenticatedUser();
}

const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState); // reducer
    const [userData, setUserData] = useState(false); // userData, e.g. identifier, email etc.
    const [player, setPlayer] = useState(false); // currently selected player information, e.g. nickname, profile picture
    const [loading, setLoading] = useState(true); // while requesting user data, loading is true

    // on component mount get the currently authenticated user if any
    useEffect(() => {
        getUserData().then((result) => {
            setUserData(result);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
        })
     }, []);

     useEffect( () => { // If userData value changes, set the player to false, e.g. page refresh
        setPlayer(false);
     }, [userData]);

    return (
        <>
            {loading ? // while loading display animation
                <div><Grid /></div> 
            :
                <AuthUserContext.Provider value={userData}> {/* state for currently authenticated user information if any */}
                    <AuthPlayerContext.Provider value={{player, setPlayer}}> {/* states for retrieving and setting the current player */}
                        <AuthStateContext.Provider value={user}> {/* User reducer functions, sign in sign up etc. */}
                            <AuthDispatchContext.Provider value={dispatch}>
                                {children}
                            </AuthDispatchContext.Provider>
                        </AuthStateContext.Provider>
                    </AuthPlayerContext.Provider>
                </AuthUserContext.Provider>
            }
        </>
    );
};

export { useAuthUser, useAuthPlayer, useAuthState, useAuthDispatch, AuthProvider }
