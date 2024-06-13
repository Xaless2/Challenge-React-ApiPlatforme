import React, { createContext, useState, useCallback, useEffect } from 'react';
import { postRequest, baseUrl, updateRequest, authUrl } from '../utils/service';
// import { useGeocoding } from '../hooks/useGeocoding';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log(token);
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
                console.log('Token set in registerUser: ', response.token); 
                localStorage.setItem('token', response.token);
                localStorage.setItem('currentUser', JSON.stringify(response.user));
            }
        } catch (error) {
            setError(error?.message || error);
        }
        setIsLoading(false);
    }, []);

    // const updateUsers = useCallback(async (userId) => {
    //     try {
    //         const response = await updateRequest(
    //             `${baseUrl}/users/${userId}`,
    //             updatedUser
    //         );
    //         if (response && response.user) {
    //             setUser(response.user);
    //         }
    //     } catch (error) {
    //         setError(error?.message || error);
    //     }
    // }, [updatedUser]);

    const loginUser = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await postRequest(
                `${authUrl}/login`,
                data
            );
            console.log('Response: ', response);
            console.log('Token: ', response.token);
            if (response && response.token) {
                setToken(response.token);
                console.log('Token set in loginUser: ', response.token);
                localStorage.setItem('token', response.token); 
            }
        } catch (error) {
            console.log(error); 
            setError(error?.message || error);
        }
        setIsLoading(false);
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
               isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
