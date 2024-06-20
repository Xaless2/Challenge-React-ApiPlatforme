import React, { createContext, useState, useCallback, useEffect } from 'react';
import { postRequest, baseUrl, updateRequest, authUrl } from '../utils/service';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token); 
            console.log(decodedToken);
            setUserRole(decodedToken.roles[0]); 
        }
    }, [token]);


    const registerUser = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await postRequest(
                `${authUrl}/register`,
                data
            );
            if (response && (response.user || response.token)) {
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('token', response.token);
                localStorage.setItem('currentUser', JSON.stringify(response.user));
            }
        } catch (error) {
            setError(error?.message || error);
        }
        setIsLoading(false);
    }, []);

    const loginUser = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await postRequest(`${authUrl}/login`, data);
            console.log('Response: ', response);
            console.log('Token: ', response.token);
            if (response && response.token) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
                setIsLoading(false);
                return true;  
            }
        } catch (error) {
            console.log(error);
            setError(error?.message || error);
        }
        setIsLoading(false);
        return false; 
    }, []);
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
        setIsLoading(false);
    }, []);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ 
            registerUser, 
            loginUser,
            token,
            logout,
            user, 
            error,
            isLoading,
            userRole,
            setUserRole
        }}>
            {children}
        </AuthContext.Provider>
    );
};
