import React, { useContext, useEffect, useState, useRef } from 'react';
import NavBar from '../components/layout/NavBar';
import GoogleApiWrapper from '../components/builder/GoogleApiWrapper';
import CardCutomEtablishement from '../components/common/CardCutomEtablishement';
import Footer from '../components/layout/Footer';
import { baseUrl } from '../utils/service';

import { AuthContext } from '../contexts/AuthContext';

function EtablishmentPage() {
  const { token } = useContext(AuthContext);
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeEstablishmentAddress, setActiveEstablishmentAddress] = useState(null);
  const establishmentContainerRef = useRef(null); 


  useEffect(() => {
    
  }, [token]);


  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        const response = await fetch(`${baseUrl}/establishments`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.code === 401) {

        } else {
          setEstablishments(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching establishments:', error);
        setLoading(false);
      }
    };
    fetchEstablishments();
  }, [token]);

  

  useEffect(() => {
    if (activeEstablishmentAddress && establishmentContainerRef.current) {
      establishmentContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeEstablishmentAddress]);

  const handleMarkerClick = (address) => {
    setActiveEstablishmentAddress(address);
    if (establishmentContainerRef.current) {
      establishmentContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto p-4" ref={establishmentContainerRef}>
          {!loading && establishments && establishments.length > 0 ? (
            establishments.map((data, index) => {
              const address = `${data.address}, ${data.zip_code}, ${data.city}`;
              return (
                <div key={index} className="mb-4">
                  <CardCutomEtablishement
                    id={data.brand_id}
                    image="https://zupimages.net/up/24/23/qc6t.jpg"
                    name={data.display_name}
                    address={address}
                    description={data.description}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center">Pas encore d'établissements disponibles</div>
          )}
        </div>
        <div className="flex-1">
          {establishments && establishments.length > 0 ? (
            <GoogleApiWrapper
              establishments={establishments} 
              onMarkerClickHandler={handleMarkerClick}
            />
          ) : (
            <div className="text-center">Chargement...</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
  );
}

export default EtablishmentPage;
export default EtablishmentPage;