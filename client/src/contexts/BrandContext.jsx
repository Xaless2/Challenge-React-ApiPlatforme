import React, { useCallback, useState, useContext, createContext, useEffect } from 'react';
import { postRequest, getRequest, updateRequest, baseUrl, authUrl } from '../utils/service';
import { AuthContext } from './AuthContext';

export const BrandContext = createContext();

export const BrandContextProvider = ({ children }) => {
    const { user, token, getUser } = useContext(AuthContext);
    const [brand, setBrand] = useState(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [getAllBrand, setGetAllBrand] = useState(null);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (!isUserDataLoaded) {
                await getUser();
                if (user) {
                    setIsUserDataLoaded(true);
                }
            }
        };
        fetchUser();
    }, [getUser, user, isUserDataLoaded]);
    
    if (user) {
       const userId = user.id;
       console.log(userId);     
    } else {
        console.log('User is not defined');
    }

    useEffect(() => {
        if (user) {
            setBrand({
                user_id: user?.id,
            });
        }
    }, [user]);

    const addBrand = useCallback(async (data) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            if (!token) {
                throw new Error('Token is not defined');
            }
            const response = await postRequest(
                `${baseUrl}/brands`,
                { ...data, user_id: user?.id },
                { 'Authorization': `Bearer ${token}` }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const responseData = await response.json();
            setBrand(responseData);
        } catch (error) {
            console.error('Error adding brand:', error);
            setError(error.message);
        }
    }, []);

    const getBrands = useCallback(async (brandId) => {
        try {
            if (!token) {
                throw new Error('Token is not defined');
            }
            const response = await getRequest(
                `${baseUrl}/brands/${brandId}`,
                { 'Authorization': `Bearer ${token}` }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const responseData = await response.json();
            setBrand(responseData); 
        } catch (error) {
            console.error('Error getting brands:', error);
            setError(error.message || error);
        }
    }, [token]);

    const updateBrands = useCallback(async (brandId) => {
        try {
            if (!token) {
                throw new Error('Token is not defined');
            }
            const response = await updateRequest(
                `${baseUrl}/brands/${brandId}`,
                brand,
                { 'Authorization': `Bearer ${token}` }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const responseData = await response.json();
            setBrand(responseData);
        } catch (error) {
            console.error('Error updating brands:', error);
            setError(error.message);
        }
    }, [brand, token]);

    const getAllBrands = useCallback(async () => {
        try {
            const response = await getRequest(
                `${authUrl}/brand`,
                { 'Authorization': `Bearer ${token}` }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }
            const responseData = await response.json();
            setGetAllBrand(responseData);
        } catch (error) {
            console.error('Error getting all brands:', error);
            setError(error.message);
        }
    }, [token]);

    return (
        <BrandContext.Provider value={{ addBrand, brand, error, getBrands, updateBrands, userId, getAllBrands }}>
            {children}
        </BrandContext.Provider>
    );
};
