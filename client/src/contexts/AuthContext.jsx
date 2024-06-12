import React, { createContext, useState, useCallback, useEffect } from 'react';
import { postRequest, baseUrl, updateRequest, authUrl } from '../utils/service';
// import { useGeocoding } from '../hooks/useGeocoding';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [register, setRegister] = useState({
        email: '',
        password: '',
        role: [],
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        zipcode: '',
        city: '',
        imageUrl: '',
    });



    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

const registerUser = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await postRequest(
                `${authUrl}/register`,
                data
            );
            if (response && response.user) {
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('token', response.token);
                localStorage.setItem('currentUser', JSON.stringify(response.user));
            }
        } catch (error) {
            setError(error?.message || error);
        }
        setIsLoading(false);
    }
    , [register]);

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

    const loginUser = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await postRequest(
                `${baseUrl}/users/login`,
                login
            );
            if (response && response.user && response.token) {
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('token', response.token);
                localStorage.setItem('currentUser', JSON.stringify(response.user));
            }
        } catch (error) {
            setError(error?.message || error);
        }
        setIsLoading(false);
    }, [login]);

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
             token, logout, user, error, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
