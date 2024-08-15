"use client"

import { getUserByEmail, loginUser } from "@/fetching/users";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user,setUser] = useState({});

    const fetchUserByEmail = async() => {
        const response = await getUserByEmail();
        const data = response.data;
        setUser(data);
    }

    useEffect(() => {
        fetchUserByEmail();
    }, [user])

    const login = async(params) => {
        const response = await loginUser(params);
        fetchUserByEmail();
        return response;
    }

    const logout = () => {
        const today = new Date();
        const expires = new Date(today.setHours(0,0,0));
        const token = document.cookie.split("=")[1].split(";")[0];
        document.cookie = `Access Token = ${token}; expires = ${expires}; path = /`;
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, logout, login}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}