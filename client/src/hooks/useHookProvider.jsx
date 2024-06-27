import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../configUrl';


export const HookContext = createContext();

export const HookProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); 
    
    const getToken = () => {
        return token || localStorage.getItem('token');
    }

    const saveToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        }
    };

    const saveCurrentUser = (user) => { 
        setCurrentUser(user);
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            saveToken(data.token);
            saveCurrentUser(data.user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const register = async (fullName, email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw data; 
            }
            saveToken(data.token);
            saveCurrentUser(data.user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    
    const updateUser = async (userId, updatedInfo) => {
        try {
            const response = await fetch(`${API_URL}/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authentication': token
                },
                body: JSON.stringify(updatedInfo)
            });
            const data = await response.json();
            if (!response.ok) {
                throw data; 
            }
            saveCurrentUser(data.user);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const logout = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
    }, [token]);

    return (
        <HookContext.Provider value={{ token, getToken, saveToken, saveCurrentUser, login, logout, register, updateUser}}>
            {children}
        </HookContext.Provider>
    );
};

