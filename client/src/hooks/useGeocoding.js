import { useState, useCallback } from 'react';

export const useGeocoding = () => {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);

    const geocode = useCallback(async (address, zipcode) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${zipcode}&key=YOUR_API_KEY`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setCoordinates({ lat: location.lat, lng: location.lng });
            } else {
                throw new Error('Unable to geocode address');
            }
        } catch (error) {
            setError(error.message);
        }
    }, []);

    return { coordinates, error, geocode };
};