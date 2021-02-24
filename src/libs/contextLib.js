import React, { useContext, createContext, useReducer } from "react";
import { initialState, AuthReducer } from './Reducer';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

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

const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
   
    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export {useAuthState, useAuthDispatch, AuthProvider}
