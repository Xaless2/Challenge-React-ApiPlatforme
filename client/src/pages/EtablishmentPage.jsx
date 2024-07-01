import React from 'react'
import NavBar from '../components/layout/NavBar'
import GoogleApiWrapper from '../components/builder/GoogleApiWrapper'

function EtablishmentPage() {

  const addresses = [
    {
      "address": "16 avenue François Mitterrand, 94000 Créteil"
    },
    {
      "address": "1 avenue de la République, 75011 Paris"
    },
    {
      "address": "10 rue de la Paix, 78000 Versailles"
    },
    {
      "address": "5 boulevard de l'Indépendance, 93000 Bobigny"
    },
    {
      "address": "20 avenue du Général de Gaulle, 92000 Nanterre"
    }
  ]

  return (
    <>
      <NavBar/>
      <div>
        <GoogleApiWrapper
          image="url-to-image"
          name="Nom de l'établissement"
          addresses={addresses.map(address => address.address)}
          rating="4.5"
          price="50€"
          description="Musculation, Cardio, Fitness, Yoga, Pilates, Crossfit, etc."
        />
      </div>
    </>
  )
}

export default EtablishmentPage