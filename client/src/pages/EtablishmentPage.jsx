import React,{useContext, useEffect} from 'react';
import NavBar from '../components/layout/NavBar';
import GoogleApiWrapper from '../components/builder/GoogleApiWrapper';
import CardCutomEtablishement from '../components/common/CardCutomEtablishement';
import Footer from '../components/layout/Footer';
import { baseUrl } from '../utils/service';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function EtablishmentPage() {

  const {token} = useContext(AuthContext)
  const [establishment, setEstablishment] = React.useState(null); 
  const [loading, setLoading] = React.useState(true);
  // const {token} = useContext(AuthContext);

  useEffect(() => {
    const fetchEstablishment = async () => {
      const response = await fetch(`${baseUrl}/establishments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setEstablishment(data);
      setLoading(false);
    };
    fetchEstablishment();
  }, [token]);

  return (
    <>
      <NavBar />
  
     <div className="flex h-screen">
        <div className="flex-1 overflow-y-auto p-4">
          {!loading && establishment && establishment.address ? (
            <div className="mb-4">
              <CardCutomEtablishement
                id={establishment.brand_id}
                image="url-to-image"
                name={establishment.display_name}
                address={establishment.address}
              />
            </div>
          ) : (
            <div className='text-center'>Pas encore des établissements disponibles</div>
          )}
        </div>
        <div className="flex-1">
          {establishment ? (
            <GoogleApiWrapper
              name={establishment.display_name}
              addresses={[establishment.address]}
            />
          ) : (
            <div className='text-center'>Chargement...</div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default EtablishmentPage;