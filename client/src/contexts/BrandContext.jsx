import React, { useCallback, useState, useContext, createContext } from 'react';
import { postRequest, baseUrl } from '../utils/service';
import { AuthContext } from './AuthContext';

export const BrandContext = createContext();

export const BrandContextProvider = ({ children }) => {
    const { user, token } = useContext(AuthContext);
    const [brands, setBrands] = useState({
        user_id: user ? user.id : '',
        display_name: '',
        kbis_pdf: '',
        image_url: '',
    });
    const [error, setError] = useState(null);

    const addBrand = useCallback(async () => {
        try {
            const response = await postRequest(
                `${baseUrl}/brands`,
                brands,
                { 'Authorization': `Bearer ${token}` }
            );
            setBrands(response);
        } catch (error) {
            setError(error.message);
        }
    }, [brands, token]);

    const getBrands = useCallback(async () => {
        try {
            const response = await getRequest(
                `${baseUrl}/brands/${user.id}`,
                { 'Authorization': `Bearer ${token}` 
            });
            setBrands(response);
        } catch (error) {
            setError(error.message);
        }
    }, [user, token]);

    const updateBrands = useCallback(async (brandId) => {
        try {
            const response = await updateRequest(
                `${baseUrl}/brands/${brandId}`,
                brands,
                { 'Authorization': `Bearer ${token}` }
            );
            setBrands(response);
        } catch (error) {
            setError(error.message);
        }
    }, [brands, token]);

    return (
        <BrandContext.Provider value={{ addBrand, brands, error, getBrands, getBrands, updateBrands  }}>
            {children}
        </BrandContext.Provider>
    );
};

