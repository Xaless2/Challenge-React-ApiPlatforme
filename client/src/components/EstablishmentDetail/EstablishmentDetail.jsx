import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../utils/service';

const EstablishmentDetail = () => {
  const { id } = useParams();
  const [establishment, setEstablishment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstablishment = async () => {
      const response = await fetch(`${baseUrl}/establishments/${id}`);
      const data = await response.json();
      setEstablishment(data);
      setLoading(false);
      loadGoogleMaps(data.address, data.city);
    };

    fetchEstablishment();
  }, [id]);

  const loadGoogleMaps = (address, city) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdNnq6m3qBSXKlKK5gbQJMdbd22OWeHCg`;
    script.onload = () => {
      const geocoder = new window.google.maps.Geocoder();
      const fullAddress = `${address}, ${city}`;
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === 'OK') {
          const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: results[0].geometry.location,
          });
          new window.google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        }
      });
    };
    document.head.appendChild(script);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{establishment.name}</h1>
      <p>{establishment.description}</p>
      <p>
        <strong>Address:</strong> {establishment.address}, {establishment.city}, {establishment.zipCode}
      </p>
      <p><strong>Phone:</strong> {establishment.phone}</p>

      <div id="map" style={{ height: '400px', width: '100%' }}></div>

      <h2>Performances</h2>
      <ul>
        {establishment.performances.map(performance => (
          <li key={performance.id}>
            <h3>{performance.name}</h3>
            <p>{performance.description}</p>
            <p><strong>Max Clients:</strong> {performance.numberOfClientsMax}</p>
            <p><strong>Status:</strong> {performance.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstablishmentDetail;
