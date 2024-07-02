import React, { useCallback, useState, useContext, createContext, useEffect } from 'react';
import { postRequest, getRequest, updateRequest, baseUrl, authUrl, getRequestById } from '../utils/service';
import { AuthContext } from './AuthContext';

export const BrandContext = createContext();

export const BrandContextProvider = ({ children }) => {
    const { user, token, getUser } = useContext(AuthContext);
    const [brand, setBrand] = useState(null);
    const [error, setError] = useState(null);
    const [getAllBrand, setGetAllBrand] = useState(null);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [brandId, setBrandId] = useState(null);
  
  
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
    
        if (!response.ok) {
          throw new Error(response.statusText || 'Network response was not ok');
        }
    
        const responseData = await response.json;
        setBrand(responseData);
        setBrandId(responseData.id); 
        console.log('Brand added:', responseData.id);
      } catch (error) {
        console.error('Error adding brand:', error);
        setError(error.message || 'Error adding brand');
      }
    }, [user, token]);
    


  const getBrandById = useCallback(async (brandId) => {
  try {
    // if (!brandId) {
    //   console.error('Brand ID is not defined');
    //   return;
    // }

    console.log(token)

    const response = await getRequestById(
      `${baseUrl}/brands/60`,
      
      { 'Authorization': `Bearer ${token}` }
    );

    if (!response.ok) {
      throw new Error(response.statusText || 'Network response was not ok');
    }

    const responseData = await response.json();
    setBrand(responseData);
  } catch (error) {
    console.error('Error getting brands:', error);
    setError(error.message || 'Error fetching brands');
  }
}, [token, brandId]);

  useEffect(() => {
    if (brandId) {
      getBrandById(brandId);
    }
  }, [brandId, getBrandById]);


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
  
        if (!response.ok) {
          throw new Error(response.statusText || 'Network response was not ok');
        }
  
        const responseData = await response.json();
        setBrand(responseData);
      } catch (error) {
        console.error('Error updating brands:', error);
        setError(error.message || 'Error updating brands');
      }
    }, [brand, token]);
  
    const getAllBrands = useCallback(async () => {
      try {
        const response = await getRequest(
          `${baseUrl}/brands/brands_by_admin`,
          { 'Authorization': `Bearer ${token}` }
        );
       console.log(response.data);
        if (!response.ok) {
          throw new Error(response.statusText || 'Network response was not ok');
        }
  
        const responseData = await response.data;
        setGetAllBrand(responseData);
      } catch (error) {
        console.error('Error getting all brands:', error);
        setError(error.message || 'Error fetching all brands');
      }
    }, [token]);
  
    return (
      <BrandContext.Provider value={{ addBrand, brand, error, setError, getBrandById, updateBrands, getAllBrands }}>
        {children}
      </BrandContext.Provider>
    );
  };
  