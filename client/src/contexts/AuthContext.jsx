import React,{useCallback, useState, useEffect, createContext} from 'react';
import { postRequest,baseUrl, updateRequest } from '../utils/service';
import { useGeocoding } from '../hooks/useGeocoding';

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [register, setRegister] = useState({
        email: '',
        password: '',
        role : [],
        firstname: '',
        lastname: '',
        phone:'',
        address: '',
        zipcode:'',
        city:'',
        imageUrl:'',
    });

    const [updatedUser, setUpdatedUser] = useState({
        email: '',
        password: '',
        role : [],
        firstname: '',
        lastname: '',
        phone:'',
        address: '',
        zipcode:'',
        city:'',
        imageUrl:'',
    });

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const { coordinates, error: geocodingError, geocode } = useGeocoding();

    const registerUser = useCallback(async () => {  
        try {
            await geocode(register.address, register.zipcode);
            const registerWithCoordinates = {
                ...register,
                lat: coordinates.lat,
                lng: coordinates.lng,
            };
            const response = await postRequest(
                `${baseUrl}/users/register`,
                registerWithCoordinates
            );
            setUser(response);
        } catch (error) {
            setError(error.message);
        }

    }, [register, geocode, coordinates]);

    const updateUsers = useCallback(async (userId) => {
        try {
            const response = await updateRequest(
                `${baseUrl}/users/${userId}`,
                updatedUser
            );
            setUser(response);
        } catch (error) {
            setError(error.message);
        }
    }, [updatedUser]);

    const loginUser = useCallback(async () => {
        try {
            const response = await postRequest(
                `${baseUrl}/users/login`,
                login
            );
            setUser(response.user);
            setToken(response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
        } catch (error) {
            setError(error.message);
        }
    }, [login]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);

   const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{registerUser, updateUsers, loginUser, token, logout, user, error, geocodingError }}>
            {children}
        </AuthContext.Provider>
    );
};