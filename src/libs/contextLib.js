import React, { useContext, createContext, useReducer, useState, useEffect } from "react";
import { initialState, AuthReducer } from './Reducer';
import { Auth } from 'aws-amplify'

const AuthUserContext = createContext();
const AuthPlayerContext = createContext();
const AuthStateContext = createContext();
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

async function getUserData() {
    return await Auth.currentAuthenticatedUser()
}

const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
    const [userData, setUserData] = useState(false)
    const [player, setPlayer] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        getUserData().then((result) => {
            setUserData(result)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
     }, []);

     useEffect( () => { // If userData value changes, set the player to false
        setPlayer(false)
     }, [userData]);

    return (
        <>
        {loading ?
            <div>LOADING</div> 
            :
            <AuthUserContext.Provider value={userData}>
                <AuthPlayerContext.Provider value={{player, setPlayer}}>
                    <AuthStateContext.Provider value={user}>
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
