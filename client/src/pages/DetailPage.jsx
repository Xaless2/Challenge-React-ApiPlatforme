import React from 'react';
import NavBar from '../components/layout/NavBar';
import GoogleApiWrapper from '../components/builder/GoogleApiWrapper';
import CardCutomEtablishement from '../components/common/CardCutomEtablishement';
import Footer from '../components/layout/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

function EtablishmentPage() {
  const addresses = [
    { "id": 1, "address": "16 avenue François Mitterrand, 94000 Créteil" },
    { "id": 2, "address": "1 avenue de la République, 75011 Paris" },
    { "id": 3, "address": "10 rue de la Paix, 78000 Versailles" },
    { "id": 4, "address": "5 boulevard de l'Indépendance, 93000 Bobigny" },
    { "id": 5, "address": "20 avenue du Général de Gaulle, 92000 Nanterre" }
  ];

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto p-4">
          {addresses.map((address, index) => (
            <div key={index} className="mb-4">
              <CardCutomEtablishement
                id={address.id}
                image="url-to-image"
                name="Nom de l'établissement"
                address={address.address}
                rating="4.5"
                price="50€"
                description="Musculation, Cardio, Fitness, Yoga, Pilates, Crossfit, etc."
              />
            </div>
          ))}
        </div>
        <div className="flex-1">
          <Router>
            <GoogleApiWrapper
              image="url-to-image"
              name="Nom de l'établissement"
              addresses={addresses.map(address => address.address)}
              rating="4.5"
              price="50€"
              description="Musculation, Cardio, Fitness, Yoga, Pilates, Crossfit, etc."
            />
          </Router>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default EtablishmentPage;
