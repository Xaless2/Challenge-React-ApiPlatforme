import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
    const { token, isLoading } = useContext(AuthContext);
    console.log(token)
    const navigate = useNavigate();

    useEffect(() => {
      
        if (!isLoading && !token) {
            navigate('/login');
        }
    }, [isLoading, token, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return token ? children : null;
}

export default ProtectedRoute;
