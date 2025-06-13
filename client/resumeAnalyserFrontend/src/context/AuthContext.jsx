import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchUser();
        }
    }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/me");
            setUser(res.data);
        } catch {
            localStorage.removeItem("token");
        }
    };

    return (

        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>

    )
};

export default AuthContext
