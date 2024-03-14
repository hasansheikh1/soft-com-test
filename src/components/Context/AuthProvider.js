import React from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


    const [token, setToken_] = useState(sessionStorage.getItem("token"))

    const setToken = (newToken) => {
        setToken_(newToken)
    };

    useEffect(() => {

        if (token) {
            sessionStorage.setItem('token', token)
        }
        else {
            sessionStorage.removeItem('token')
        }

    }, [token])

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    )

    return (

        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>

    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider