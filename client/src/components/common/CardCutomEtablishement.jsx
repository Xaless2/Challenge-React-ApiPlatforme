import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function CardCutomEtablishement({ id, image, name, address, rating, price, description }) {


  const handleOnClick = () => {
    navigate(`/establishmentDetails/${id}`);
  };

  return (
    <div id={id} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={image} alt={name} />
      </div>
      <div className="p-6">
        <div className="flex items-baseline">
          <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
            {address}
          </div>
        </div>
        <h4 className="mt-1 font-semibold text-lg leading-tight truncate">{name}</h4>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v12a2 2 0 002 2 2 2 0 002-2V4a2 2 0 00-2-2zm6 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
          </svg>
          {description}
        </div>
        <div className="mt-2 flex space-x-4">
          <Button onClick={handleOnClick} text={'Voir plus de détails'} />
        </div>
      </div>
    </div>
  );
}

export default CardCutomEtablishement;
