import { createContext,use,useContext, useState } from "react";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [empresa, setEmpresa] = useState(null);
    const [token, setToken] = useState(null);

    function login(dados,jwt){
        setEmpresa(dados);
        setToken(jwt);
        localStorage.setItem('devjobs_token',jwt);

    }

    function logout(){
        setEmpresa(null);
        setToken(null);
        localStorage.removeItem('devjobs_token');

    }

    return(
        <AuthContext.Provider value={{ empresa, token, login, logout, isLoggedIn: !!token }}>
            {children}
        </AuthContext.Provider> 
    );
}

export function useAuth(){
    return useContext(AuthContext);
}