import React, { useCallback, useState, useContext, createContext, useEffect } from 'react';
import { postRequest, getRequest, updateRequest, baseUrl, getRequestById } from '../utils/service';
import { AuthContext } from './AuthContext';

export const BrandContext = createContext();

export const BrandContextProvider = ({ children }) => {
    const { user, token, getUser } = useContext(AuthContext);
    const [brand, setBrand] = useState(null);
    const [error, setError] = useState(null);
    const [allBrands, setAllBrands] = useState([]);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [brandId, setBrandId] = useState(null);

    useEffect(() => {
      if (allBrands.length > 0) {
          const brandIds = allBrands.map(brand => brand.id);
          setBrandId(brandIds);
      }
  }, [allBrands]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!isUserDataLoaded) {
                await getUser();
                setIsUserDataLoaded(true);
            }
        };
        fetchUser();
    }, [getUser, isUserDataLoaded]);

    useEffect(() => {
        if (user) {
            setBrand((prevBrand) => ({
                ...prevBrand,
                user_id: user.id,
            }));
        }
    }, [user]);

    const addBrand = useCallback(async (data) => {
      try {
        setError(null);
        const response = await postRequest(
          `${baseUrl}/brands`,
          { ...data, user_id: user.id },
          { 'Authorization': `Bearer ${token}` }
        );
    
        if (!response) {
          throw new Error('No response from the API');
        }
    
        setBrand(response);
        setBrandId(response.id);
        console.log('Brand added:', response.id);
    
        return response.id;  
      } catch (error) {
        console.error('Error adding brand:', error);
        setError(error?.message || 'Error adding brand'); 
      }
    }, [user, token]);

    const getBrandsByIds = useCallback(async (brandIds) => {
      try {
          const responses = await Promise.all(brandIds.map(brandId => 
              getRequestById(
                  `${baseUrl}/brands/${brandId}`,
                  { 'Authorization': `Bearer ${token}` }
              )
          ));
  
          setBrand(responses);
      } catch (error) {
          console.error('Error getting brands:', error);
          setError(error.message || 'Error fetching brands');
      }
  }, [token]);
  
  useEffect(() => {
      if (brandId && brandId.length > 0) {
          getBrandsByIds(brandId);
      }
  }, [brandId, getBrandsByIds]);


    const updateBrands = useCallback(async (brandId) => {
        try {
            if (!token) {
                throw new Error('Token is not defined');
            }

            if (!brandId) {
                throw new Error('Brand ID is not defined');
            }

            const response = await updateRequest(
                `${baseUrl}/brands/${brandId}`,
                brand,
                { 'Authorization': `Bearer ${token}` }
            );

            setBrand(response);
        } catch (error) {
            console.error('Error updating brands:', error);
            setError(error.message || 'Error updating brands');
        }
    }, [brand, token]);

    const getAllBrands = useCallback(async () => {
      if (!token) {
        console.error('Token is not defined');
        return;
      }
    
      try {
        const response = await getRequest(
          `${baseUrl}/brands/brands_by_admin`,
          { 'Authorization': `Bearer ${token}` }
        );
        if (!response) {
          throw new Error('No response from server');
        }
        
        setAllBrands(response); 
      } catch (error) {
        console.error('Error getting all brands:', error);
        setError(error.message || 'Error fetching all brands');
      }
    }, [token]);

    useEffect(() => {
      if (token) {
        getAllBrands();
      }
    }, [token, getAllBrands]);

    return (
        <BrandContext.Provider value={{ addBrand, brand, error, setError, updateBrands, getAllBrands, allBrands, setAllBrands }}>
            {children}
        </BrandContext.Provider>
    );
};