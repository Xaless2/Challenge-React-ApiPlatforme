import React, { createContext, useState, useCallback, useEffect } from 'react';
import { postRequest, baseUrl, updateRequest, authUrl, getRequest } from '../utils/service';
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
            setUserRole(decodedToken.roles); 
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
            if (response && response.token) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
                const decodedToken = jwtDecode(response.token);
                setUser(decodedToken.user); 
                return true;  
            }
        } catch (error) {
            setError(error?.message || error);
        }
        setIsLoading(false); 
        return false; 
    }, []);

    const updateUser = useCallback(async (data) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
    
        try {
            const response = await updateRequest(
                `${baseUrl}/users/${user.id}`,
                data,{
                    "Authorization": `Bearer ${token}`,
                }
            );
            setUser(response);
            localStorage.setItem('currentUser', JSON.stringify(response));
        } catch (error) {
            setError(error?.message || error);
        }
    
    }, [user]);

    const getUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
    
        try {
            const response = await getRequest(
                `${baseUrl}/me`,
                {
                    "Authorization": `Bearer ${token}`,
                }
            );
            setUser(response);
            return response; 
        } catch (error) {
            setError(error?.message || error);
        }
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
            error,
            isLoading,
            userRole,
            setUserRole,
            updateUser,
            getUser,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
