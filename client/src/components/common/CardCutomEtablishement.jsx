import React from 'react'
import Button from './Button'

function CardCutomEtablishement({ image, name, address, rating, price, description }) {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src={image} alt={name} />
          </div>
          <div className="p-6">
            <div className="flex items-baseline">
              <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                {rating} stars
              </span>
              <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                {address}
              </div>
            </div>
            <h4 className="mt-1 font-semibold text-lg leading-tight truncate">{name}</h4>
            <div className="mt-1">
              {price}
              <span className="text-gray-600 text-sm"> / semaine</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v12a2 2 0 002 2 2 2 0 002-2V4a2 2 0 00-2-2zm6 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
              </svg>
              {description}
            </div>
            <div className="mt-2 flex space-x-4">
              <Button
                onClick={() => {
                  console.log('Voir plus clicked')
                }}
                text={'Voir plus'}
              />
              <Button
                onClick={() => {
                  console.log('Reserver clicked')
                }}
                text={'Reserver'}
              />
            </div>
          </div>
        </div>
      );
}

export default CardCutomEtablishement