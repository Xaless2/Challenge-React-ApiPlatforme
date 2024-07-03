import React from 'react'
import NavBar from '../components/layout/NavBar'
import GoogleApiWrapper from '../components/builder/GoogleApiWrapper'

function EtablishmentPage() {


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
  });

  return (
    <>
      <NavBar />
      <div>
        <GoogleApiWrapper
          image="url-to-image"
          name="Nom de l'établissement"
          addresses={establishments.map(est => est.address)}
          rating="4.5"
          price="50€"
          description="Musculation, Cardio, Fitness, Yoga, Pilates, Crossfit, etc."
        />
      </div>
    </>
  );
}

export default EtablishmentPage;