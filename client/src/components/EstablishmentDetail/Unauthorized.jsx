import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600">403 - Unauthorized</h1>
        <p className="mt-4 text-xl text-gray-700">Vous serez redirigé vers la page de connexion.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
