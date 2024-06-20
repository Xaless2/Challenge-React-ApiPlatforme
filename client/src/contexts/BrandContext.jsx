import React, { useCallback, useState, useContext, createContext, useEffect } from 'react';
import { postRequest, getRequest, updateRequest, baseUrl } from '../utils/service';
import { AuthContext } from './AuthContext';
import { jwtDecode } from "jwt-decode";

export const BrandContext = createContext();

export const BrandContextProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext);
    const [brand, setBrand] = useState(null);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token); 
            setUserId(decodedToken.id);
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            setBrand({
                user_id: user.id,
            });
        }
    }, [user]);


    const addBrand = useCallback(async (data) => {
        try {
            const response = await postRequest(
                `${baseUrl}/brands`,
               { ...data, user_id: brand.user_id},
                { 'Authorization': `Bearer ${token}` }
            );
            setBrand(response);
        } catch (error) {
            setError(error.message);
        }
    }, [brand, token]);

    const getBrands = useCallback(async () => {
        try {
            const response = await getRequest(
                `${baseUrl}/brands/${user.id}`,
                { 'Authorization': `Bearer ${token}` }
            );
            setBrand(response);
        } catch (error) {
            setError(error.message);
        }
    }, [user, token]);

    const updateBrands = useCallback(async (brandId) => {
        try {
            const response = await updateRequest(
                `${baseUrl}/brands/${brandId}`,
                brand,
                { 'Authorization': `Bearer ${token}` }
            );
            setBrand(response);
        } catch (error) {
            setError(error.message);
        }
    }, [brands, token]);

    return (
        <BrandContext.Provider value={{ addBrand, brand, error, getBrands, updateBrands, userId }}>
            {children}
        </BrandContext.Provider>
    );
};