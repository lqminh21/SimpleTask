
import React, { useState } from "react";
const AuthContext = React.createContext(false)

function AuthProvider({children}) {

    const [auth, setAuth] = useState( window.localStorage.getItem('token') ? true : false)
    const [role, setRole] = useState( window.localStorage.getItem('role'))

    const checkAuth = (check) => {
        setAuth(check)
    }

    const checkRole = (check) => {
        setRole(check)
    }

    const value = {
        role,
        auth,
        checkAuth,
        checkRole
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
